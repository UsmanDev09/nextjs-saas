import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_API_KEY as string);
interface Product {
    name: string;
    price: number;
    quantity: number;
}
export async function POST (req: Request) {
    const body = await req.json();
    const products: Product[] = body.products;
    try {
        const lineItems = products.map((product: { name: any; price: number; quantity: any; }) => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: product.name, 
                },
                unit_amount: product.price * 100, 
            },
            quantity: product.quantity,
        }));

        const session = await stripe.checkout.sessions.create({
            line_items: lineItems,
            mode: 'payment',
            success_url: `${process.env.FRONTEND_HOST_URL}/success`,
            cancel_url: `${process.env.FRONTEND_HOST_URL}/cancel`,
        });

        return NextResponse.json({url: session.url},{status:200})
    } catch (error) {
        console.error('Error creating checkout session:', error);
        return NextResponse.json({message:"Internal Server Error"},{status:500});
    }
};