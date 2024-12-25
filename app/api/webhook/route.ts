import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { Resend } from 'resend';
import CheckoutReceipt from '@/app/emails/CheckoutReceipt';
import { headers } from 'next/headers';
import RefundReceipt from '@/app/emails/RefundReceipt';

const stripe = new Stripe(process.env.STRIPE_API_KEY as string);
const resend = new Resend(process.env.RESEND_API_KEY as string);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get('stripe-signature') as string;

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret,
    );

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const products = JSON.parse(session.metadata?.products || '[]');

      const totalAmount = products.reduce(
        (total: number, product: { price: number; quantity: number }) => total + product.price * product.quantity,
        0,
      );

      await resend.emails.send({
        from: `SaaS <${process.env.DOMAIN_EMAIL}>`,
        to: session.customer_email as string,
        subject: `Order Receipt #${session.id}`,
        react: CheckoutReceipt({
          sessionId: session.id,
          amount: totalAmount,
          customerEmail: session.customer_email as string,
          date: new Date().toLocaleDateString(),
          products,
        }),
      });

      return NextResponse.json({ success: true });
    }
    if (event.type === 'charge.refunded') {
      const charge = event.data.object as Stripe.Charge;
      const customerEmail = charge.billing_details?.email || charge.receipt_email;
      const refunds = await stripe.refunds.list({ charge: charge.id });
      const mostRecentRefund = refunds.data.sort((a, b) => b.created - a.created)[0];
      if (mostRecentRefund && customerEmail) {
        await resend.emails.send({
          from: `SaaS <${process.env.DOMAIN_EMAIL}>`,
          to: customerEmail,
          subject: `Refund Confirmation #${mostRecentRefund.id}`,
          react: RefundReceipt({
            refundId: mostRecentRefund.id,
            amount: mostRecentRefund.amount / 100,
            paymentIntentId: mostRecentRefund.payment_intent as string || '',
            reason: mostRecentRefund.reason || 'Customer request',
            customerEmail,
            date: new Date().toLocaleDateString(),
          }),
        });
      }
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 400 },
    );
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
