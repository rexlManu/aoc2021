const fs = require('fs');

// Part 1
let measurements = fs
  .readFileSync(__dirname + '/input', 'utf-8')
  .trim()
  .split(/\r?\n/)
  .map(Number);

console.log(
  measurements.reduce(
    (tot, cur, i, arr) => (cur > arr[i - 1] ? tot + 1 : tot),
    0,
  ),
);

// Part 2
const sumNumbers = (a, b) => a + b;

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

console.log(increasedTotal);
