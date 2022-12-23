import { exec } from 'child_process';

export const execPromise = (command: string): Promise<string> => {
  return new Promise((resolve, reject) =>
    exec(command, (error, stdout, stderr) => {
      if (error || stderr) {
        reject(error || stderr);
      }

      resolve(stdout);
    }),
  );
};
