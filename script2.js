const playerController = (() => {
    const playerSwitch = () => {
        let _boolean = gameBoardData.exNotOh;
        _boolean = !_boolean;

        if(_boolean) {
            return 'X';
        } else {
            return 'O';
        }
        
    }

    const playerClick = (square) => {
        gameBoardData.virtualBoard[square].clicked = true;
        virtualBoard.setSquare(playerSwitch());
        console.log(gameBoardData.virtualBoard[square])    
    }

    return { 
        playerClick
    }

})();

const displayController = (() => {
    const gbReference = document.querySelector('#gbContainer');
    //TODO find a way to make gbReference copy to mutate instead of the original. When
    //TODO clicking drawBoard() it appends to the original gbReference.
    const drawBoard = () => {
        const makeCell = () => {
            const boardSquareChild = document.createElement('div');
            boardSquareChild.className = "board-square";
            return boardSquareChild;
          }
          const cells = Array(9).fill(0).map(makeCell);
          gbReference.append(...cells);
    }

    const htmlBoard = Array.from(gbReference.children);

    htmlBoard.forEach((ele, idx) => {
        ele.addEventListener('click', playerController.playerClick.bind(ele, idx));
    });

    return {
        htmlBoard,
        drawBoard
    }
})();

const gameBoardData = (() => {
    //TODO find out how setSquare can be used by playController to set result of 
    //TODO playerSwitch(), also test playerSwitch() to get it to return either 'X' or 'O'
    const virtualBoard = new Array(9).fill({}).map((ele) => {
            const clicked = null;
            const setSquare = function(symbol) {
                this.clicked = symbol;
            }
            return { clicked: clicked }
        });

    let exNotOh = true;

    return {
        virtualBoard,
        exNotOh
    }

})();

displayController.drawBoard();

console.log(gameBoardData.virtualBoard);

const btn = document.getElementById('addBtn');

btn.addEventListener('click', () => addBox());

function addBox() {
    console.log(gameBoardData.exNotOh);
}