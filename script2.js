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
    //the square is passed in as an index in a virtual array
    const playerClick = (square) => {
        gameBoardData.virtualBoard[square].click = true;
        gameBoardData.virtualBoard[square].setSquare(playerSwitch());
        displayController.redraw();
    }

    return { 
        playerClick,
        playerSwitch
    }

})();

const displayController = (() => {
    const gbReference = document.querySelector('#gbContainer');
    
    let htmlBoard;

    let endGame = false;

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

                if (
                gameBoardData.calcWinner.winCol(gameBoardData.virtualBoard) ||
                gameBoardData.calcWinner.winRow(gameBoardData.virtualBoard) ||
                gameBoardData.calcWinner.winDiag(gameBoardData.virtualBoard)
                ) {
                    htmlBoard.forEach((ele, idx) => {
                        ele.removeEventListener('click', playerClickBoard[idx]);
                    }) 
                }

            }
        })
    }
    
    //returns bound function to apply, each instance of playerClick returns the ele(tile) and its index specific to each instance
    let playerClick = (ele, idx) => {
        return playerController.playerClick.bind(ele, idx);
    };

    //need to map each bound player click to a map tile. Each one should be a unique function instead of copy.
    //Before I was using Array.of to bind the same function to each tile on the board
    let playerClickBoard = htmlBoard.map((ele, idx) => {
        return playerClick(ele, idx);
    });

    //add event listeners to each tile, calls the player click that is mapped to each tile with the index passed in
    htmlBoard.forEach((ele, idx) => {
        ele.addEventListener('click', playerClickBoard[idx]);
    });

    let removeListener = () => {

    }

    return {
        htmlBoard,
        drawBoard,
        redraw,
        endGame
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
            if (boardVector.length === 3 && 
                boardVector[0] === boardVector[1] &&
                boardVector[1] === boardVector[2]) {
                return boardVector[0]
            }
        }

        const _calcWinner = (board, combos) => {
            let winningSymbol = null;
            combos.forEach((ele) => {
                let boardCheck = [];
                for (const [k, v] of Object.entries(board)) {
                    if (ele.includes(Number(k))) {
                        if (v.click === true) {
                            boardCheck.push(v.symbol)
                        }
                    }
                }
                if (returnWinningSymbol(boardCheck)) {
                    winningSymbol = returnWinningSymbol(boardCheck)
                }
            })
            return winningSymbol
        }
        const winCol = (boardObj) => {
            const indexes = [[0,1,2], [3,4,5], [6,7,8]];
            let winner = _calcWinner(boardObj, indexes)
            return winner
        }

        const winRow = (boardObj) => {
            const indexes = [[0,3,6], [1,4,7], [2,5,8]];
            let winner = _calcWinner(boardObj, indexes)
            return winner
        }

        const winDiag = (boardObj) => {
            const indexes = [[0,4,8], [2,4,6]];
            let winner = _calcWinner(boardObj, indexes)
            return winner
        }

        return {
            winCol,
            winRow,
            winDiag
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

console.log(null)

const btn = document.getElementById('addBtn');

btn.addEventListener('click', () => addBox());

function addBox() {
    // console.log(gameBoardData.calcWinner.winCol(gameBoardData.virtualBoard))
    gameBoardData.calcWinner.winCol(gameBoardData.virtualBoard)
    // console.log(gameBoardData.calcWinner.winRow(gameBoardData.virtualBoard))
    gameBoardData.calcWinner.winRow(gameBoardData.virtualBoard)
    // console.log(gameBoardData.calcWinner.winDiag(gameBoardData.virtualBoard))
    gameBoardData.calcWinner.winDiag(gameBoardData.virtualBoard)
}
