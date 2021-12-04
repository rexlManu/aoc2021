import { readByLines, sumNumbers } from '../utils.js';

let rawData = readByLines(new URL('./input', import.meta.url));

const drawnNumbers = rawData[0].split(',').map(Number);

const checkIfWin = (board, number) => {
  // Check Column line
  let win = false;
  board.fields.forEach((line) => {
    const result = line.filter((o) => typeof o === 'object');

    if (result.length == 5) {
      win = true;
    }
  });

  for (let x = 0; x < 5; x++) {
    const numbers = [];
    for (let y = 0; y < 5; y++) {
      numbers.push(board.fields[y][x]);
    }

    const result = numbers.filter((o) => typeof o === 'object');
    if (result.length == 5) {
      win = true;
      break;
    }
  }

  return win ? board : false;
};

const boards = [];

const boardCount = (rawData.length - 1) / 5;
let boardIndex = 0;
for (let index = 1; index < rawData.length; index++) {
  const line = rawData[index];
  if (line == '') {
    continue;
  }

  if (boardIndex == 0) {
    boards.push({
      fields: [
        line
          .split(' ')
          .filter((a) => a != '')
          .map(Number),
      ],
      winningNumber: -1,
    });
  } else {
    boards[boards.length - 1].fields.push(
      line
        .split(' ')
        .filter((a) => a != '')
        .map(Number),
    );
  }

  boardIndex++;

  if (boardIndex == 5) {
    boardIndex = 0;
  }
}

let abort = false;
let winnerBoard = null;
for (let index = 0; index < drawnNumbers.length; index++) {
  const number = drawnNumbers[index];

  // Mark Numbers
  for (const board of boards) {
    if (checkIfWin(board)) continue;
    board.fields = board.fields.map((line) => {
      return line.map((field) => {
        if (field == number) {
          return { number, marked: true };
        } else {
          return field;
        }
      });
    });
  }

  // Check winners
  for (const board of boards) {
    if (checkIfWin(board, number) && !board.checked) {
      board.winningNumber = number;
      winnerBoard = board;
      board.checked = true;
    }
  }

  if (abort) {
    // break;
  }
}

const unmarkedNumbersSum = winnerBoard.fields
  .map((line) => {
    const result = line.filter((o) => typeof o === 'number');
    if (result.length == 0) return [];
    else return result.reduce(sumNumbers);
  })
  .filter((a) => typeof a === 'number')
  .reduce(sumNumbers);

console.log('Result:', unmarkedNumbersSum * winnerBoard.winningNumber);
