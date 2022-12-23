import path from 'path';
import { moveBaseFiles } from './utils/base-files';
import { collateContent } from './utils/collate-content';
import { convertToHtml } from './utils/convert-to-html';

const mainTemplate = path.resolve('templates', 'template.html');

void (async () => {
  const content = await collateContent('./content/**/*.md');

  await moveBaseFiles();
  await convertToHtml(content, mainTemplate);

  console.log('Complete!');
})();
