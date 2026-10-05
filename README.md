# The Bibliophile Store — optimized static build

Files:
- `index.html` — lightweight HTML shell
- `style.css` — extracted stylesheet
- `app.js` — deferred website logic/catalogue
- `images/` — extracted and WebP-optimized images

## Deploy
Upload all files/folders to the root of your GitHub repository. Vercel should use `index.html` automatically for a static deployment.

The original design/content is preserved; the main performance change is moving Base64 images out of the HTML/JS and serving them as WebP files, plus deferring the application JavaScript.


Logo fix: the animated Bibliophile logo assets use transparent backgrounds, preserving the original animation and avoiding the white/black rectangle issue.


Header book shelves: `mast-books.js` + the "Header book shelves" block at the end of `style.css` add small animated book covers on both sides of the logo (thumbnails in `images/mini/`). To remove them, delete the `<script src="mast-books.js">` line in `index.html`.


Book descriptions: edit `book-info.js` (one entry per book, keyed by its image path). They show in the popup when a book is clicked, in the catalogue or in the header.


Founder section: `#founder` block at the end of `index.html` (before the footer), styles at the end of `style.css`, animation trigger in `founder.js`, photo at `images/founder-lakshay.webp` (background removed, cropped to face and half body).
