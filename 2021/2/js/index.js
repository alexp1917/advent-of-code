var input = `forward 5
down 5
forward 8
up 3
down 8
forward 2`;
var lines = input.split('\n');

async function main(lines) {
  var h = 0, d = 0;
  for await (var line of lines) {
    var [ direction, count ] = line.split(' ');
    var number = parseInt(count, 10);
    switch (direction) {
      case 'forward': {
        h += number;
        break;
      }

      case 'down': {
        d += number;
        break;
      }

      case 'up': {
        d -= number;
        break;
      }

      default: {
        h -= number;
        break;
      }
    }
  }

  console.log(h, d);
  console.log(h * d);
}

// main(lines);

var fs = require('fs');
var readline = require('readline');

// main(readline.createInterface({ input: fs.createReadStream('sample-input1.txt', 'utf8') }));
main(readline.createInterface({ input: fs.createReadStream('input1.txt', 'utf8') }));
