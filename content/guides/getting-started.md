---
title: Getting Started
---

This guide assumes you are running on macOS or Linux. Before starting please install the following:

- [NodeJS](https://nodejs.org/en/)
- git
  - [Linux & Mac Guide](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- AWS CLI v2 
  - [Mac Download](https://awscli.amazonaws.com/AWSCLIV2.pkg)
  - [Linux Instructions](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html#cliv2-linux-install)
- [Visual Studio Code](https://code.visualstudio.com/) or any text editor that can handle markdown

## Getting a copy of this project

Once you have the above installed, open your command line (`terminal` on macOS) and run the following commands:

```sh
cd ~/Documents # This is where the project will be downloaded too
git clone git@github.com:pfych/md-to-site.git
```

Once `git` has finished downloading the project run the following commands:

```sh
cd md-to-site
npm install
```

Once `npm` has finished running. Open Visual Studio Code, and then open the `md-to-site` folder.

## Creating a post or page

Inside Visual Studio Code, there is a list of files and folders displayed on the left. All md files inside the `content` folder are what will be compiled into your website. Delete all of them, since by default the project comes with this site you're reading as its example files.

Create a file called `index.md` inside `content`, an example file might look like the following:

```markdown
---
title: My Website
---

Hello welcome to my website

## About Me heading

This is stuff about me

### Smaller Heading

This is content under a smaller heading

## My Posts

- [Example post](posts/example.md)
```

You can create a folder inside `content` called `posts` (or anything you'd like) and create a file called `example.md`. It could contain the following:

```markdown
---
title: This is an example post
summary: Hello world!
---

Hello, this is an example post by me!  
There are two spaces after the previous line so this wraps inside the same paragraph!

There is a blank line before this line, so it's a new paragraph!
```

You can view a list of variables (title, image, summary, etc.) the default `template.html` uses [here](pandoc-variables.md).

Inside `index.md` we linked to this post with the following syntax:

```markdown
[This is the link label](posts/example.md)
```

Once you've written your content you can compile it with the following command: 

```sh
npm run build
```

To view the site locally, once you've run the above command you can run the following:

```sh
npm run serve
```

Your site should now be viewable on your local computer at http://127.0.0.1:8080.

## Deploying the site to AWS

We use a toolkit called "Serverless Framework" to automatically deploy and manage a server on Amazon Web Services (AWS). To use it you need an AWS account.

### Creating an AWS Account

1. Navigate to the [AWS homepage](https://aws.amazon.com/)
2. Click "Create an AWS Account" in the top right of the page
3. Enter your email address and pick an account name
4. Click verify email address and enter the code sent through to you
5. Pick a secure password! I ***highly*** recommend making this 16+ characters long with numbers and special characters. Make sure to write this down somewhere!
6. Once this is done, select "Personal account" and fill out your details
7. Enter your credit card details
8. Enter your mobile number again to receive a text confirmation code
9. Select the Basic Support free tier

You should now be re-prompted to log in.

1. Select "Root user" and enter your email address.
2. You'll then be prompted to enter your password.

### Creating AWS Credentials

To deploy your website you'll need to create AWS IAM Access Keys.

1. From the [AWS Console Homepage](https://console.aws.amazon.com)
2. In the search bar at the top of the page search for `IAM`
3. Select "IAM" with the subtitle of "Manage access to AWS resources"
4. In the sidebar on the left click "Users"
5. Click "Add users"
6. Enter a Username (Like `Deploy`, or `CLI`)
7. Check "Access Key"
8. Click "Next: Permissions"
9. Click "Attach existing policies directly"
10. Check "AdministratorAccess"
11. Click "Next: Tags"
12. Click "Next: Review"
13. Click "Create user"
14. Click "Download .csv"

Open this CSV in any spreadsheet software or a text editor, keep this file safe as it gives anybody Admin access to your AWS account!

Inside your command line run the following command, it will ask you for the Key ID and the Access Key from the CSV you just downloaded, when prompted for region, enter the AWS region closest to you. Mine is `ap-southeast-2`, Amazons Sydney data-center.

```sh
aws configure
```

If you are not interested in having a separate testing environment you can skip the first command. To deploy your site run the following:

```sh
npm run deploy:dev # Deploy to "development"
npm run deploy:prod # Deploy to "production" (Live site)
```

Those commands will take up to 5 minutes to run however subsequent runs will be near instant.

You can run the following commands to see the Automatically assigned domain name:

```sh
npm run info:dev # Get domain for "development"
npm run info:prod # Get domain for "production"
```

---

### Setting a custom domain name (Optional)

Domain Names are handled through AWS Route53, this service costs $0.50/month per domain, however it includes an SSL certificate & other convenient tools.

This is the most involved step, and I am looking at automating as much of it as I can however for now you'll need to follow these steps.

#### Adding the domain to AWS

You can either purchase a domain through Amazon or BYO domain, the following steps are for a domain purchased through an external service:

1. From the [AWS Console Homepage](https://console.aws.amazon.com)
2. In the search bar at the top of the page search for `Route53`
3. Click "Hosted Zones" in the sidebar on the left
4. Click "Create hosted zone"
5. Enter your Domain Name
6. Ensure the Type is set to "Public"
7. Click "Create hosted zone"
8. Open the "Hosted zone details" dropdown
9. Outside on AWS, in your domain providers dashboard. Change the Nameserver records to the 4 values under "Name Servers" in AWS.
   - **WARNING:** this will replace your existing records, ensure you copy over all values from your old name servers to Route53 before doing this!

It may take up to 24 hours for these records to change globally, but I've seen it update in less than an hour.

#### Adding the domain to your Distribution

1. From the [AWS Console Homepage](https://console.aws.amazon.com)
2. In the search bar at the top of the page search for `Cloudfront`
3. Select the distribution with the origin `md-to-side-prod` in its name
4. Under "Settings" click "Edit"
5. Under "Alternate domain name" add the following (but swap for your domain)
   - `www.example.com`
   - `example.com`
6. Under "Custom SSL certificate" click "Request certificate"
7. Select "Request a public certificate" and click "Next"
8. Under "Fully qualified domain name" enter the following (but swap for your domain)
   - `www.example.com`
   - `example.com`
9. Ensure "DNS validation" is selected
10. Click Request
11. In the banners up the top, click "View Certificate"
12. Under "Domains" click "Create records in Route 53"
13. Click "Create records"
14. Keep refreshing every few minutes until the status is "Issued"
15. Go back to the Cloudfront tab
16. Next to the "Custom SSL Certificate" dropdown click refresh 
17. Select your new Certificate from the dropdown
18. Click Save changes

### Pointing your domain to your Distribution

1. Navigate to your domains Hosted zone you created earlier in Route53
2. Click "Create Record"
3. If not in the Wizard click "Switch to Wizard" 
4. Select "Simple Routing"
5. Click "Next"
6. Click "Define simple record"
7. Leave subdomain empty
8. Set Record type to `A` (should be the default)
9. Under "Value/Route traffic to select "Alias to a Cloudfront distribution"
10. Select your distribution bellow
11. Click Define simple record
12. Repeat steps 6 - 10 but set the subdomain value to `www`
13. Click Create records

It may take up to 24 hours for these records to change globally, but I've seen it go live in less than an hour.
