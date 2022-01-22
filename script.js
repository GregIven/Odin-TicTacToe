
// const mark = function(boardSquare) {
//     console.log('mark')
//     return function(playerChoice) {
//         playerSel = document.createTextNode(playerChoice);
//         boardSquare.appendChild(playerSel)
//         return boardSquare
//     }
// }


const generateBoard = () => {
    const gbGrid = document.getElementById('gbContainer');
    const boardSquare = document.createElement('div');

    boardSquare.classList.add('board-square');

    for (let i = 0; i < 9; i++) {
        let squareCopy = boardSquare.cloneNode();
        squareCopy.id = `boardSquare-${i}`
        squareCopy.addEventListener('click', () => console.log(gameBoard.gbState[i].getState()));
        gbGrid.appendChild(squareCopy);
        }
}

const setBoard = (board) => {
    board.forEach((x) => console.log(x))

    function clickX(x) {
        x.innerText = `${x}`
    }

    board.forEach((x) => { 
        x.addEventListener('click', (e) => clickX(e.target) )})
} 
const gameBoard = (() => {
    //an array of boardSquare objs
    let gbState = new Array(9).fill({
        _innerState: null,

        setState: function(state) {
            this._innerState = state;
        },

        getState: function() {
            return this._innerState;
        }
    });

    // console.log(gbState[0].getState())
    generateBoard();
    return { gbState }
})();

const user = (icon) => {
    let playerMark = icon;
    const selectSquare = () => {

    }
};

console.log(user.icon);
const btn = document.getElementById('addBtn')

btn.addEventListener('click', () => addBox());

function addBox() {
    gameBoard.gbState.forEach((x) => console.log(x));
}