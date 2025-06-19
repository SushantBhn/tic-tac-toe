let gameBoard = (function () {
    let rows = 3;
    let cols = 3;

    /*3*3 array to store cell values:
    0-unassigned
    1-player 1
    2-player 2*/
    let board = [
        [0, 0, 0], 
        [0, 0, 0], 
        [0, 0, 0]
    ];

    //Place markers of players
    function placeMarker (row, column, marker) {
        board[row][column] = marker;
        displayBoard();
    }

    //Check if the game is over
    function gameResult() {
        for(let i = 0; i < rows; i++) {
            for(let j = 0; j < cols; j++) {
                if(board[i][j] == 0) {
                    return;
                }

                //Check for column-wise match
                if(i == 1) {
                    if(board[i][j] == board[i - 1][j] && board[i][j] == board[i + 1][j]) {
                        return board[i][j];
                    }
                }

                //Check for row-wise match
                if(j == 1) {
                    if(board[i][j] == board[i][j - 1] && board[i][j] == board[i][j + 1]) {
                        return board[i][j];
                    }
                }

                //Check for diagonal match
                if(i == 1 && j == 1) {
                    //Check for  left diagonal match
                    if(board[i][j] == board[i - 1][j - 1] && board[i][j] == board[i + 1][j + 1]) {
                        return board[i][j];
                    }

                    //Check for right diagonal match
                    else if(board[i][j] == board[i - 1][j + 1] && board[i][j] == board[i + 1][j - 1]) {
                        return board[i][j];
                    }
                }
            }
        }
    }

    return {board, placeMarker, gameResult};
})();

//Create new player objects
function player(name) {
    return {name};

}

let gameController = function () {
    let turn = 1;
    let marker;
    let cells = document.querySelectorAll(".container div div");
    Array.from(cells).forEach((cell) => {
        cell.addEventListener("click", (event) => {
            if(cell.textContent != 0 || gameBoard.gameResult()) {
                return;
            }

            if(turn == 1) {
                marker = 1;
                turn = 2;
            }
            else if(turn == 2) {
                marker = 2;
                turn = 1;
            }


            gameBoard.placeMarker(cell.dataset.row, cell.dataset.column, marker);
        })
    })
}

function displayBoard() {
    let divId = 1;//variable to store  the ids of the board cells(ordered from 1 to 9 in row-wise manner)
    for(let i = 0; i < gameBoard.board.length; i++) {
        for(let j = 0; j < gameBoard.board.length; j++) {
            let div = document.getElementById(divId);
            if(gameBoard.board[i][j] == 1) { 
            div.textContent = "X";
            }
            else if(gameBoard.board[i][j] == 2) {
                div.textContent = "O";
            }
            divId++;
        }
    }

    let para = document.querySelector(".winner");
    let winningMarker = gameBoard.gameResult();
    if(winningMarker == 1) {
        para.textContent = "Player 1 wins!"
    }
    else if(winningMarker == 2) {
        para.textContent = "Player 2 wins!"
    }
}

gameController();