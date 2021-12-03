import { readByLines, sumNumbers } from '../utils.js';

let binarySets = readByLines(new URL('./input', import.meta.url));

const trueValues = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const falseValues = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

for (const set of binarySets) {
  for (const numberIndex in set) {
    if (Number(set[numberIndex]) == 1) {
      trueValues[numberIndex] += 1;
    } else {
      falseValues[numberIndex] += 1;
    }
  }
}

let commonBits = '';
let uncommonBits = '';
for (const index in trueValues) {
  if (trueValues[index] > falseValues[index]) {
    commonBits += '1';
  } else {
    commonBits += '0';
  }

  if (trueValues[index] < falseValues[index]) {
    uncommonBits += '1';
  } else {
    uncommonBits += '0';
  }
}

console.log('Part 1:', parseInt(commonBits, 2) * parseInt(uncommonBits, 2));

const filterByRate = (lower) => {
  let filteredSets = binarySets;

  for (const index in binarySets[0]) {
    let ones = 0;
    let zeros = 0;
    for (const set of filteredSets) {
      if (Number(set[index]) == 1) {
        ones++;
      } else zeros++;
    }

    filteredSets = filteredSets.filter((set) => {
      if (lower) {
        if (ones == zeros) {
          return Number(set[index]) == 0;
        }
        if (ones > zeros) {
          return Number(set[index]) == 0;
        } else {
          return Number(set[index]) == 1;
        }
      } else {
        if (ones >= zeros) {
          return Number(set[index]) == 1;
        } else {
          return Number(set[index]) == 0;
        }
      }
    });
    if (filteredSets.length == 1) {
      break;
    }
  }
  return filteredSets;
};

console.log(
  'Part 2:',
  parseInt(filterByRate(false), 2) * parseInt(filterByRate(true), 2),
);
