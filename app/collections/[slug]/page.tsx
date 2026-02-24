import { promises as fs } from "fs";
import path from "path";
import Image from "next/image";
import { notFound } from "next/navigation";
import ArtworkCard from "../../components/ArtworkCard";

async function getCollection(slug: string) {
    const filePath = path.join(process.cwd(), "content/collections.json");
    const data = await fs.readFile(filePath, "utf8");
    const collections = JSON.parse(data);
    return collections.find((c: any) => c.slug === slug);
}

import { getAllArtworks } from "../../lib/artworks";

async function getCollectionArtworks(collectionSlug: string) {
    const artworks = await getAllArtworks();
    return artworks.filter((a: any) => a.collection === collectionSlug);
}

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const collection = await getCollection(slug);
    const artworks = await getCollectionArtworks(slug);

    if (!collection) {
        notFound();
    }

    return (
        <main>
            {/* Collection Hero */}
            <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center bg-black">
                <Image
                    src={collection.heroImage}
                    alt={collection.name}
                    fill
                    className="object-cover opacity-60"
                    priority
                />
                <div className="relative z-10 text-center text-white px-4 max-w-3xl">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6">{collection.name}</h1>
                    <p className="text-xl md:text-2xl opacity-90">{collection.intro}</p>
                </div>
            </section>

            {/* Artworks Grid */}
            <section className="container mx-auto px-4 py-16">
                <h2 className="text-3xl font-bold mb-8">Works in this Collection</h2>
                {artworks.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {artworks.map((artwork: any) => (
                            <ArtworkCard key={artwork.id} artwork={artwork} />
                        ))}
                    </div>
                ) : (
                    <p className="text-muted-foreground">No artworks found in this collection currently.</p>
                )}
            </section>
        </main>
    );
}
