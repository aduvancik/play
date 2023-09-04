const cells = document.querySelector(".game");
const cellTd = cells.querySelectorAll("td");

const sizeGame = () => {
  const windowWidth = window.innerWidth / 1.2;
  const windowHeight = window.innerHeight / 1.2;
  const targetSize = Math.min(windowWidth, windowHeight);

  cells.style.width = targetSize + "px";
  cells.style.height = targetSize + "px";
}

sizeGame();

let gameOver = false;

cells.addEventListener('click', event => {
  if (Array.prototype.includes.call(cellTd, event.target)) {
    if (!gameOver) {
      whoseTurn(event.target);
    }
  }
});

let counter = 1;

const whoseTurn = (cell) => {
  if (!cell.classList.contains("zero") && !cell.classList.contains("dagger")) {
    cell.classList.add(counter > 0 ? "dagger" : "zero");
    counter *= -1;
  }
  win();
  draw();
}

//виграш
const win = () => {

  const winCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ]

  for (const combination of winCombinations) {
    const [a, b, c] = combination;
    const classA = cellTd[a].className;
    const classB = cellTd[b].className;
    const classC = cellTd[c].className;

    if (classA !== "" && classA === classB && classB === classC) {
      gameOver = true;

      setTimeout(() => endGame(classA), 1000);
    }
  }
}

//кінець партії
const endGame = (winner) => {
  for (const item of cellTd) {
    item.className = "";
  }
  score(winner);
  counter = 1;
  gameOver = false;
}

//нічія
const draw = () => {
  for (const item of cellTd) {
    if (item.className === "") {
      return;
    }
  }
  gameOver = true;
  setTimeout(endGame, 1000);
}

//счотчик
const score = (winner) => {
  const scoreDragger = cells.querySelector(".game_dagger span");
  const scoreZero = cells.querySelector(".game_zero span");

  if (winner === "dagger") {
    scoreDragger.textContent = +scoreDragger.textContent + 1;
  } else if (winner === "zero") {
    scoreZero.textContent = +scoreZero.textContent + 1;
  }

}












