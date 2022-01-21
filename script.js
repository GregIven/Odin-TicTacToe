
function mark(boardSquare) {
    return function(playerSel) {
        playerSel = document.createTextNode(playerChoice);
        boardSquare.appendChild(playerSel)
        return boardSquare
    }
}

const generateBoard = () => {
    let squares = new Array(9);
    console.log(squares)
    const gbGrid = document.getElementById('gbContainer');
    const boardSquare = document.createElement('div');

    boardSquare.classList.add('board-square');

    for (let i = 0; i < 9; i++) {
        let squareCopy = boardSquare.cloneNode();

        squareCopy.id = `boardSquare-${i}`
        squareCopy.addEventListener('click', () => { mark() });
        gbGrid.appendChild(squareCopy);
        squares[i] = squareCopy;
        }
    return squares;
}

const gameBoard = (() => {

    const markBoard = (board) => {
        
    }
    //init virtual board
    let board = generateBoard();
    //an array for storing marks
    console.log(board.squares)
})();

const user = (icon) => {
    let playerMark = icon;
    const select = () => {

    }
};

console.log(user.icon);
// const btn = document.getElementById('addBtn')

// btn.addEventListener('click', () => addBox());

// function addBox() {
//     console.log('tick')
// }