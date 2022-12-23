---
title: convert-to-html.ts
---

This function uses pandoc to convert your markdown files into html. We first run pandoc on the files, and then use `sed` to make outbound links open in a new tab, this is then written to a file in the build location.

We use [`execPromise`](exec-promise.md) to iterate over all markdown files in parallel.

```sh
pandoc myFile.md -t html --template myTemplate.html \
    | sed 's|href="https://|target="_blank" href="https://|g' \
    > myFile.html
```
