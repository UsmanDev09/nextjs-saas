import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_API_KEY as string);

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
      metadata: {
        customerEmail,
      },
    });

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
