const playerController = (() => {
    const playerSwitch = () => { 
        if(gameBoardData.exNotOh) {
            gameBoardData.exNotOh = !gameBoardData.exNotOh;
            return 'X';
        } else {
            gameBoardData.exNotOh = !gameBoardData.exNotOh;
            return 'O';
        }
        
    }

    const playerClick = (square) => {
        gameBoardData.virtualBoard[square].click = true;
        gameBoardData.virtualBoard[square].setSquare(playerSwitch());
        displayController.redraw();
        console.log(gameBoardData.virtualBoard[square])    
    }

    return { 
        playerClick,
        playerSwitch
    }

})();

const displayController = (() => {
    const gbReference = document.querySelector('#gbContainer');
    
    let htmlBoard;

    const drawBoard = (() => {
        const buildSq = () => {
            const boardSquareChild = document.createElement('div');
            boardSquareChild.className = "board-square";
            boardSquareChild.id = "boardSquare";
            return boardSquareChild
        }
        
        let boardSqArray = Array.from( {length: 9}, buildSq);
        gbReference.append(...boardSqArray)
        htmlBoard = Array.from(gbReference.children);
        console.log(htmlBoard[0] instanceof Element)
        return {
            gbReference, htmlBoard
            }
    })();

    const redraw = () => {
        console.log('yoo')
        htmlBoard.forEach((ele, idx) => {
            if (gameBoardData.virtualBoard[idx].click === true) {
                console.log(ele)
                ele.innerHtml = `<p1>${gameBoardData.virtualBoard[idx].symbol}</p1>`
                ele.removeEventListener('click', playerController.playerClick.bind(ele, idx));
            }
        })
        return htmlBoard
    }

    console.log(htmlBoard);

    htmlBoard.forEach((ele, idx) => {
        ele.addEventListener('click', playerController.playerClick.bind(ele, idx));
    });

    return {
        htmlBoard,
        drawBoard,
        redraw
    }
})();

const gameBoardData = (() => {

    const virtualObjInit = () => {
        return {
        click: null,
        symbol: null,
        setSquare: function(symbol) {
            this.symbol = symbol;
            },
        getSquare: function() {
            return this.symbol
        }
        }
    }

    const virtualBoard = Array.from( {length: 9}, virtualObjInit);

    console.log(virtualBoard);

    let exNotOh = true;

    return {
        virtualBoard,
        exNotOh
    }

})();

const btn = document.getElementById('addBtn');

btn.addEventListener('click', () => addBox());

function addBox() {
    playerController.playerSwitch();
    console.log(gameBoardData.virtualBoard)
}
