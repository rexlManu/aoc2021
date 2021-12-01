const fs = require('fs');

const measurements = fs
.readFileSync(__dirname+'/input', 'utf-8')
.trim()
.split(/\r?\n/)
.map(Number);

console.log(measurements.reduce((tot, cur, i, arr) => cur > arr[i - 1] ? tot + 1 : tot, 0));
