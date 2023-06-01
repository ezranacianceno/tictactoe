// wait for HTML to load
window.addEventListener('DOMContentLoaded', () => {

    const tiles = Array.from(document.querySelectorAll('.tile'));

    const playerDisplay = document.querySelector('.reset');
    const announcer = document.querySelector('.announcer');

    // array with 9 empty strings that will serve as the board
    let board = ['', '', '', '', '', '', '', '', '', '']
    let currentPlayer = 'X';
    let isGameActive = true;


    // end game states 
    const PLAYERX_WON = 'PLAYERX_WON';
    const PLAYERY_WON = 'PLAYERY_WON';
    const TIE = 'TIE';

    /* 
    Indexes within the board
    [0] [1] [2] 
    [3] [4] [5]
    [6] [7] [8]
    */

    const winningConditions = [
        [0, 1 ,2],
        [3, 4 ,5],
        [6, 7 ,8],
        [0, 3 ,6],
        [1, 4 ,7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const changePlayer = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerDisplay.innerText = currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`);
    }

    const userAction = (tile, index) => {
        if(isValidAction(tile) && isGameActive) {
            // add html element based on current player
            tile.innerText = currentPlayer;
            // adds css class based on current player
            tile.classList.add(`player${currentPlayer}`);
            updateBoard(index);
            handleResultValidation();
            changePlayer();
        }
    }

    // click event listener to every single tile
    // when clicked - function userAction will be called
    // use tile to edit the element, and index to edit the in memory board array
    tiles.forEach((tile, index) => {
        tile.addEventListener('click', () => userAction(tile, index));
    });

    resetButton.addEventListener('click', resetBoard);

    
});