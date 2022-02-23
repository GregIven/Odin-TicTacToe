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

    const calcWinner = (() => {
        const returnWinningSymbol = (boardVector) => {
            if (boardVector.length === 3) {
                return boardVector[0]
            }
        }

        const calcWinner = (board, combos) => {
            combos.forEach((ele) => {
                let boardCheck = [];
                let winningSymbol = null;
                for (const [k, v] of Object.entries(board)) {
                    if (ele.includes(Number(k))) {
                        if (v.click === true) {
                            boardCheck.push(v.symbol)
                        }
                    }
                }
                if (returnWinningSymbol(boardCheck)) {
                    return winningSymbol = returnWinningSymbol(boardCheck)
                }
            })    
        }
        const winCol = (boardObj) => {
            const indexes = [[0,1,2], [3,4,5], [6,7,8]];
            let winner = calcWinner(boardObj, indexes)
            return winner
        }

        const winRow = (boardObj) => {
            const indexes = [[0,3,6], [1,4,7], [2,5,8]];
        }

        const winDiag = (boardObj) => {
            const indexes = [[0,4,8], [2,4,6]];
        }

        return {
            winCol
        }
    })();

    const virtualBoard = Array.from( {length: 9}, virtualObjInit);


    let exNotOh = true;

    return {
        virtualBoard,
        exNotOh,
        calcWinner
    }

})();


const btn = document.getElementById('addBtn');

btn.addEventListener('click', () => addBox());

function addBox() {
    console.log(gameBoardData.calcWinner.winCol(gameBoardData.virtualBoard))
    gameBoardData.calcWinner.winCol(gameBoardData.virtualBoard)
}
