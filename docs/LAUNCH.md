# Draft: website and Telegram launch

This branch is not deployed. Do not announce the example URL until it is verified.

1. Review and merge, then publish GitHub Pages from the default branch and `/docs`. Confirm the site returns HTTP 200 without authentication, assets load on mobile, and all comparison cards are usable.
2. Verify the deployed URL prefix in Google Search Console using a permitted verification method. Submit `sitemap.xml` and inspect the home page plus the first substantive device pages. If the canonical host changes, update absolute URLs in the canonical elements and sitemap first. Indexing is not guaranteed.
3. Register a dedicated Telegram Mini App via BotFather and set its HTTPS URL to the same site. Pass supported model slugs in `startapp`, for example `pixel-watch-5__galaxy-watch9__oppo-watch-x3`. The prototype parses the launch parameter, and link sharing currently copies a regular web URL. Verify real Telegram launch on mobile and desktop before adding a Telegram share button or promising this route works. No bot token or Telegram identity is needed for reading a comparison.
4. Keep the first release read-only and rating-free. Add scenario-specific, published criteria only when comparable tests exist; show the source, sample count, and when it was checked. Do not turn missing evidence into a bad score. If public votes are later added, use server-side validation of Telegram init data and rate limits. The comparison is for watches only. Keep the detailed four-variant comparison separate from the broader device directory until more variant-level specs are sourced.

References: [GitHub Pages publishing](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site), [Google Search indexing](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl), [Telegram Mini Apps](https://core.telegram.org/bots/webapps).
