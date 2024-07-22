
const general = (function createGeneral() {
    return {
        allEqual: function (...values) {
            return values.every(v => v === values[0]);
        },
        noEmptyBox: function (...values) {
            return values.every(v => v !== '-');
        },
        hasLineComplete: function (...values) {
            if (this.allEqual(...values) && this.noEmptyBox(...values)) {
                return true;
            }
            return false;
        }
    }
})();

function createPlayer({name, symbol, wins}) {
    return {
        name,
        symbol,
        wins
    }
}

const player1 = createPlayer({name: 'Player One', symbol: 'x', wins: 0});
const player2 = createPlayer({name: 'Player Two', symbol: 'o', wins: 0});

const gameboard = (function createGameboard({gameboardArr, pos, pos1, pos2}) {
    return {
        gameboardArr,
        pos,
        pos1,
        pos2,
        setPosition: function(pos) {
            this.pos = pos;
            this.pos1 = Math.floor(pos / 3);
            this.pos2 = pos % 3;
        },
        emptyBox: function() {
            return this.gameboardArr[this.pos1][this.pos2] === '-';            
        },
        change: function() {
            this.gameboardArr[this.pos1].splice(this.pos2, 1, gameplay.player.symbol);
        },
        reset: function() {
            this.gameboardArr = Array(3).fill().map(() => Array(3).fill('-'));

            gameplay.round = 1;
        }
    }
})({gameboardArr: Array(3).fill().map(() => Array(3).fill('-')), pos: null, pos1: null, pos2: null});

const gameplay = (function createGameplay({round, player}) {
    return {
        round,
        player,
        addRound: function() {
            this.round++;
        },
        addPoint: function() {
            if (this.player === player1) {
                ++player1.wins;
            } else {
                ++player2.wins;
            };
        },
        turnPlayer: function() {
            if (this.round % 2 !== 0) {
                this.player = player1;
            } else {
                this.player = player2;
            };
        },
        hasWin: function() {
            if (general.hasLineComplete(gameboard.gameboardArr[0][0], gameboard.gameboardArr[1][1], gameboard.gameboardArr[2][2])) return true; // Win by from top left to bottom right
            if (general.hasLineComplete(gameboard.gameboardArr[0][2], gameboard.gameboardArr[1][1], gameboard.gameboardArr[2][0])) return true; // Win by from top right to bottom left

            return gameboard.gameboardArr.some((el, i) => {
                if (general.hasLineComplete(el[0], el[1], el[2])) return true; // Win by row
                if (general.hasLineComplete(gameboard.gameboardArr[0][i], gameboard.gameboardArr[1][i], gameboard.gameboardArr[2][i])) return true; // Win by column
            });
        }
    }
})({round: 1, player: player1});

const displayController = (function createDisplayController() {
    return {
        changeLabel: function(label) {
            document.querySelector('#main-label').textContent = label;
        },
        addPoint: function() {
            if (gameplay.player === player1) {
                document.querySelector('#points-playerone').textContent = player1.wins;
            } else {
                document.querySelector('#points-playertwo').textContent = player2.wins;
            };
        },
        turnPlayer: function() {
            this.changeLabel(`${gameplay.player.name}'s turn`);
        },
        displayGameboard: function () {
            const gameboardBox = document.querySelector(`#gameboard > div:nth-of-type(${gameboard.pos + 1})`);

            if (gameplay.player === player1) {
                gameboardBox.style.backgroundImage = "url(resources/seashell1.png)";
            } else {
                gameboardBox.style.backgroundImage = "url(resources/seashell2.png)";
            }
        },
        reset: function() {
            document.querySelectorAll('#gameboard > *').forEach(box => {
                box.style.removeProperty('background-image');
            });

            this.changeLabel("Player One's turn");
        }
    }
})();

function gameController(e) {
    gameboard.setPosition(Number(e.target.getAttribute('data-id')));
    if (gameboard.emptyBox() && !gameplay.hasWin()) {
        gameboard.change();
        displayController.displayGameboard();
        if (gameplay.hasWin()) {
            gameplay.addPoint();
            displayController.addPoint();
            displayController.changeLabel(`${gameplay.player.name} has won!`);
        } else if (general.noEmptyBox(...gameboard.gameboardArr.flat())) {
            displayController.changeLabel('It was a tie!');
        } else {
            gameplay.addRound();
            gameplay.turnPlayer();
            displayController.turnPlayer();
        }
    }
};

const gameboardBoxes = document.querySelectorAll('#gameboard > *');
gameboardBoxes.forEach(box => box.addEventListener("click", (e) => gameController(e)));

const resetBtn = document.querySelector('#reset');
resetBtn.addEventListener("click", () => {
    gameboard.reset();
    displayController.reset();
});