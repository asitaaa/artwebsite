# Artwork Images Folder

Drop your artwork images into this folder to automatically override the remote URLs specified in `content/artworks.json`.

## How to use

1. Look at `content/artworks.json` and find the slug of the artwork you want to upload a local picture for. For example: `"slug": "calligraphy-art-1"`.
2. Save your image into this `public/artworks` folder.
3. Name your image file so it exactly matches the slug. Supported file extensions: `.jpg`, `.jpeg`, `.png`, `.webp`, `.gif`, `.svg`. 
4. For example, your file should be named: `calligraphy-art-1.jpg`.
5. The website's centralized image fetching logic will automatically detect the file and render it on your site instead of whatever image URL was hardcoded into the JSON file!
