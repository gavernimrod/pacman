var gPacman;
var PACMAN = "ᗤ";

function createPacman(board) {
  gPacman = {
    location: {
      i: 3,
      j: 5
    },
    // color: "#FFFF00",
    isSuper: false
  };
  board[gPacman.location.i][gPacman.location.j] = PACMAN;
}

function movePacman(eventKeyboard) {
  if (!gGame.isOn) return;
  // console.log('eventKeyboard:', eventKeyboard);

  var nextLocation = getNextLocation(eventKeyboard);
  // User pressed none-relevant key in the keyboard
  if (!nextLocation) return;

  var nextCell = gBoard[nextLocation.i][nextLocation.j];

  // Hitting a WALL, not moving anywhere
  if (nextCell === WALL) return;

  // Hitting CHERRY? update score 10!
  if (nextCell === CHERRY) updateScore(10);
  // Hitting FOOD? update score
  if (nextCell === FOOD) {
    updateScore(1);
    gFoodOnBoard--;
  }
  if (nextCell === SUPER_FOOD) {
    if (gPacman.isSuper) return;
    gPacman.isSuper = true;
    changeGhostColor();
    setTimeout(function() {
      gPacman.isSuper = false;
      changeGhostColor(gPacman.isSuper);
    }, 5000);
  }
  if (nextCell === GHOST) {
    if (gPacman.isSuper) {
      removeGhosts(nextLocation);
    } else {
      gameOver();
      renderCell(gPacman.location, EMPTY);
      return;
    }
  }

  // Update the model to reflect movement
  gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
  // Update the DOM
  renderCell(gPacman.location, EMPTY);

  // Update the pacman MODEL to new location
  gPacman.location = nextLocation;

  gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
  // Render updated model to the DOM
  renderCell(gPacman.location, PACMAN);
  checkIfVictory();
}

function getNextLocation(keyboardEvent) {
  var nextLocation = {
    i: gPacman.location.i,
    j: gPacman.location.j
  };

  switch (keyboardEvent.code) {
    case "ArrowUp":
      PACMAN = "ᗢ";
      nextLocation.i--;
      break;
    case "ArrowDown":
      PACMAN = "ᗣ";
      nextLocation.i++;
      break;
    case "ArrowLeft":
      PACMAN = "ᗤ";
      nextLocation.j--;
      break;
    case "ArrowRight":
      PACMAN = "ᗧ";
      nextLocation.j++;
      break;
    default:
      return null;
  }

  return nextLocation;
}
