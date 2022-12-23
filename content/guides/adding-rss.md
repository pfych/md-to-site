---
title: Adding RSS
---

RSS is not included by default in this project as not every site requires an RSS feed, and sites that do usually want to present data in a specific way.

It is possible to extend the content object to include `createdAt` and `updatedAt` dates. I take advantage of `git log` to get these values. The file must exist in the git repo before building otherwise this function will fail.

```ts
// src/utils/file-dates.ts

export interface FileDate {
  updatedAt: string;
  createdAt: string;
}

export const getFileDates = async (file: string): Promise<FileDate> =>
  new Promise((resolve, reject) => {
    exec(
      `git log --follow --format=%ad --date default ${file}`,
      (error, stdout, stderr) => {
        if (error || stderr) {
          reject(error || stderr || error);
        }

        const dates = stdout.split('\n');

        resolve({
          updatedAt: dates[0],
          createdAt: dates[dates.length - 2],
        });
      },
    );
  });
```

You can extend `collateContent` to include these dates, Make sure you also extend the `Content` interface. The example bellow has removed code for brevity.

```ts
// src/utls/collate-content.ts

export const collateContent = async (path: string): Promise<Content[]> => {
  const files = await globFiles(path);

  return Promise.all(
    files.map(async (file) => {
      // [...]
      const dates = await getFileDates(file);

      return {
        // [...]
        dates: dates,
      };
    }),
  );
};
```

Now that you have dates in your content objects, it's possible to write a function that takes an array of content and outputs an RSS xml file.

The bellow example is extremely basic and uses strings however it's possible to use an XML library to do this in a more elegant way.

```ts
// src/build.ts

const buildRSS = async (content: Content[]): Promise<void> => {
  const rssContent = content.map(item => `
    <entry>
      <id>${item.filename}</id>
      <title>${item.title}</title>
      <link>https://example.com/${item.buildPath}/${item.buildFileName}</link>
      <published>${item.dates.createdAt}</published>
      <updated>${item.dates.updatedAt}</updated>
    </entry>`
  )

  await fs.writeFile(
    './build/rss.xml',
    `<?xml version="1.0" encoding="utf-8"?><feed xmlns="http://www.w3.org/2005/Atom">
        <id>https://pfy.ch</id>
        <title>Pfy.ch</title>
        <link href="https://pfy.ch" />
        ${rssContent.join('\n')}
     </feed>`,
  );
}

void (async () => {
  const blogs = await collateContent('./content/blogs/*.md');
  const monthlyUpdates = await collateContent('./content/updates/*.md');
  
  await buildRSS([...blogs, ...monthlyUpdates])
})()
```
