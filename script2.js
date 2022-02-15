const playerController = (() => {
    const playerClick = (square) => {
        gameBoardData.virtualBoard[square].clicked = true;
        gameBoardData.playerSwitch();
        console.log(gameBoardData.virtualBoard[square])    
    }

    return { 
        playerClick
    }

})();

const displayController = (() => {
    const drawBoard = () => {
        const boardContainer = document.querySelector('#gbContainer');
        const boardSquareChild = document.createElement('div');
        boardSquareChild.className = "board-square";
        boardSquareChild.id = "boardSquare";

        boardSqArray = Array(9).fill(boardSquareChild, 0, 9)
        console.log(boardSqArray)
        boardContainer.append(...boardSqArray)
        // console.log(boardContainer instanceof Element)
        console.log(boardContainer.childNodes)
    }
    drawBoard();
    const htmlBoard = Array.from(document.querySelector('#gbContainer').children);

    htmlBoard.forEach((ele, idx) => {
        ele.addEventListener('click', playerController.playerClick.bind(ele, idx));
    });

    return {
        htmlBoard
    }
})();

const gameBoardData = (() => {

    const virtualBoard = new Array(9).fill({}).map((ele) => {
            const clicked = null;
            return { clicked: clicked }
        });

    let exNotOh = true;
    const playerSwitch = () => {
        exNotOh = !exNotOh;
        console.log(exNotOh);
    }

    return {
        virtualBoard,
        playerSwitch
    }

})();

console.log(gameBoardData.virtualBoard);

const btn = document.getElementById('addBtn')

btn.addEventListener('click', () => addBox());

function addBox() {
    console.log(gameBoardData.virtualBoard);
}