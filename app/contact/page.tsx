import { Suspense } from "react";
import ContactForm from "../components/ContactForm";

export default function ContactPage() {
    return (
        <main className="container mx-auto px-4 py-16">
            <div className="max-w-2xl mx-auto text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">Contact & Inquiries</h1>
                <p className="text-muted-foreground">
                    For studio visits, purchasing inquiries, or press, please reach out via the form below.
                </p>
            </div>
            <Suspense fallback={<div className="text-center py-12 text-muted-foreground">Loading form...</div>}>
                <ContactForm />
            </Suspense>
        </main>
    );
}
