import { promises as fs } from "fs";
import path from "path";
import ArtworkCard from "../../components/ArtworkCard";
import MasonryCard from "../../components/MasonryCard";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getMedium(slug: string) {
    const filePath = path.join(process.cwd(), "content/mediums.json");
    try {
        const data = await fs.readFile(filePath, "utf8");
        const mediums = JSON.parse(data);
        return mediums.find((m: any) => m.slug === slug);
    } catch (e) {
        return null;
    }
}

async function getArtworks(mediumSlug: string) {
    const filePath = path.join(process.cwd(), "content/artworks.json");
    try {
        const data = await fs.readFile(filePath, "utf8");
        const artworks = JSON.parse(data);
        return artworks.filter((art: any) => art.medium === mediumSlug || art.collection === mediumSlug || art.tags.includes(mediumSlug));
    } catch (e) {
        return [];
    }
}

export async function generateStaticParams() {
    const filePath = path.join(process.cwd(), "content/mediums.json");
    try {
        const data = await fs.readFile(filePath, "utf8");
        const mediums = JSON.parse(data);
        return mediums.map((medium: any) => ({
            slug: medium.slug,
        }));
    } catch (e) {
        return [];
    }
}

export default async function MediumPage({
    params,
    searchParams,
}: {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const resolvedParams = await params;
    const resolvedSearchParams = await searchParams;
    const medium = await getMedium(resolvedParams.slug);

    if (!medium) {
        notFound();
    }

    const artworks = await getArtworks(resolvedParams.slug);
    const statusFilter = typeof resolvedSearchParams.status === 'string' ? resolvedSearchParams.status : 'all';

    const filteredArtworks = artworks.filter((artwork: any) => {
        if (statusFilter === 'all') return true;
        return artwork.availability === statusFilter;
    });

    const statusOptions = [
        { id: 'all', label: 'All' },
        { id: 'available', label: 'Available' },
        { id: 'sold', label: 'Sold' },
        { id: 'on-hold', label: 'On Hold' },
        { id: 'not-for-sale', label: 'Not for Sale' }
    ];

    return (
        <main className="container mx-auto px-4 py-16">
            <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground mb-8 inline-flex items-center transition-colors">
                ← Back to Mediums
            </Link>

            <header className="mb-8">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">{medium.name}</h1>
                <div className="flex flex-wrap gap-2">
                    {statusOptions.map((option) => (
                        <Link
                            key={option.id}
                            href={`/medium/${resolvedParams.slug}${option.id === 'all' ? '' : `?status=${option.id}`}`}
                            className={`px-4 py-2 text-sm rounded-full transition-colors ${statusFilter === option.id
                                    ? "bg-foreground text-background"
                                    : "bg-muted text-foreground hover:bg-muted/80"
                                }`}
                        >
                            {option.label}
                        </Link>
                    ))}
                </div>
            </header>

            {filteredArtworks.length > 0 ? (
                <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-8">
                    {filteredArtworks.map((artwork: any) => (
                        <div key={artwork.id} className="break-inside-avoid">
                            <MasonryCard artwork={artwork} />
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-muted-foreground py-12">More artworks coming soon.</p>
            )}
        </main>
    );
}
