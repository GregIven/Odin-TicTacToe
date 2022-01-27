

const playerController = (() => {
    let playerClick = (square) => {
        console.log(`${square}`);
    }

    return { 
        playerClick
    }

})();

const gameBoard = (() => {
    let htmlBoard = Array.from(document.querySelector('#gbContainer').children);
    let virtualBoard = new Array(9);

    let _init = (() => {
        htmlBoard.forEach((ele, idx) => {
            ele.addEventListener('click', playerController.playerClick.bind(ele, idx));
        })

        virtualBoard.fill({
            clicked: null
        });
    })();
    console.log(virtualBoard);

    _manageTurns = () => {
        
    }
})();