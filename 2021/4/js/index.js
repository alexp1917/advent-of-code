// constants
// var GRID_W = 5;
var GRID_H = 5;
var WINNER = 5;
var LINES_BETWEEN_SECTIONS = 1;

function main(lines) {
  lines = lines.split(os.EOL);
  var moves = lines[0].split(',').map(e => parseInt(e, 10));
  
  var boards = readBoards(lines);
  
  for (var i = 0; i < moves.length; i++) {
    var move = moves[i];

    for (var j = 0; j < boards.length; j++) {
      var board = boards[j];

      for (var k = 0; k < board.length; k++) {
        var row = board[k];

        for (var l = 0; l < row.length; l++) {
          var element = row[l];

          if (element.value === move) {
            element.marked = true;

            if (wins(board)) {
              var score = move * sumUnmarked(board);
              console.log('board', j + 1, 'wins! score:', score);
              return;
            }
          }
        }
      }
    }
  }
}

function sumUnmarked(board) {
  var result = 0;
  for (var i = 0; i < board.length; i++) {
    var row = board[i];

    for (var j = 0; j < row.length; j++) {
      var element = row[j];

      if (element.marked)
        continue;

      result += element.value;
    }
  }

  // console.log('sum of', board, 'is', result);
  return result;
}

function wins(board) {
  for (var i = 0; i < board.length; i++) {
    var rowAllMarked = true;
    for (var j = 0; j < board[i].length; j++) {
      if (!board[i][j].marked) {
        rowAllMarked = false;
        break;
      }
    }

    if (rowAllMarked)
      return true;
  }

  for (var i = 0; i < board[0].length; i++) {
    var columnAllMarked = true;

    for (var j = 0; j < board.length; j++) {
      if (!board[j][i].marked) {
        columnAllMarked = false;
        break;
      }
    }

    if (columnAllMarked)
      return true;
  }

  return false;
}

function testWins() {
  var assert = require('assert');
  var m = { marked: true };
  assert.ok(wins([[{}, {}, {}], [m, m, {}], [m, m, m]]));
  assert.ok(!wins([[{}, {}, {}], [m, m, {}], [m, m, {}]]));
  assert.ok(wins([[m, {}, {}], [m, m, {}], [m, m, {}]]));
  assert.ok(wins([[m, m, m], [m, m, {}], [m, m, {}]]));
  assert.ok(wins([[m, m, {}], [m, m, {}], [m, m, {}]]));
  assert.ok(wins([[m, m, {}], [m, m, {}], [{}, m, {}]]));
}
// testWins();

function readBoards(lines, offset = 2) {
  var boards = [];

  while ((offset + GRID_H) < lines.length) {
    boards.push(readBoard(lines, offset));
    offset += GRID_H + LINES_BETWEEN_SECTIONS;
  }

  return boards;
}

function readBoard(lines, offset, numLines = GRID_H) {
  var result = [];
  for (var i = offset; i < (offset + numLines); i++) {
    var line = lines[i];
    var row = line.trim()
      .split(/\s+/)
      .map(e => ({ value: parseInt(e, 10)}));
    result.push(row);
  }

  return result;
}

var fs = require('fs');
var os = require('os');

// main(fs.readFileSync('sample-input1.txt', 'utf8'));
main(fs.readFileSync('input1.txt', 'utf8'));
