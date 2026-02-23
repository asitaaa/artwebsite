import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Awards | Darshini Aithal',
    description: 'Awards and recognitions received by Darshini Aithal.',
};

export default function AwardsPage() {
    return (
        <main className="container mx-auto px-4 py-16">
            <header className="mb-12 max-w-3xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-foreground">
                    Awards &amp; Recognitions
                </h1>
                <p className="text-xl text-muted-foreground">
                    Highlights of my artistic journey and achievements.
                </p>
            </header>

            <div className="max-w-3xl mx-auto">
                <div className="space-y-12">
                    <div className="flex flex-col md:flex-row gap-4 border-b border-border pb-8">
                        <div className="md:w-1/4 font-medium text-muted-foreground">
                            2024
                        </div>
                        <div className="md:w-3/4">
                            <h3 className="text-xl font-semibold mb-2">First Place - Mixed Media Category</h3>
                            <p className="text-muted-foreground mb-1">Annual Regional Art Exhibition</p>
                            <p className="text-sm">Awarded for the artwork "Echoes of Time".</p>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 border-b border-border pb-8">
                        <div className="md:w-1/4 font-medium text-muted-foreground">
                            2023
                        </div>
                        <div className="md:w-3/4">
                            <h3 className="text-xl font-semibold mb-2">Honorable Mention</h3>
                            <p className="text-muted-foreground mb-1">National Society of Painters</p>
                            <p className="text-sm">Recognized for outstanding contribution to contemporary landscape painting.</p>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 border-b border-border pb-8">
                        <div className="md:w-1/4 font-medium text-muted-foreground">
                            2021
                        </div>
                        <div className="md:w-3/4">
                            <h3 className="text-xl font-semibold mb-2">Emerging Artist Grant</h3>
                            <p className="text-muted-foreground mb-1">City Arts Council</p>
                            <p className="text-sm">Recipient of the annual grant supporting promising local talent.</p>
                        </div>
                    </div>
                </div>

                <div className="mt-16 text-center">
                    <p className="text-muted-foreground mb-4">Interested in collaboration or inquiries?</p>
                    <a href="/contact" className="inline-block bg-foreground text-background px-6 py-3 rounded hover:bg-foreground/90 transition-colors font-medium">
                        Get in Touch
                    </a>
                </div>
            </div>
        </main>
    );
}
