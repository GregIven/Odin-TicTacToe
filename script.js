const clickMe = document.getElementById('addBtn');

const generateBoard = (gBoard) => {
    const boardSquare = document.createElement('div');

    boardSquare.classList.add('board-square');

    for (let i = 0; i < 9; i++) {
        let squareCopy = boardSquare.cloneNode();
        squareCopy.id = `boardSquare-${i}`
        gBoard.appendChild(squareCopy);
        }

    return gBoard;
}

const gameBoard = (() => {
    const gbGrid = document.getElementById('gbContainer');

    const board = generateBoard(gbGrid)
    
    return board
})();

console.log(gameBoard);

clickMe.addEventListener('click', () => addBox());

function addBox() {
    let p = document.createElement('p')
    p.innerText = 'glo';
    gbGrid.append(p)
}