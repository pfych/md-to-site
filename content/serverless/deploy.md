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

If your Domains DNS is handled by Route53, inside the AWS Dashboard you can do the following:

1. Navigate to Cloudfront
2. Open the Cloudfront distribution you want to add the domain to
3. Under General, then Settings, click the edit button
4. Under Alternate domain names, add your domain. Add both `www.example.com` and `example.com`
5. Under custom SSL certificate click "Request certificate"
6. Request a Public Certificate
7. Add `*.example.com` and `example.com` 
8. Use DNS validation & then Request
9. Click the "Add records to Route53" button or add the records yourself
10. Go back to the tab with Cloudfront open and click the refresh button next to the certificates dropdown
11. Click your certificate
12. Click save changes
