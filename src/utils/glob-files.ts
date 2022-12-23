import { glob } from 'glob';

export const globFiles = (path: string): Promise<string[]> => {
  return new Promise((resolve, reject) =>
    glob(path, (error, data) => {
      if (error) {
        reject(error);
      }
      resolve(data);
    }),
  );
};
