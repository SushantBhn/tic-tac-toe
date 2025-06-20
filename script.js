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
    function placeMarker(row, column, marker, player1, player2) {
        board[row][column] = marker;
        displayBoard(board, player1, player2);
    }

    function resetBoard(player1, player2) {
        board = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ];
        displayBoard(board, player1, player2);
    }

    //Check if the game is over
    function gameResult() {
        // First check for wins
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                //Check for column-wise match
                if (i == 1) {
                    if (board[i][j] == board[i - 1][j] && board[i][j] == board[i + 1][j] && board[i][j] != 0) {
                        return board[i][j];
                    }
                }

                //Check for row-wise match
                if (j == 1) {
                    if (board[i][j] == board[i][j - 1] && board[i][j] == board[i][j + 1] && board[i][j] != 0) {
                        return board[i][j];
                    }
                }

                //Check for diagonal match
                if (i == 1 && j == 1) {
                    //Check for  left diagonal match
                    if (board[i][j] == board[i - 1][j - 1] && board[i][j] == board[i + 1][j + 1] && board[i][j] != 0) {
                        return board[i][j];
                    }

                    //Check for right diagonal match
                    else if (board[i][j] == board[i - 1][j + 1] && board[i][j] == board[i + 1][j - 1] && board[i][j] != 0) {
                        return board[i][j];
                    }
                }
            }
        }

        // Then check if board is full
        let isBoardFull = true;
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                if (board[i][j] == 0) {
                    isBoardFull = false;
                    break;
                }
            }
        }

        // Return "Draw" only if board is full and no winner
        return isBoardFull ? "Draw" : null;
    }

    return { placeMarker, resetBoard, gameResult };
})();

//Create new player objects
function player(name, marker) {
    return { name, marker };

}

//Control the flow of the game
let gameController = (function () {
    let currentPlayer1;
    let currentPlayer2;
    let turn = 1;
    let marker;

    //Initialize the game round
    function init(player1, player2) {
        currentPlayer1 = player1;
        currentPlayer2 = player2;
        turn = 1;
    
        // Reinitialize the event listeners for the cells
        let cells = document.querySelectorAll(".container div div");
        Array.from(cells).forEach((cell) => {
            // Remove any existing click events before reattaching
            cell.removeEventListener("click", cellClickListener);

            // Re-attach the event listener to each cell
            cell.addEventListener("click", cellClickListener);
        });
    }

    // Function to handle cell click
    function cellClickListener(event) {
        // If the cell is already marked or the game is over, do nothing
        if (event.target.textContent != "" || gameBoard.gameResult()) {
            return;
        }

        // Determine whose turn it is and set the marker
        if (turn === 1) {
            marker = currentPlayer1.marker;
            turn = 2;
        } else {
            marker = currentPlayer2.marker;
            turn = 1;
        }

        // Place the marker in the clicked cell
        const row = event.target.dataset.row;
        const column = event.target.dataset.column;
        gameBoard.placeMarker(row, column, marker, currentPlayer1, currentPlayer2);
    }

    return { init };
})();

//Display the current status of the board
function displayBoard(board, player1, player2) {
    let divId = 1;//variable to store  the ids of the board cells(ordered from 1 to 9 in row-wise manner)
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            let div = document.getElementById(divId);
            if (board[i][j] == 1) {
                div.textContent = "X";
            }
            else if (board[i][j] == 2) {
                div.textContent = "O";
            }
            else {
                div.textContent = "";
            }
            divId++;
        }
    }

    //Display winner upon game end
    let para = document.querySelector(".winner");
    let winningMarker = gameBoard.gameResult();
    if (winningMarker == 1) {
        para.textContent = `${player1.name} wins!`;
        console.log(player1.name);
    }
    else if (winningMarker == 2) {
        para.textContent = `${player2.name} wins!`;
    }
    //Game ends in draw
    else if (winningMarker == "Draw") {
        para.textContent = "The game ends in a draw!";
    }
    else {
        para.textContent = "";//Clear winner if no result
    }
}

//Button to start or restart the game
let startbtn = document.querySelector(".start-restart");
//Dialog box to input player names
let dialog = document.querySelector("#dialog");

//Open the modal to input player names
let submitbtn = document.querySelector(".submit");
startbtn.addEventListener("click", (event) => {
    dialog.showModal();
});

//Create new player objects
submitbtn.addEventListener("click", (event) => {
    event.preventDefault();

    //Handle user input
    // const form = dialog.querySelector("form");
    const player1Name = document.getElementById("player1").value || "Player 1"; // Use "Player 1" if empty
    console.log(player1Name);
    const player2Name = document.getElementById("player2").value || "Player 2"; // Use "Player 2" if empty
    console.log(player2Name);

    let player1 = player(player1Name, 1);
    let player2 = player(player2Name, 2);

    //Reset the board
    gameBoard.resetBoard(player1, player2);

    //Start the game
    gameController.init(player1, player2);
    dialog.close();
});