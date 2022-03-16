let newGame = (board, player, text) => {
  board = ["", "", "", "", "", "", "", "", ""];
  player = "X";
  resetBtn.classList.remove("appear");
  createButtons().tileBtn.innerText = null;
  return resetBtn;
};

let gameController = (board) => {
  let player = "X";
  let winner = false;
  const playerText = document.querySelector(".player");

  const combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function checkwinner(index) {
    combinations.forEach(function (combinaition) {
      let check = combinaition.every((id) => board[id] == board[index]);
      if (check) {
        playerText.innerText = `Player ${board[index]} won!`;
        winner = true;

        if (winner) {
          const resetBtn = document.querySelector(".reset");
          resetBtn.classList.add("appear");
          resetBtn.addEventListener("click", function () {
            board = ["", "", "", "", "", "", "", "", ""];
            player = "X";
            // resetBtn.classList.remove("appear");
            createButtons().tileBtn.innerText = null;
            console.log(board);
            console.log(createButtons().tileBtn.innerText);
          });
        }
      }
    });
  }

  function checkDraw() {
    if (winner === false && board.every((tile) => tile != "")) {
      playerText.innerText = `It's a draw!`;
      return true;
    }
  }

  return { checkwinner, checkDraw, player };
};

let createButtons = () => {
  const tileBtn = document.createElement("button");
  tileBtn.classList.add("button");
  tileBtn.innerText = null;
  return { tileBtn };
};

let gameBoard = (() => {
  let gameBoard = ["", "", "", "", "", "", "", "", ""];
  let board = document.querySelector(".board");
  const table = gameController(gameBoard);
  let currentPlayer = gameController().player;

  for (let i = 0; i < gameBoard.length; i++) {
    let button = createButtons().tileBtn;

    board.appendChild(button);

    button.addEventListener("click", () => {
      button.innerText = currentPlayer;
      gameBoard.splice(i, 1, currentPlayer);
      currentPlayer === "X" ? (currentPlayer = "O") : (currentPlayer = "X");
      gameBoard[i] != ""
        ? (button.disabled = "true")
        : (button.disabled = "false");

      table.checkwinner(i);
      table.checkDraw();
    });
  }
})();
