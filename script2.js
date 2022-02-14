

const playerController = (() => {
    const playerClick = (square) => {
        console.log(`${square}`);
    }

    return { 
        playerClick
    }

})();

const gameBoard = (() => {
    const htmlBoard = Array.from(document.querySelector('#gbContainer').children);
    const virtualBoard = new Array(9);

    const _init = (() => {

        virtualBoard.fill({
            clicked: null,
        });

    })();

    const setField = (idx) => {
        this.clicked = true;
    }

    htmlBoard.forEach((ele, idx) => {
        ele.addEventListener('click', playerController.playerClick.bind(ele, idx));
        ele.addEventListener('click', gameBoard.setField.bind(ele,idx))
    });
    
    console.log(virtualBoard);

    return {
        virtualBoard,
        setField
    }

})();

const btn = document.getElementById('addBtn')

btn.addEventListener('click', () => addBox());

function addBox() {
    gameBoard.htmlBoard.forEach((x) => console.log(x));
}