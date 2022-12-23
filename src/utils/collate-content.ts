import { globFiles } from './glob-files';
import { parseMetadata } from './parse-metadata';

export interface Content {
  title: string;
  image?: string;
  summary?: string;
  path: string;
  buildPath: string;
  filename: string;
  buildFileName: string;
}

export const collateContent = async (path: string): Promise<Content[]> => {
  console.log(`Collating content at ${path}`);

  const files = await globFiles(path);

  return Promise.all(
    files.map(async (file) => {
      const metadata = await parseMetadata(file);

      return {
        title: metadata.title || '',
        image: metadata.image || '',
        summary: metadata.summary || '',
        path: file
          .split('/')
          .filter((path) => !path.includes('.'))
          .join('/'),
        filename: file.split('/').slice(-1)[0],
        buildPath: file
          .replace('content/', '')
          .split('/')
          .filter((path) => !path.includes('.'))
          .join('/'),
        buildFileName: file.split('/').slice(-1)[0].replace('.md', '.html'),
      };
    }),
  );
};
