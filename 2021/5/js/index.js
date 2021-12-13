function max(a, b) {
  return Math.max(a, b);
}

function getMaxNumber(lines) {
  return lines.map(e => Array.from(e.match(/\d+/g)).reduce(max)).reduce(max);
}

function getInitialSize(maxNumber) {
  return Math.pow(10, (maxNumber + '').length);
}

function main(lines) {
  var state = getInitialState(getInitialSize(getMaxNumber(lines)));
  for (var line of lines) {
    var ventCoordinate = parse(line);
    var aligned = isAligned(ventCoordinate);

    /**
     * if (aligned) console.log(ventCoordinate)
     *
     * [ [ 0, 9 ], [ 5, 9 ] ]
     * [ [ 9, 4 ], [ 3, 4 ] ]
     * [ [ 2, 2 ], [ 2, 1 ] ]
     * [ [ 7, 0 ], [ 7, 4 ] ]
     * [ [ 0, 9 ], [ 2, 9 ] ]
     * [ [ 3, 4 ], [ 1, 4 ] ]
     * [Finished in 63ms]
     */
    mark(ventCoordinate, state);
  }

  console.log(formatMatrix(state.matrix))
  var numOverlaps = countOverlaps(state.matrix);
  console.log('we have', numOverlaps, 'places where vents overlap')
}

function countOverlaps(matrix) {
  var result = 0;
  for (var i = 0; i < matrix.length; i++) {
    var row = matrix[i];

    for (var j = 0; j < row.length; j++) {
      var element = row[j];

      if (element.vents > 1)
        result++;
    }
  }
  return result;
}

function formatMatrix(matrix) {
  return matrix.map(row => (
    row.map(el => el.vents || '.').join('')
  )).join(os.EOL);
}

function getInitialState(matrixSize = 9) {
  return {
    matrix: new Array(matrixSize).fill(null)
      .map(() => new Array(matrixSize).fill(null)
        .map(() => ({ vents: 0 }))),
  };
}

function mark(coord, state) {
  var [ [ x1, y1 ], [ x2, y2 ] ] = coord;
  var { matrix } = state;

  var x_min = Math.min(x1, x2);
  var x_max = Math.max(x1, x2);
  var y_min = Math.min(y1, y2);
  var y_max = Math.max(y1, y2);

  if (y1 === y2) {
    // console.log('marching from x1 to x2', x1, x2, 'at', y1);

    for (var x = x_min; x <= x_max; x++) {
      matrix[y1][x].vents++;
    }
  } else if (x1 === x2) {
    // console.log('marching from y1 to y2', y1, y2, 'at', x1);

    for (var y = y_min; y <= y_max; y++) {
      matrix[y][x1].vents++;
    }
  } else if (x_max - x_min === y_max - y_min) {
    var diagonal = x_max - x_min;

    var xRev = x1 === x_min;
    var yRev = y1 === y_min;

    // important to be '<=' !!!
    for (var i = 0; i <= diagonal; i++) {
      var x = xRev ? x_min + i : x_max - i;
      var y = yRev ? y_min + i : y_max - i;

      matrix[y][x].vents++;
    }
  }

  // console.log('after coord', coord, 'matrix is now')
  // console.log(formatMatrix(state.matrix))
}

function vertical(c) {
  return c[0][0] === c[1][0]
}

function horizontal(c) {
  return c[0][1] === c[1][1];
}

function isAligned(c) {
  return horizontal(c) || vertical(c);
}

function parse(l) {
  return l.split(' -> ').map(e => {
    return e.split(',').map(n => parseInt(n, 10));
  });
}

var fs = require('fs');
var os = require('os');

// main(fs.readFileSync('sample-input1.txt', 'utf8').split(os.EOL));
main(fs.readFileSync('input1.txt', 'utf8').split(os.EOL));
