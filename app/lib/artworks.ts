import { promises as fs } from 'fs';
import path from 'path';

export async function getAllArtworks() {
    const filePath = path.join(process.cwd(), 'content/artworks.json');
    try {
        const data = await fs.readFile(filePath, 'utf8');
        const artworks = JSON.parse(data);

        const publicArtworksPath = path.join(process.cwd(), 'public/artworks');

        let localFiles: string[] = [];
        try {
            localFiles = await fs.readdir(publicArtworksPath);
        } catch (e) {
            // directory might not exist yet, but it should since we created it
        }

        const enhancedArtworks = artworks.map((artwork: any) => {
            // Check if there is an image in public/artworks matching the artwork slug
            const localImage = localFiles.find(
                file => file.startsWith(artwork.slug + '.') && /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(file)
            );

            if (localImage) {
                // Replace the remote image with the local one
                artwork.images = [{
                    url: `/artworks/${localImage}`,
                    alt: artwork.title
                }];
            }

            return artwork;
        });

        return enhancedArtworks;
    } catch (e) {
        console.error('Failed to parse artworks JSON', e);
        return [];
    }
}

export async function getArtwork(slug: string) {
    const artworks = await getAllArtworks();
    return artworks.find((a: any) => a.slug === slug);
}
