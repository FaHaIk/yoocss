import * as fs from 'fs';
import { WriteStream } from 'fs';
import { logError, logWarning } from './logger.js';
const NO_CONFIG_FILE_WARNING = 'The default YooCSS configuration will be used instead!';
const fileExists = (path) => {
    try {
        fs.accessSync(path);
        return true;
    }
    catch (err) {
        logError(err.message);
        logWarning(NO_CONFIG_FILE_WARNING);
        return false;
    }
};
const readFileSync = (path) => {
    let data = '';
    try {
        data = fs.readFileSync(path, 'utf8');
    }
    catch (err) {
        logError(err.message);
        // process.exit(1);
        throw new Error(err.message);
    }
    return data;
};
const writeStream = (path, flag) => {
    const ws = fs.createWriteStream(path, { flags: flag });
    ws.on('error', err => {
        logError(err.message);
        // process.exit(1);
        throw new Error(err.message);
    });
    return ws;
};
export { fileExists, readFileSync, writeStream, WriteStream };
//# sourceMappingURL=fsOperations.js.map