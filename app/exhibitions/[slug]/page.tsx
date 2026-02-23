import { promises as fs } from "fs";
import path from "path";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getExhibition(slug: string) {
    const filePath = path.join(process.cwd(), "content/exhibitions.json");
    const data = await fs.readFile(filePath, "utf8");
    const exhibitions = JSON.parse(data);
    return exhibitions.find((e: any) => e.slug === slug);
}

export default async function ExhibitionDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const exhibition = await getExhibition(slug);

    if (!exhibition) {
        notFound();
    }

    const startDate = new Date(exhibition.startDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    const endDate = new Date(exhibition.endDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

    return (
        <main>
            <div className="relative h-[50vh] min-h-[400px] w-full bg-muted overflow-hidden">
                {exhibition.images[0] && (
                    <Image
                        src={exhibition.images[0]}
                        alt={exhibition.title}
                        fill
                        className="object-cover"
                        priority
                    />
                )}
            </div>

            <div className="container mx-auto px-4 py-16 max-w-4xl">
                <header className="mb-12 border-b border-border pb-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">{exhibition.title}</h1>
                    <p className="text-xl text-muted-foreground uppercase tracking-widest mb-2">
                        {exhibition.venue}
                    </p>
                    <p className="text-lg text-muted-foreground">
                        {exhibition.city}, {exhibition.country}
                    </p>
                    <p className="text-lg font-medium mt-4">
                        {startDate} &mdash; {endDate}
                    </p>
                </header>

                <div className="prose prose-lg dark:prose-invert mx-auto max-w-3xl leading-relaxed whitespace-pre-line mb-16">
                    {exhibition.description}
                </div>

                {exhibition.pressLinks && exhibition.pressLinks.length > 0 && (
                    <div className="mt-16 pt-8 border-t border-border">
                        <h3 className="text-2xl font-bold mb-6">Press & Coverage</h3>
                        <ul className="space-y-4">
                            {exhibition.pressLinks.map((link: any, i: number) => (
                                <li key={i}>
                                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline text-lg">
                                        {link.title} &rarr;
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <div className="mt-16 text-center">
                    <Link
                        href={`/contact?subject=Exhibition%20Inquiry%3A%20${encodeURIComponent(exhibition.title)}`}
                        className="inline-block px-8 py-4 bg-foreground text-background font-medium hover:bg-foreground/90 transition-colors"
                    >
                        Inquire About This Exhibition
                    </Link>
                </div>
            </div>
        </main>
    );
}
