async function main(lines) {
  var larger = await positionLargest(lines);

  var [gammaRate, epsRate] = formatOutput(larger);
  console.log(gammaRate, epsRate);
  console.log(gammaRate * epsRate);
}

async function positionLargest(lines) {
  var map = new Map();

  for await (var line of lines) {
    var bits = line.split('').map(e => parseInt(e, 10));
    for (var i = 0; i < bits.length; i++) {
      var bit = bits[i];

      var values = map.get(i) || new Array(2);
      values[bit] = (values[bit] || 0) + 1;

      map.set(i, values);
    }
  }

  var larger = Array.from(map.values()).map(indexOfLargestValue);
  return larger;
}

function formatOutput(larger) {
  var gammaRate = parseInt(larger.join(''), 2);
  var smaller = larger.map(e => e === 0).map(Number);
  var epsRate = parseInt(smaller.join(''), 2);

  return [gammaRate, epsRate];
}

function bigger(a, b) {
  return b > a;
}

function lesser(a, b) {
  return b < a;
}

function indexOfLargestValue(array) {
  return indexOfMostValue(array, bigger, -Infinity);
}

function indexOfSmallestValue(array) {
  return indexOfMostValue(array, lesser, +Infinity);
}

function indexOfMostValue(array, isItMore, value) {
  var answer = -1;
  for (var i = 0; i < array.length; i++) {
    var newValue = array[i];
    if (isItMore(value, newValue)) {
      value = newValue;
      answer = i;
    }
  }

  return answer;
}

var fs = require('fs');
var readline = require('readline');

main(readline.createInterface({ input: fs.createReadStream('sample-input1.txt', 'utf8') }));
// main(readline.createInterface({ input: fs.createReadStream('input1.txt', 'utf8') }));
