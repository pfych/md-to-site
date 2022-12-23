import fs from 'fs/promises';
import path from 'path';
import sass from 'sass';
import { execPromise } from './exec-promise';

const baseFiles: { filename?: string; from?: string; to: string }[] = [
  { filename: 'favicon.ico', from: 'templates', to: 'build' },
];

export const moveBaseFiles = async () => {
  console.log('Moving base files');

  await execPromise(`rm -rf ${path.resolve('./build')}`);

  await Promise.all(
    baseFiles.map((baseFile) => fs.mkdir(baseFile.to, { recursive: true })),
  );

  await Promise.all(
    baseFiles.map(
      (file) =>
        file.filename &&
        fs.copyFile(
          path.resolve(file.from, file.filename),
          path.resolve(file.to, file.filename),
        ),
    ),
  );

  const sassContent = await sass.compileAsync('./templates/style.scss');
  await fs.writeFile('./build/bundle.css', sassContent.css);
};
