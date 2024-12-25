import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { authOptions } from '../../auth/[...nextauth]/options';

const stripe = new Stripe(process.env.STRIPE_API_KEY as string);

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const body = await req.json();

  if (!session || !session.user) {
    return NextResponse.json(
      { error: 'Unauthorized: Please log in to proceed' },
      { status: 401 },
    );
  }

  const { products } = body;
  const customerEmail = session.user.email;

  try {
    const lineItems = products.map(
      (product: { name: string; price: number; quantity: number }) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.name,
          },
          unit_amount: product.price * 100,
        },
        quantity: product.quantity,
      }),
    );

    const stripesession = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.FRONTEND_HOST_URL}/admin`,
      cancel_url: `${process.env.FRONTEND_HOST_URL}/cancel`,
      customer_email: customerEmail,
      metadata: {
        products: JSON.stringify(products),
      },
    });

    return NextResponse.json({ url: stripesession.url }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: `${error.message}` }, { status: 500 });
    }
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 },
    );
  }
}
