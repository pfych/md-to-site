---
title: Markdown to Site
---

This project uses a collection of scripts to generate a static site from a directory of markdown files.

## Getting started

```sh
git clone git@github.com:pfych/md-to-site.git
cd md-to-site
npm install
npm run serve
```

All markdown files in the `content` directory are compiled to HTML using [Pandoc](https://pandoc.org/). The default template that exists at `templates/template.html` is used.

It's possible to modify this template, please refer to [Pandoc's template documentation](https://pandoc.org/MANUAL.html#templates) for more details. 

The variable `$body$` is the documents content, whereas other variables like `$title$`, `$summary$`, etc. are pulled from the markdown metadata defined at the top of the file.

```markdown
---
title: this is the title
summary: this is the summary
---

This is the body content
```

## Working locally
After making any changes to content or templates run `npm run build`, this will rebuild all site content. 

Using `npm run serve` will host a local copy of the site at `127.0.0.1:8080`.

## Deploying
It is possible to deploy this generated site anywhere that serves static HTML. Bellow you will find links on how to use the included serverless deployment method to deploy to AWS.

## Functionality Breakdown
Included in this document is a breakdown of what each of the files under `./src/utils` do and how you can use them.

- [base-files.ts](utils/base-files.md)
- [collate-content.ts](utils/collate-content.md)
- [convert-to-html.ts](utils/convert-to-html.md)
- [exec-promise.ts](utils/exec-promise.md)
- [glob-files.ts](utils/glob-files.md)
- [parse-metadata.ts](utils/parse-metadata.md)


## Serverless Deployment
This site can be deployed using the serverless framework

- [Setting up AWS](serverless/config.md)
- [Deploy to AWS](serverless/deploy.md)
