const playerController = (() => {
    const playerClick = (square) => {
       
        gameBoardData.virtualBoard[square].clicked = true;
        console.log(gameBoardData.virtualBoard[square])    
    }

    return { 
        playerClick
    }

})();

const displayController = (() => {
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
        })

    return {
        virtualBoard,
    }

})();

console.log(gameBoardData.virtualBoard);

const btn = document.getElementById('addBtn')

btn.addEventListener('click', () => addBox());

function addBox() {
    console.log(gameBoardData.virtualBoard);
}