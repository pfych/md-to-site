---
title: collate-content.ts
---

The collate content function takes a path as input, it then returns an array of objects which contain all required information to build the page.

This is done to avoid potentially scanning directories multiple times, as content is collated first, then passed into build steps.

This project only contains the step of [`convertToHtml`](convert-to-html.md), but it's possible to pass this content object into functions that generate sitemaps, RSS and other pages. You can also extend teh collate content function to add data like last modified or authors.

```typescript
void (async () => {
  const wikiContent = collateContent('./content/wiki/**/*.md')
  const blogContent = collateContent('./content/blog/**/*.md')

  await Promise.all([
    await convertToHtml(wikiContent, wikiTemplate),
    await convertToHtml(blogContent, blogTemplate)
  ])
})()
```
