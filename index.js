// wait for HTML to load
window.addEventListener('DOMContentLoaded', () => {

    const tiles = Array.from(document.querySelectorAll('.tile'));
    const playerDisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    const announcer = document.querySelector('.announcer');

    // array with 9 empty strings that will serve as the board
    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let isGameActive = true;


    // end game states 
    const PLAYERX_WON = 'PLAYERX_WON';
    const PLAYERO_WON = 'PLAYERO_WON';
    const TIE = 'TIE';

    /* 
    Indexes within the board
    [0] [1] [2] 
    [3] [4] [5]
    [6] [7] [8]
    */

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];

            if (a === '' || b === '' || c === ''){
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
            isGameActive = false;
            return;
        }

        if (!board.includes('')) {
            announce(TIE);
        }
    }

    // announces who won or if tie
    const announce = (type) => {
        switch(type){
            case PLAYERO_WON:
                announcer.innerHTML = 'Player <span class="playerO">O</span> Won';
                break;
            case PLAYERX_WON:
                announcer.innerHTML = 'Player <span class="playerX">X</span> Won';
                break;
            case TIE:
                announcer.innerText = 'Tie';
        }
        // removes class hide to show the announcer element
        announcer.classList.remove('hide');
    };

    // makes sure to only use empty tiles
    const isValidAction = (tile) => {
        if (tile.innerText === 'X' || tile.innerText === 'O'){
            return false;
        }
        return true;
    };

    // updates the board tile according to current player?
    const updateBoard = (index) => {
        board[index] = currentPlayer;
    }

    const changePlayer = () => {
        // remove the css class playerX or playerO
        playerDisplay.classList.remove(`player${currentPlayer}`);
        // change currentPlayer to x if it was o, and to o if it was x
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        // update html based on currentPlayer
        playerDisplay.innerText = currentPlayer;
        // add playerX or playerO class
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

    // resets game state and the board
    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        announcer.classList.add('hide');

        if (currentPlayer === 'O') {
            changePlayer();
        }

        tiles.forEach(tile => {
            tile.innerText = '';
            tile.classList.remove('playerX');
            tile.classList.remove('playerO');
        });
    }

    // click event listener to every single tile
    // when clicked - function userAction will be called
    // use tile to edit the element, and index to edit the in memory board array
    tiles.forEach((tile, index) => {
        tile.addEventListener('click', () => userAction(tile, index));
    });

    resetButton.addEventListener('click', resetBoard);


});