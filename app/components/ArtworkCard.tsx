import Link from 'next/link';
import Image from 'next/image';

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

export default function ArtworkCard({ artwork }: ArtworkProps) {
    return (
        <Link href={`/artwork/${artwork.slug}`} className="group block">
            <div className="relative aspect-[4/5] mb-4 overflow-hidden bg-muted">
                {artwork.images[0] && (
                    <Image
                        src={artwork.images[0].url}
                        alt={artwork.images[0].alt}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
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
            <div className="flex justify-between items-baseline">
                <h3 className="font-medium text-lg">{artwork.title}</h3>
                <span className="text-sm text-muted-foreground">{artwork.year}</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">{artwork.medium}</p>
            <p className="text-xs text-muted-foreground mt-1">{artwork.dimensions}</p>
        </Link>
    );
}
