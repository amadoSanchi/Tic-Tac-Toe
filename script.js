// general.js

const General = (() => {
    const allEqual = (...values) => values.every(v => v === values[0]);
    const noEmptyBox = (...values) => values.every(v => v !== '-');
    const hasLineComplete = (...values) => allEqual(...values) && noEmptyBox(...values);
    return { allEqual, noEmptyBox, hasLineComplete }
})();

// player.js

const createPlayer = (({ name, symbol, wins = 0 }) => ({ name, symbol, wins }));

// gameboard.js"

const Gameboard = (() => {
    let gameboardArr = Array(3).fill().map(() => Array(3).fill('-'));
    let pos, pos1, pos2;

    const setPosition = (position) => {
        pos = position;
        pos1 = Math.floor(position / 3);
        pos2 = position % 3;
    };

    const emptyBox = () => gameboardArr[pos1][pos2] === '-';
    const change = (symbol) => gameboardArr[pos1].splice(pos2, 1, symbol);
    const reset = () => {
        gameboardArr = Array(3).fill().map(() => Array(3).fill('-'));
        Gameplay.resetRound();
    }

    const getGameboardArr = () => gameboardArr;

    return { setPosition, emptyBox, change, reset, getGameboardArr };
})();

// gameplay.js

const Gameplay = (() => {
    
    let round = 1;
    let player = null;
    let players = null;

    const init = (player1, player2) => {
        player = player1;
        players = [player1, player2];
    }

    const addRound = () => round++;
    const addPoint = () => player.wins++;
    const turnPlayer = () => player = round % 2 !== 0 ? players[0] : players[1];
    const resetRound = () => round = 1;

    const hasWin = () => {
        const gameboardArr = Gameboard.getGameboardArr();
        if (General.hasLineComplete(gameboardArr[0][0], gameboardArr[1][1], gameboardArr[2][2])) return true; // Win by from top left to bottom right
        if (General.hasLineComplete(gameboardArr[0][2], gameboardArr[1][1], gameboardArr[2][0])) return true; // Win by from top right to bottom left

        return gameboardArr.some((row, i) => {
            if (General.hasLineComplete(row[0], row[1], row[2])) return true; // Win by row
            if (General.hasLineComplete(gameboardArr[0][i], gameboardArr[1][i], gameboardArr[2][i])) return true; // Win by column
        });
    }

    const getPlayer = () => player;

    return { init, addRound, addPoint, turnPlayer, resetRound, hasWin, getPlayer };
})();

// displayController.js

const DisplayController = (() => {
    
    const changeLabel = (label) => document.querySelector('#main-label').textContent = label;
    const addPoint = (player) => document.querySelector(`#points-${player.name.replace(" ", "").toLowerCase()}`).textContent = player.wins;
    const turnPlayer = () => changeLabel(`${Gameplay.getPlayer().name}'s turn`);
    
    const displayGameboard = () => {
        document.querySelectorAll('#gameboard > div').forEach((box, i) => {
            const symbol = Gameboard.getGameboardArr()[Math.floor(i / 3)][i % 3];
            if (symbol === 'x') box.style.backgroundImage = "url('resources/seashell1.png')";
            if (symbol === 'o') box.style.backgroundImage = "url('resources/seashell2.png')";
        });
    };

    const reset = () => {
        document.querySelectorAll('#gameboard > *').forEach(box => box.style.removeProperty('background-image'));
        changeLabel("Player One's turn");
    }
    
    return { changeLabel, addPoint, turnPlayer, displayGameboard, reset }
})();

// gameController.js

const GameController = (e) => {
    Gameboard.setPosition(Number(e.target.getAttribute('data-id')));
    if (Gameboard.emptyBox() && !Gameplay.hasWin()) {
        Gameboard.change(Gameplay.getPlayer().symbol);
        DisplayController.displayGameboard();
        if (Gameplay.hasWin()) {
            Gameplay.addPoint();
            DisplayController.addPoint(Gameplay.getPlayer());
            DisplayController.changeLabel(`${Gameplay.getPlayer().name} has won!`);
        } else if (General.noEmptyBox(...Gameboard.getGameboardArr().flat())) {
            DisplayController.changeLabel('It was a tie!');
        } else {
            Gameplay.addRound();
            Gameplay.turnPlayer();
            DisplayController.turnPlayer();
        }
    }
};

// Initialization

const player1 = createPlayer({name: 'Player One', symbol: 'x', wins: 0});
const player2 = createPlayer({name: 'Player Two', symbol: 'o', wins: 0});
Gameplay.init(player1, player2);

const gameboardBoxes = document.querySelectorAll('#gameboard > *');
gameboardBoxes.forEach(box => box.addEventListener('click', GameController));

const resetBtn = document.querySelector('#reset');
resetBtn.addEventListener('click', () => {
    Gameboard.reset();
    DisplayController.reset();
});