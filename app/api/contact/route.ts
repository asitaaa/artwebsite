import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const { name, email, subject, message, b_name } = await request.json();

        // Honeypot check
        if (b_name) {
            return NextResponse.json({ error: 'Spam detected' }, { status: 400 });
        }

        if (!name || !email || !message) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const { data, error } = await resend.emails.send({
            from: 'Art Website Contact <onboarding@resend.dev>', // Resend default for testing, user should verify a domain
            to: ['asitaithal@gmail.com'],
            subject: subject || 'New Contact Form Submission',
            replyTo: email,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        });

        if (error) {
            console.error("Resend API error:", error);
            return NextResponse.json({ error }, { status: 500 });
        }

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error("Contact API error:", error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
