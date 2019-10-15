var GHOST = "ᗣ";
var gIntervalGhosts;
var gGhosts;

function createGhost(board) {
  var ghost = {
    location: {
      i: 3,
      j: 3
    },
    color: getRandomColor(),
    valuranable: '#"0023ee"',
    currCellContent: FOOD
  };
  gGhosts.push(ghost);
  board[ghost.location.i][ghost.location.j] = GHOST;
}

function createGhosts(board) {
  gGhosts = [];

  // empty the gGhosts array, create some ghosts
  createGhost(board);
  createGhost(board);
  createGhost(board);
  //  and run the interval to move them
  gIntervalGhosts = setInterval(moveGhosts, 1500);
}

function moveGhosts() {
  for (var i = 0; i < gGhosts.length; i++) {
    var ghost = gGhosts[i];

    // Create the moveDiff
    var moveDiff = getMoveDiff();
    var nextLocation = {
      i: ghost.location.i + moveDiff.i,
      j: ghost.location.j + moveDiff.j
    };
    // console.log('ghost.location', ghost.location, 'nextLocation', nextLocation, 'moveDiff', moveDiff)

    // if WALL return
    if (gBoard[nextLocation.i][nextLocation.j] === WALL) return;

    if (gBoard[nextLocation.i][nextLocation.j] === PACMAN && gPacman.isSuper) {
      removeGhosts(nextLocation);
      return;
    }
    // debugger
    // if PACMAN - gameOver, return
    if (gBoard[nextLocation.i][nextLocation.j] === PACMAN) {
      if (!gPacman.isSuper) gameOver();
      return;
    }
    // if GHOST - give up
    if (gBoard[nextLocation.i][nextLocation.j] === GHOST) {
      return;
    }

    // set back what we stepped on: update Model, DOM
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent;
    renderCell(ghost.location, ghost.currCellContent);

    // move the ghost
    ghost.location = nextLocation;

    // keep the contnet of the cell we are going to
    ghost.currCellContent = gBoard[nextLocation.i][nextLocation.j];

    // move the ghost and update model and dom
    gBoard[ghost.location.i][ghost.location.j] = GHOST;
    if (gPacman.isSuper)
      renderCell(ghost.location, getGhostHTML(ghost, ghost.valuranable));
    else renderCell(ghost.location, getGhostHTML(ghost, ghost.color));
  }
}
function getMoveDiff() {
  var randNum = getRandomIntInclusive(0, 100);
  if (randNum < 25) {
    return { i: 0, j: 1 };
  } else if (randNum < 50) {
    return { i: -1, j: 0 };
  } else if (randNum < 75) {
    return { i: 0, j: -1 };
  } else {
    return { i: 1, j: 0 };
  }
}

function changeGhostColor() {
  for (i = 0; i < gGhosts.length; i++) {
    if (gPacman.isSuper) {
      gGhosts[i].color = "blue";
    } else {
      gGhosts[i].color = getRandomColor();
    }
  }
}

function removeGhosts(ghostCell) {
  var ghostIdx;
  for (var i = 0; i < gGhosts.length; i++) {
    if (
      gGhosts[i].location.i === ghostCell.i &&
      gGhosts[i].location.j === ghostCell.j
    )
      ghostIdx = i;
  }
  gGhosts.splice(ghostIdx, 1);
}

function getGhostHTML(ghost) {
  return `<span style="color: ${ghost.color}">${GHOST}</span>`;
}
