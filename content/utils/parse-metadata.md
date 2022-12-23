---
title: parse-metadata.ts
---

This function reads the content in the metadata section of your Markdown document and returns `Record<string, string>`

```markdown
---
title: Example
value: Foo Bar
author: John Appleseed
---
```

is parsed to be

```js
{
  title: "Example"
  value: "Foo Bar"
  author: "John Appleseed"
}
```
