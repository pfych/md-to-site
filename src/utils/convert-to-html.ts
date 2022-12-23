import fs from 'fs/promises';
import path from 'path';
import { Content } from './collate-content';
import { execPromise } from './exec-promise';

export const convertToHtml = async (
  content: Content[],
  template: string,
): Promise<void> => {
  console.log(`Compiling ${content.length} files with template ${template}`);

  await Promise.all(
    content.map((item) => {
      const out = path.resolve('./build', item.buildPath, item.buildFileName);

      fs.mkdir(path.resolve('./build', item.buildPath), { recursive: true });

      return execPromise(
        `pandoc ${item.path}/${item.filename} -t html --template ${template} | sed 's|.md">|.html">|g' | sed 's|href="https://|target="_blank" href="https://|g' > ${out}`,
      );
    }),
  );
};
