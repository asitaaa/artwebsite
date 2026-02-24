import { promises as fs } from "fs";
import path from "path";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getArtwork } from "../../lib/artworks";

export default async function ArtworkPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const artwork = await getArtwork(slug);

    if (!artwork) {
        notFound();
    }

    return (
        <main className="container mx-auto px-4 py-16">
            <Link href={`/medium/${artwork.medium}`} className="text-sm font-medium text-muted-foreground hover:text-foreground mb-8 inline-flex items-center transition-colors">
                ← Back to {artwork.medium.replace(/-/g, ' ')}
            </Link>

            <div className="grid md:grid-cols-2 gap-12 items-start mt-4">
                {/* Left: Image */}
                <div className="relative aspect-[4/5] bg-muted w-full overflow-hidden">
                    {artwork.images[0] && (
                        <Image
                            src={artwork.images[0].url}
                            alt={artwork.images[0].alt}
                            fill
                            className="object-contain"
                        />
                    )}
                </div>

                {/* Right: Info */}
                <div className="space-y-6 sticky top-24">
                    <div>
                        <h1 className="text-4xl font-bold mb-2">{artwork.title}</h1>
                    </div>

                    {artwork.description && (
                        <div className="text-foreground/90 leading-relaxed mb-6">
                            <p>{artwork.description}</p>
                        </div>
                    )}

                    <div className="space-y-1 text-sm">
                        <p><span className="font-medium">Dimensions:</span> {artwork.dimensions}</p>
                        {artwork.collection && (
                            <p><span className="font-medium">Collection:</span> <Link href={`/medium/${artwork.medium}`} className="text-accent hover:underline capitalize">{artwork.collection.replace(/-/g, ' ')}</Link></p>
                        )}
                        <div className="flex items-center gap-2">
                            <span className="font-medium">Status:</span>
                            <span className={`px-2 py-0.5 text-xs uppercase tracking-wider rounded shadow-sm ${artwork.availability === 'available' ? 'bg-green-500/90 text-white' :
                                artwork.availability === 'sold' ? 'bg-red-500/90 text-white' :
                                    artwork.availability === 'on-hold' ? 'bg-yellow-500/90 text-yellow-950' :
                                        'bg-gray-500/90 text-white'
                                }`}>
                                {artwork.availability.replace(/-/g, ' ')}
                            </span>
                        </div>
                        {artwork.price && artwork.availability === 'available' && (
                            <p><span className="font-medium">Price:</span> {artwork.price}</p>
                        )}
                    </div>

                    <div className="pt-8">
                        <Link
                            href={`/contact?artwork=${encodeURIComponent(artwork.title)}`}
                            className="inline-block px-8 py-4 bg-foreground text-background font-medium hover:bg-foreground/90 transition-colors"
                        >
                            Inquire About This Work
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
