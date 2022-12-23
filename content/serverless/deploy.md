---
title: Deploying to AWS with Serverless
---

Once you've [configured AWS CLI](config.md) you can deploy using serverless.

```sh
npm run build
npm run deploy:dev # Deploy to Amazon 
npm run info:dev # Output the URL
```

Once happy with the site you can deploy to the prod environment. Deploying to dev is not necessary if you don't want a testing environment.

```sh
npm run build
npm run deploy:prod # Deploy to Amazon 
npm run info:prod # Output the URL
```

First deploy may take up to 5 minutes however subsequent deploys should complete in less than 30 seconds.

## Adding a domain

Adding a domain is not required by default, Cloudfront will provide you a `foobar.cloudfront.net` domain for free. This is viewable using `npm run info:dev` or `npm run info:prod`

If using Route53, ensure that you've added your domain as an "Alternate Domain" in the cloudfront configuration.
