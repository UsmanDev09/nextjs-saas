import { sendForgotPasswordEmailService } from "@/app/services/authServices";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    try {
        const { email } = await req.json();

        if (!email) {
          return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }
    
        const response = await sendForgotPasswordEmailService(email);
    
        return NextResponse.json(response, { status: 200 });
        
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }
}