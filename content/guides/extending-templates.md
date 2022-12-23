---
title: Extending Templates
---

This guide requires some basic `Typescript` knowledge, as well as basic `HTML` & `CSS` know-how.

We will, using a fresh copy of this project, add a new template and generate files using this template. 

## Creating a new template

Under the `./templates` folder create your new template. We'll call it `demo.html`.

The bare minimum for a template is the following:
```html
<!DOCTYPE html>
<html lang="en">
    <head>
      <title>$title$</title>
    </head>
    <body>
      $body$
    </body>
</html>
```

This is just standard HTML, you can include a custom stylesheet or javascript to extend functionality.

## Using the new template

Inside `build.ts` underneath the variable declaration for `mainTemplate` add your template. The final code should look something like this:

```ts
const mainTemplate = path.resolve('templates', 'template.html');
const demoTemplate = path.resolve('templates', 'demo.html');
```

Inside the main function in build you can mark certain files to use this template. By default, every file uses the `mainTemplate` declaration.

```ts
void (async () => {
  /** We want the homepage to use a specific template so it needs to be collated seperately */
  const hompage = await collateContent('./content/index.md');
  const mainContent = await collateContent('./content/main/*.md');
  
  /** Collate the content we want to use the demo template on seperate to other content */
  const demoContent = await collateContent('./content/demo/*.md'); 

  await moveBaseFiles();
  await Promise.all([
    /** Compile the homepage with the main template */
    convertToHtml(hompage, mainTemplate),
    /** Compile main content with the main template */
    convertToHtml(mainContent, mainTemplate),
    /** Compile demo content with the demo template */
    convertToHtml(demoContent, mainTemplate),
  ])

  console.log('Complete!');
})();

```
