import Link from 'next/link';

interface ArtworkProps {
    artwork: {
        slug: string;
        title: string;
        year: number;
        medium: string;
        dimensions: string;
        availability: string;
        images: { url: string; alt: string }[];
    };
}

export default function MasonryCard({ artwork }: ArtworkProps) {
    return (
        <Link href={`/artwork/${artwork.slug}`} className="group block mb-8">
            <div className="relative mb-4 overflow-hidden rounded-md bg-muted">
                {artwork.images[0] && (
                    <img
                        src={artwork.images[0].url}
                        alt={artwork.images[0].alt}
                        loading="lazy"
                        className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                )}
                {artwork.availability && (
                    <div className={`absolute top-4 right-4 px-2 py-1 text-xs uppercase tracking-wider backdrop-blur-sm rounded shadow-sm ${artwork.availability === 'available' ? 'bg-green-500/90 text-white' :
                            artwork.availability === 'sold' ? 'bg-red-500/90 text-white' :
                                artwork.availability === 'on-hold' ? 'bg-yellow-500/90 text-yellow-950' :
                                    'bg-gray-500/90 text-white' // not-for-sale
                        }`}>
                        {artwork.availability.replace(/-/g, ' ')}
                    </div>
                )}
            </div>
        </Link>
    );
}
