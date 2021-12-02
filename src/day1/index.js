import { readByLines, sumNumbers } from '../utils.js';

// Part 1
let measurements = readByLines(new URL('./input', import.meta.url)).map(Number);

console.log(
  'Part 1:',
  measurements.reduce(
    (tot, cur, i, arr) => (cur > arr[i - 1] ? tot + 1 : tot),
    0,
  ),
);

// Part 2
let increasedTotal = 0;

for (let index = 0; index < measurements.length - 2; index++) {
  const currentWindow = measurements.slice(index, index + 3).reduce(sumNumbers);
  const nextWindow = measurements
    .slice(index + 1, index + 4)
    .reduce(sumNumbers);

  if (nextWindow > currentWindow) {
    increasedTotal++;
  }
}

console.log('Part 2:', increasedTotal);
