const boardElement = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const restartButton = document.getElementById('restart');
console.log("what is my restart button "+restartButton);

boardElement.addEventListener('click', handleCellClick);
restartButton.addEventListener('click', restartGame);

let boardState = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameActive = true;

const winningConditions = [,
    ,
    ,
    ,
    ,
    ,
    ,
    [2, 4, 6]
];

function handleCellClick(event) {
    console.log("HANDLE CLICK START");

    const clickedCell = event.target;

    if (!clickedCell.classList.contains('cell')) return;

    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    // if (boardState[clickedCellIndex] !== "" || !isGameActive) {
    //     return;
    // }

    updateCell(clickedCell, clickedCellIndex);
    changePlayer();
    // validateResult();
}

function updateCell(cell, index) {
    boardState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());
    cell.disabled = true;

}

function changePlayer() {
    console.log("Change! CURR " + currentPlayer);
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    const color = currentPlayer === "X" ? "#00d2ff" : "#ff007f";
    // statusDisplay.innerHTML = `Player <span style="color: ${color}">${currentPlayer}</span>'s turn`;
}

function validateResult() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = boardState[winCondition[0]];
        let b = boardState[winCondition[1]];
        let c = boardState[winCondition[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        const color = currentPlayer === 'X' ? '#00d2ff' : '#ff007f';
        statusDisplay.innerHTML = `Player <span style="color: ${color}">${currentPlayer}</span> Wins! 🎉`;
        isGameActive = false;
        return;
    }

    let roundDraw = !boardState.includes("");
    if (roundDraw) {
        statusDisplay.textContent = "Game ended in a draw! 🤝";
        isGameActive = false;
        return;
    }
}

function restartGame() {
    boardState = ["", "", "", "", "", "", "", "", ""];
    isGameActive = true;
    currentPlayer = "X";
    // statusDisplay.innerHTML = `Player <span style="color: #00d2ff">X</span>'s turn`;

    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove('x', 'o');
        cell.disabled = false;
    });
}

boardElement.addEventListener('click', handleCellClick);


