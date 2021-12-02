const fs = require('fs');

const sumNumbers = (a, b) => a + b;

let commandList = fs
  .readFileSync(__dirname + '/input', 'utf-8')
  .trim()
  .split(/\r?\n/);

const FORWARD = 'forward';
const DOWN = 'down';
const UP = 'up';

const filterByCommand = (commandName) =>
  commandList
    .filter((command) => command.split(/ /g)[0] == commandName)
    .map((command) => Number(command.split(/ /g)[1]))
    .reduce(sumNumbers);

const forwardCount = filterByCommand(FORWARD);
const depthCount = filterByCommand(DOWN) - filterByCommand(UP);
// Part 1
console.log('Part 1:', forwardCount * depthCount);

let aim = 0;
let horizontalPosition = 0;
let depth = 0;
for (const command of commandList) {
  const [commandName, count] = command
    .split(/ /g)
    .map((value) => (value.length == 1 ? Number(value) : value));

  switch (commandName) {
    case FORWARD:
      horizontalPosition += count;
      depth += count * aim;
      break;
    case DOWN:
      aim += count;
      break;
    case UP:
      aim -= count;
      break;
  }
}
// Part 2
console.log('Part 2:', horizontalPosition * depth);
