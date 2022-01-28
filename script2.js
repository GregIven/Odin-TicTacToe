const _localFuncs = (() => {
    let numOfPlayers;
    const setPlayers = (() => {
        const numPlayersField = document.querySelector('#numPlayers');
        numPlayersField.addEventListener('change', (event) => {
            btn.addEventListener('click', () => gameBoard.manageTurns(event.target.value));
            // console.log('do')

        })
        numOfPlayers = numPlayersField.value;
    })();

    return { numOfPlayers, setPlayers }
})();

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
        htmlBoard.forEach((ele, idx) => {
            ele.addEventListener('click', playerController.playerClick.bind(ele, idx));
        })

        virtualBoard.fill({
            clicked: null
        });
    })();
    console.log(virtualBoard);

    const manageTurns = (numOfPlayers) => {
        //num of players is an array
        let _turn = 1;
        let _player = 1;

        _player = numOfPlayers[(_turn / numOfPlayers)]

        return _player
    }

    return {
        manageTurns
    }
})();

const btn = document.getElementById('addBtn')

// btn.addEventListener('click', () => addBox());

function addBox() {
    gameBoard.gbState.forEach((x) => console.log(x));
}