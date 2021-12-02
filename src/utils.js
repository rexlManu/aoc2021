import { readFileSync } from 'fs';

export function sumNumbers(a, b) {
  return a + b;
}

export function readByLines(filePath) {
  return readFileSync(filePath, 'utf-8').trim().split(/\r?\n/);
}
