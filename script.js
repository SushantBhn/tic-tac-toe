let gameBoard = (function () {
    let rows = 3;
    let cols = 3;

    /*3*3 array to store cell values:
    0-unassigned
    1-player 1
    2-player 2*/
    let board = [
        [1, 0, 0], 
        [0, 1, 0], 
        [2, 2, 1]
    ];
    console.log(board);

    //Place markers of players
    function placeMarker (row, column, marker) {
        board[row][column] = marker;
    }

    //Check if the game is over
    function gameResult() {
        for(let i = 0; i < rows; i++) {
            for(let j = 0; j < cols; j++) {
                // console.log(board[i][j]);

                //Check for column-wise match
                if(i == 1) {
                    if(board[i][j] == board[i - 1][j] && board[i][j] == board[i + 1][j]) {
                        return `Player ${board[i][j]} wins by column`;
                    }
                }

                //Check for row-wise match
                if(j == 1) {
                    if(board[i][j] == board[i][j - 1] && board[i][j] == board[i][j + 1]) {
                        return `Player ${board[i][j]} wins by row`;
                    }
                }

                //Check for diagonal match
                if(i == 1 && j == 1) {
                    //Check for  left diagonal match
                    if(board[i][j] == board[i - 1][j - 1] && board[i][j] == board[i + 1][j + 1]) {
                        return `Player ${board[i][j]} wins by left diagonal`;
                    }

                    //Check for right diagonal match
                    else if(board[i][j] == board[i - 1][j + 1] && board[i][j] == board[i + 1][j - 1]) {
                        return `Player ${board[i][j]} wins by right diagonal`;
                    }
                }
            }
        }
    }
    let result = gameResult();
    console.log(result);
    return {board, placeMarker};
})();

//Create new player objects
function player(name) {
    return {name};

}

let gameController = function () {
    let turn = 0;

}
