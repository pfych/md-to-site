import fs from 'fs/promises';

export const parseMetadata = async (
  file: string,
): Promise<Record<string, string>> => {
  const fileContent = await fs.readFile(file);
  const fileArray = fileContent.toString().split('---');

  if (fileArray[1]) {
    const metaString = fileArray[1];
    const metaArray = metaString.split('\n').filter((line) => line);
    return metaArray.reduce(
      (prev, current) => ({
        ...prev,
        [current.split(':')[0]]: current.replace(/^.*: /, ''),
      }),
      {},
    );
  }

  return {};
};
