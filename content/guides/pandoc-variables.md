---
title: Pandoc Variables
---

| Variable      | Required | Explanation                                       |
|---------------|----------|---------------------------------------------------|
| `title`       | Yes      | The page title, shown in the first header and tab |
| `attribution` | No       | The twitter handle (sans @) of the author         |
| `image`       | No       | A URL to an image, used in embed previews         |
| `alt`         | No       | A summary of the image for vision impaired users  |
| `summary`     | No       | A summary of the pages content                    |

### Example Markdown file
```markdown
---
title: Hello World
attribution: pfy_ch
image: https://example.com/example.png
alt: Image of a butterfly on a flower	
summary: This is an example post
---

This is the posts content
```
