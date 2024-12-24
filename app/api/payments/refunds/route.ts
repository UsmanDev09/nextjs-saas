import Stripe from 'stripe';
import { Resend } from 'resend';
import RefundReceipt from '@/app/emails/RefundReceipt';

const stripe = new Stripe(process.env.STRIPE_API_KEY as string);
const resend = new Resend(process.env.RESEND_API_KEY as string);
export async function POST(request: Request) {
  try {
    const {
      paymentIntentId, amount, reason, customerEmail,
    } = await request.json();

    if (!paymentIntentId) {
      return new Response(
        JSON.stringify({ error: 'Payment intent ID is required' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        },
      );
    }
    const refund = await stripe.refunds.create({
      payment_intent: paymentIntentId,
      amount,
      reason: reason as Stripe.RefundCreateParams.Reason,
    });
    if (refund.status === 'succeeded' && customerEmail) {
    //   try {
    //     console.log('Sending email receipt to:', customerEmail);
    //     const { data, error } = await resend.emails.send({
    //       from: 'SaaS <onboarding@resend.dev>',
    //       to: customerEmail,
    //       subject: `Refund Receipt #${refund.id}`,
    //       react: RefundReceipt({
    //         refundId: refund.id,
    //         amount: refund.amount,
    //         paymentIntentId: refund.payment_intent as string,
    //         reason: refund.reason || 'not specified',
    //         customerEmail,
    //         date: new Date().toLocaleDateString(),
    //       }),
    //     });
    //     console.log('Email sent:', data);
    //   } catch (emailError) {
    //     console.error('Failed to send email receipt:', emailError);
    //     return new Response(
    //       JSON.stringify({
    //         refund,
    //         warning:
    //           'Refund processed successfully but failed to send email receipt',
    //       }),
    //       {
    //         status: 200,
    //         headers: { 'Content-Type': 'application/json' },
    //       },
    //     );
    //   }
      try {
        console.log('Sending email receipt to:', customerEmail);
        const response = await resend.emails.send({
          from: `SaaS <${process.env.DOMAIN_EMAIL}>`,
          to: customerEmail,
          subject: `Refund Receipt #${refund.id}`,
          react: RefundReceipt({
            refundId: refund.id,
            amount: refund.amount,
            paymentIntentId: refund.payment_intent as string,
            reason: refund.reason || 'not specified',
            customerEmail,
            date: new Date().toLocaleDateString(),
          }),
        });
        console.log('Email send response:', response);
      } catch (error) {
        console.error('Failed to send email receipt:', error);
      }
    }

    return new Response(JSON.stringify({ refund }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Refund error:', error);
    return new Response(JSON.stringify({ error: 'Failed to process refund' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const refundId = searchParams.get('refundId');

    if (!refundId) {
      return new Response(JSON.stringify({ error: 'Refund ID is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const refund = await stripe.refunds.retrieve(refundId);

    return new Response(JSON.stringify({ refund }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching refund:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch refund details' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }
}
