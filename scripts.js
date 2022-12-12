// Mastermind Scripts
const colors = [
  "red",
  "green",
  "blue",
  "yellow",
  "black",
  "white",
  "brown",
  "purple"
];
const codeColors = startingColors(colors, 4);
const rowCounter = document.getElementById("row-counter");
console.log(codeColors);

function startingColors(colors) {
  let newColors = [];
  for (let x = 0; x < colors.length / 2; x++) {
    newColors.push(colors[Math.floor(Math.random() * colors.length)]);
  }
  return newColors;
}

function rowTest() {
  let codeColorsTemp = [...codeColors];
  let chosenColors = [];
  let correctResults = 0;
  let currentRow = rowCounter.innerText;
  checkWinLoss(correctResults, currentRow);
  let resultsPlaces = document.getElementById(`results-${currentRow}`).children;
  let rowColors = document.getElementById(`player-row-${currentRow}`).children;
  for (let rowColor of rowColors) {
    chosenColors.push(rowColor.style.backgroundColor);
  }

  // check for correct color && position, win
  codeColorsTemp.forEach((codeColor, index) => {
    if (codeColor === chosenColors[index]) {
      resultsPlaces[correctResults].style.backgroundColor = "white";
      codeColorsTemp[index] = codeColorsTemp.slice(1);
      chosenColors[index] = chosenColors.slice(1);
      correctResults++;
      if (checkWinLoss(correctResults, currentRow) !== "keep playing") {
        return;
      }
    }
  });

  // check for correct color
  codeColorsTemp.forEach((codeColor) => {
    let chosenIndex = chosenColors.indexOf(codeColor);
    if (chosenIndex !== -1) {
      resultsPlaces[correctResults].style.backgroundColor = "black";
      chosenColors[chosenIndex] = `chosen_${chosenColors[chosenIndex]}`;
      correctResults++;
    }
  });

  // check for none correct, game over
  if (correctResults === 0) {
    document.getElementById(`none-correct-${currentRow}`).style.visibility =
      "visible";
    rowCounter.innerText = currentRow - 1;
    return;
  }
  checkWinLoss(correctResults, currentRow);
  rowCounter.innerText = currentRow - 1;
}

function checkWinLoss(correctResults, currentRow) {
  let youWon = correctResults === 4 ? "you-won" : false;
  let gameOver = currentRow === "1" ? "game-over" : false;
  if (youWon || gameOver) {
    let message = youWon ? "you-won" : "game-over";
    document.getElementById(message).style.display = "block";
    document.getElementById("clear-row-button").style.display = "none";
    document.getElementById("test-row-button").style.display = "none";
    document.getElementById("start-over-button").innerText = "PLAY AGAIN";
    let returnValue = youWon === "you-won" ? true : false;
    return returnValue;
  }
  return "keep playing";
}

// create board rows with unique ids
let board = document.getElementById("board");
let gameRow = document.getElementById("game-row-1");
for (x = 2; x < 11; x++) {
  board.appendChild(gameRow.cloneNode(true));
  let newGameRow = board.lastChild;
  newGameRow.id = `game-row-${x}`;
  newGameRow.children[0].id = `player-row-${x}`;
  newGameRow.children[1].id = `results-${x}`;
  newGameRow.children[2].id = `none-correct-${x}`;
}

let colorOptions = document.getElementById("color-options");
colors.forEach((color, index) => {
  let colorOption = document.createElement("div");
  colorOption.id = `color-option-${index}`;
  colorOption.style.backgroundColor = color;
  colorOption.addEventListener("click", setColor);
  colorOptions.appendChild(colorOption);
});

for (let x = 0; x < colorOptions.length; x++) {
  colorOptions[x].addEventListener("click", setColor);
}

function setColor() {
  let currentRow = document.getElementById("row-counter").innerText;
  let playerRow = document.getElementById(`player-row-${currentRow}`).children;
  let chosenColor = this.style.backgroundColor;
  for (let y = 0; y < playerRow.length; y++) {
    let currentColor = playerRow[y].style.backgroundColor;
    if (currentColor === "") {
      playerRow[y].style.backgroundColor = chosenColor;
      break;
    }
  }
}

function clearRow() {
  let currentRow = document.getElementById("row-counter").innerText;
  let playerRow = document.getElementById(`player-row-${currentRow}`).children;
  for (let y = 0; y < playerRow.length; y++) {
    playerRow[y].style.backgroundColor = "";
  }
}
