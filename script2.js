

const playerController = (() => {
    let playerClick = (square) => {
        console.log(`${square}`)
    }

    return { 
        playerClick
    }

})();

const gameBoard = (() => {
    let htmlBoard = Array.from(document.querySelector('#gbContainer').children)
    console.log(htmlBoard)
    let _init = (() => {
        htmlBoard.forEach((ele, idx) => {
            ele.addEventListener('click', playerController.playerClick.bind(ele, idx))
        })
    })();
})();