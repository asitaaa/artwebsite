import type { Metadata } from 'next';
import { promises as fs } from 'fs';
import path from 'path';

export const metadata: Metadata = {
    title: 'Awards | Darshini Aithal',
    description: 'Awards and recognitions received by Darshini Aithal.',
};

async function getAwards() {
    const filePath = path.join(process.cwd(), 'content/awards.json');
    try {
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (e) {
        console.error('Failed to parse awards JSON', e);
        return [];
    }
}

export default async function AwardsPage() {
    const awards = await getAwards();

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
                    {awards.map((award: any, index: number) => (
                        <div key={index} className="flex flex-col md:flex-row gap-4 border-b border-border pb-8">
                            <div className="md:w-1/4 font-medium text-muted-foreground">
                                {award.year}
                            </div>
                            <div className="md:w-3/4">
                                <h3 className="text-xl font-semibold mb-2">{award.title}</h3>
                                <p className="text-muted-foreground mb-1">{award.organization}</p>
                                <p className="text-sm">{award.description}</p>
                            </div>
                        </div>
                    ))}
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
