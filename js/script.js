
import { createPlayer } from "./player.js";
import { Gameplay } from "./gameplay.js";
import { Gameboard } from "./gameboard.mjs";
import { DisplayController } from "./displayController.mjs";

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