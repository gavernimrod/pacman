"use strict";
const WALL = `<span style="color: blue">▢</span>`;
const FOOD = `<span style="color: white; font-size:20px">•</span>`;
var EMPTY = " ";
const SUPER_FOOD = `<span style="color: red; font-size:40px">❧</span>`;
const CHERRY = "🍒";
var cherryInterval;
var gFoodOnBoard = 53
var gBoard;

var gGame = {
  score: 0,
  isOn: false,
  isPowerOn: false
};

function init() {
  gBoard = buildBoard();
  createPacman(gBoard);
  createGhosts(gBoard);
  printMat(gBoard, ".board-container");
  gGame.score = 0;
  document.querySelector("header h3 span").innerText = gGame.score; // console.table(gBoard);
  document.querySelector(".won").style.display = "none";
  document.querySelector(".lose").style.display = "none";
  document.querySelector(".restart").style.display = "none";
  gGame.isOn = true;
  cherryInterval = setInterval(() => {
    createCherrys();
  }, 5000);
}

function buildBoard() {
  var SIZE = 10;
  var board = [];
  for (var i = 0; i < SIZE; i++) {
    board.push([]);
    for (var j = 0; j < SIZE; j++) {
      board[i][j] = FOOD;

      if (
        i === 0 ||
        i === SIZE - 1 ||
        j === 0 ||
        j === SIZE - 1 ||
        (j === 3 && i > 4 && i < SIZE - 2)
      ) {
        board[i][j] = WALL;
      }
    }
  }
  board[1][8] = SUPER_FOOD;
  board[8][8] = SUPER_FOOD;
  board[8][1] = SUPER_FOOD;
  board[1][1] = SUPER_FOOD;

  return board;
}

function updateScore(value) {
  // Update both the model and the dom for the score
  gGame.score += value;
  document.querySelector("header h3 span").innerText = gGame.score;
}

function checkIfVictory() {
  console.log("test", gFoodOnBoard);
  if (gFoodOnBoard === 0) {
    cleanGame();
    document.querySelector(".won").style.display = "block";
    return;
  }
}

function cleanGame() {
  gGame.isOn = false;
  clearInterval(gIntervalGhosts);
  clearInterval(cherryInterval);
  gIntervalGhosts = null;
  document.querySelector(".restart").style.display = "block";
  document.querySelector(".restart").innerText = "Play Again?";
}

function gameOver() {
  cleanGame();
  document.querySelector(".lose").style.display = "block";
}

function createCherrys() {
  var i = getRandomIntInclusive(1, 8);
  var j = getRandomIntInclusive(1, 8);
  var currCell = gBoard[i][j];
  if (currCell === EMPTY) {
    gBoard[i][j] = CHERRY;
    renderCell({ i, j }, CHERRY);
  }
}
