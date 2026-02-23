import { MetadataRoute } from 'next';
import { promises as fs } from 'fs';
import path from 'path';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.artistname.com';

    // Static routes
    const routes = ['', '/exhibitions', '/about', '/awards', '/contact'].map(route => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // Read local JSON files for dynamic routes
    let artworks = [];
    let collections = [];
    let exhibitions = [];
    let mediums = [];

    try {
        const cwd = process.cwd();
        const [artworksData, collectionsData, exhibitionsData, mediumsData] = await Promise.all([
            fs.readFile(path.join(cwd, 'content/artworks.json'), 'utf8'),
            fs.readFile(path.join(cwd, 'content/collections.json'), 'utf8'),
            fs.readFile(path.join(cwd, 'content/exhibitions.json'), 'utf8'),
            fs.readFile(path.join(cwd, 'content/mediums.json'), 'utf8')
        ]);

        artworks = JSON.parse(artworksData);
        collections = JSON.parse(collectionsData);
        exhibitions = JSON.parse(exhibitionsData);
        mediums = JSON.parse(mediumsData);
    } catch (error) {
        console.error("Error reading content for sitemap", error);
    }

    const artworkRoutes = artworks.map((artwork: any) => ({
        url: `${baseUrl}/artwork/${artwork.slug}`,
        lastModified: new Date(),
        changeFrequency: 'yearly' as const,
        priority: 0.7,
    }));

    const mediumRoutes = mediums.map((medium: any) => ({
        url: `${baseUrl}/medium/${medium.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    const collectionRoutes = collections.map((collection: any) => ({
        url: `${baseUrl}/collections/${collection.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }));

    const exhibitionRoutes = exhibitions.map((exhibition: any) => ({
        url: `${baseUrl}/exhibitions/${exhibition.slug}`,
        lastModified: new Date(),
        changeFrequency: 'yearly' as const,
        priority: 0.6,
    }));

    return [...routes, ...mediumRoutes, ...artworkRoutes, ...collectionRoutes, ...exhibitionRoutes];
}
