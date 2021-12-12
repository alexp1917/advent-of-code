async function main(lines) {
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

  var output = Array.from(map.values()).map(indexOfLargestValue);

  var gammaRate = parseInt(output.join(''), 2);
  console.log(gammaRate)
}

function indexOfLargestValue(array) {
  var answer = -1;
  var value = -Infinity;
  for (var i = 0; i < array.length; i++) {
    var newValue = array[i];
    if (value < newValue) {
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
