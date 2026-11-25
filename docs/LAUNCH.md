# WearOS Index web publishing

WearOS Index is a standalone static site published with GitHub Pages. Comparison links work in a browser without an account.

1. Publish from the default branch and `/docs`. Check that the site, comparison table, and all three guides work on desktop and mobile.
2. To monitor Google Search, verify the deployed URL prefix in Search Console and submit `sitemap.xml`. If the canonical host changes, update canonical URLs and the sitemap first. Submission does not guarantee indexing.
3. Keep the comparison evidence-based. `compare-data.js` holds device variants, sources, and labels in English, Russian, and Romanian. Add specifications only with a source for the exact variant. Leave unverified fields blank rather than assigning a score. Share a comparison using its web link; the selected models and language are included.

References: [GitHub Pages publishing](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site), [Google Search indexing](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl).
