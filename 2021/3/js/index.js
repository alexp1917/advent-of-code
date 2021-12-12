async function epsGammaRates(lines) {
  var [larger, smaller] = await positionLargest(lines);

  var [gammaRate, epsRate] = formatOutput(larger, smaller);
  console.log(gammaRate, epsRate);
  console.log(gammaRate * epsRate);
}

async function main(lines) {
  var buffer = [];
  for await (var line of lines)
    buffer.push(line);

  var oxy = await lifeSupportValue(buffer, true);
  var co2 = await lifeSupportValue(buffer, false);

  console.log('oxy', oxy, 'co2', co2)
  console.log(oxy * co2)
}

async function lifeSupportValue(buffer, larger = true) {
  var positionLargerIndex = larger ? 0 : 1;

  var position = 0;
  var lastMostValues;
  while (buffer.length > 1 && position <= buffer[0].length) {
    var positions = await positionLargest(buffer);
    lastMostValues = positions[positionLargerIndex];

    // console.log('buffer was', buffer.join(', '));
    // moved conditional out of loop for optimization
    // if (buffer.length === 2)
    //   buffer = parseInt(buffer[0], 2) > parseInt(buffer[1], 2) ? [buffer[0]] : [buffer[1]];
    // else
      buffer = buffer.filter(e => e[position] == lastMostValues[position]);

    position++;
  }

  if (buffer.length === 1)
    return parseInt(buffer[0], 2);

  // pick the larger one
  console.log(buffer, position)
  console.log(buffer[0][position], buffer[1][position], larger)
  buffer = (buffer[0][position] == (larger ? 1 : 0)) ? [buffer[0]] : [buffer[1]];

  console.log(buffer[0])
  console.log(parseInt(buffer[0], 2))
  return parseInt(buffer[0], 2);
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
  var smaller = larger.map(e => e === 0).map(Number);
  return [larger, smaller];
}

function formatOutput(larger, smaller) {
  var gammaRate = parseInt(larger.join(''), 2);
  var epsRate = parseInt(smaller.join(''), 2);

  return [gammaRate, epsRate];
}

function bigger(a, b) {
  return b >= a;
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

// main(readline.createInterface({ input: fs.createReadStream('sample-input1.txt', 'utf8') }));
main(readline.createInterface({ input: fs.createReadStream('input1.txt', 'utf8') }));
