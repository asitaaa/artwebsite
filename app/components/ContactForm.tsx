"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function ContactForm() {
    const searchParams = useSearchParams();
    const [subject, setSubject] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    useEffect(() => {
        const artwork = searchParams.get("artwork");
        if (artwork) {
            setSubject(`Inquiry regarding: ${artwork}`);
        } else {
            setSubject("General Inquiry");
        }
    }, [searchParams]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        const form = e.target as HTMLFormElement;
        const nameElement = document.getElementById("name") as HTMLInputElement;
        const emailElement = document.getElementById("email") as HTMLInputElement;
        const bodyElement = document.getElementById("message") as HTMLTextAreaElement;
        const honeypotElement = document.getElementsByName("b_name")[0] as HTMLInputElement;

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: nameElement.value,
                    email: emailElement.value,
                    subject: subject,
                    message: bodyElement.value,
                    b_name: honeypotElement.value
                }),
            });

            if (response.ok) {
                setSubmitStatus('success');
                // Clear form
                nameElement.value = '';
                emailElement.value = '';
                bodyElement.value = '';
                setSubject('General Inquiry');
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            console.error('Failed to submit form:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6">
            {submitStatus === 'success' && (
                <div className="bg-green-100 text-green-800 p-4 rounded text-sm mb-6">
                    Message sent successfully! We will get back to you soon.
                </div>
            )}

            {submitStatus === 'error' && (
                <div className="bg-red-100 text-red-800 p-4 rounded text-sm mb-6">
                    Failed to send message. Please try again later.
                </div>
            )}
            <div className="grid gap-2">
                <label htmlFor="name" className="text-sm font-medium">Name</label>
                <input
                    id="name"
                    type="text"
                    required
                    className="w-full border border-border rounded px-3 py-2 bg-transparent focus:outline-none focus:ring-1 focus:ring-foreground"
                />
            </div>
            <div className="grid gap-2">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <input
                    id="email"
                    type="email"
                    required
                    className="w-full border border-border rounded px-3 py-2 bg-transparent focus:outline-none focus:ring-1 focus:ring-foreground"
                />
            </div>
            <div className="grid gap-2">
                <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                <input
                    id="subject"
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                    className="w-full border border-border rounded px-3 py-2 bg-transparent focus:outline-none focus:ring-1 focus:ring-foreground"
                />
            </div>
            <div className="grid gap-2">
                <label htmlFor="message" className="text-sm font-medium">Message</label>
                <textarea
                    id="message"
                    required
                    rows={6}
                    className="w-full border border-border rounded px-3 py-2 bg-transparent focus:outline-none focus:ring-1 focus:ring-foreground resize-none"
                ></textarea>
            </div>

            {/* Honeypot field for spam protection */}
            <input type="text" name="b_name" tabIndex={-1} autoComplete="off" className="hidden" />

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-foreground text-background font-medium py-3 rounded hover:bg-foreground/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
        </form>
    );
}
