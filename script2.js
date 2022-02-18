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
        return {
            gbReference, htmlBoard
            }
    })();

    const redraw = () => {
        htmlBoard.forEach((ele, idx) => {
            if (gameBoardData.virtualBoard[idx].click === true) {
                ele.innerHTML = `<p1>${gameBoardData.virtualBoard[idx].symbol}</p1>`
                ele.removeEventListener('click', playerClickBoard[idx]);
            }
        })
    }
    
    let playerClick = (ele, idx) => {
        return playerController.playerClick.bind(ele, idx);
    };
    
    let playerClickBoard = htmlBoard.map((ele, idx) => {
        return playerClick(ele, idx);
    });

    htmlBoard.forEach((ele, idx) => {
        ele.addEventListener('click', playerClickBoard[idx]);
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
