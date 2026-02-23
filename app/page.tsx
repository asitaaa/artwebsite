import { promises as fs } from "fs";
import path from "path";
import Link from "next/link";
import Image from "next/image";

async function getMediums() {
    const filePath = path.join(process.cwd(), "content/mediums.json");
    try {
        const data = await fs.readFile(filePath, "utf8");
        return JSON.parse(data);
    } catch (e) {
        return [];
    }
}

export default async function Home() {
    const mediums = await getMediums();

    return (
        <main className="container mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold mb-8 text-center tracking-tight">Browse by Medium</h1>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
                Explore our collection across various traditional and digital mediums.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {mediums.map((medium: any) => (
                    <Link href={`/medium/${medium.slug}`} key={medium.id} className="group block">
                        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-muted">
                            <Image
                                src={medium.coverImage.url}
                                alt={medium.name}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                            <div className="absolute bottom-4 left-4 right-4">
                                <h2 className="text-xl font-medium text-white shadow-sm drop-shadow-md">{medium.name}</h2>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </main>
    );
}
