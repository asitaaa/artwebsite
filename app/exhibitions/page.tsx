import { promises as fs } from "fs";
import path from "path";
import Link from "next/link";
import Image from "next/image";

async function getExhibitions() {
    const filePath = path.join(process.cwd(), "content/exhibitions.json");
    const data = await fs.readFile(filePath, "utf8");
    return JSON.parse(data);
}

export default async function ExhibitionsPage() {
    const exhibitions = await getExhibitions();

    // Sort by start date, newest first
    exhibitions.sort((a: any, b: any) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());

    return (
        <main className="container mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold mb-12">Exhibitions</h1>

            <div className="space-y-16">
                {exhibitions.map((exhibition: any) => (
                    <article key={exhibition.slug} className="grid md:grid-cols-2 gap-8 items-center border-b border-border pb-16 last:border-0">
                        <Link href={`/exhibitions/${exhibition.slug}`} className="block relative aspect-[16/9] bg-muted overflow-hidden group">
                            {exhibition.images[0] && (
                                <Image
                                    src={exhibition.images[0]}
                                    alt={exhibition.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            )}
                        </Link>
                        <div>
                            <h2 className="text-3xl font-bold mb-4">
                                <Link href={`/exhibitions/${exhibition.slug}`} className="hover:text-accent transition-colors">
                                    {exhibition.title}
                                </Link>
                            </h2>
                            <div className="text-muted-foreground mb-4 font-medium uppercase tracking-wider text-sm space-y-1">
                                <p>{exhibition.venue}, {exhibition.city}, {exhibition.country}</p>
                                <p>
                                    {new Date(exhibition.startDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                    &nbsp;&mdash;&nbsp;
                                    {new Date(exhibition.endDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                </p>
                            </div>
                            <p className="text-foreground leading-relaxed mb-6">{exhibition.description}</p>
                            <Link
                                href={`/exhibitions/${exhibition.slug}`}
                                className="inline-block border-b border-foreground pb-1 font-medium hover:text-accent hover:border-accent transition-colors"
                            >
                                View Details
                            </Link>
                        </div>
                    </article>
                ))}
            </div>
        </main>
    );
}
