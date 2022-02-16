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
        });
    
    let boolean = true;
    
    const playerSwitch = (bool) => {
        return bool = !bool
    }

    return {
        virtualBoard,
        playerSwitch
    }

})();

console.log(gameBoardData.virtualBoard);

const btn = document.getElementById('addBtn')

btn.addEventListener('click', () => testFunc());

function testFunc() {
    console.log(gameBoardData.playerSwitch());
}