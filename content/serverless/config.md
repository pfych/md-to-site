---
title: Configuring AWS with Serverless
---

This guide is assuming you have the following:

- An AWS account
- AWS CLI v2 installed
- An IAM user and their details
  - `aws_access_key_id`
  - `aws_secret_access_key` 

---

Inside the `~/.aws/credentials` file add the following:
```
[md-to-site]
aws_access_key_id = YOURACCESSKEYGOESHERE
aws_secret_access_key = YOURSECRETKEYGOESHERE
```

It's possible to use a pre-configured credential by replacing all `md-to-site` references in the following files:

- `package.json`
- `serverless.yml`

Find and replace will work for `md-to-site`

Once this is configured you can [deploy your site](deploy.md)
