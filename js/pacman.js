var gPacman;
var PACMAN = '<img style="transform: rotate(0deg)"  width="20px" src="img/Pacman.png">';

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
      gPacmanDegree = 270;
      rotatePacman(gPacmanDegree);
      nextLocation.i--;
      break;
    case "ArrowDown":
      gPacmanDegree = 90;
      rotatePacman(gPacmanDegree);
      nextLocation.i++;
      break;
    case "ArrowLeft":
      gPacmanDegree = 180;
      rotatePacman(gPacmanDegree);
      nextLocation.j--;
      break;
    case "ArrowRight":
      gPacmanDegree = 0;
      rotatePacman(gPacmanDegree);
      nextLocation.j++;
      break;
    default:
      return null;
  }

  return nextLocation;
}
function rotatePacman(deg){
  PACMAN = `<img  style="transform: rotate(${deg}deg)" id="pacman" width="20px" src="img/Pacman.png">`;
}

function renderCell(location, value) {
  // Select the elCell and set the value
  var elCell = document.querySelector(`.cell${location.i}-${location.j}`);
  elCell.innerHTML = value;
}