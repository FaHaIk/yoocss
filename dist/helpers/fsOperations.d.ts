import { WriteStream } from 'fs';
declare const fileExists: (path: string) => boolean;
declare const readFileSync: (path: string) => string;
declare const writeStream: (path: string, flag: string) => WriteStream;
export { fileExists, readFileSync, writeStream, WriteStream };
