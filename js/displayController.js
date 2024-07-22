
import { Gameplay } from './gameplay.js';
import { Gameboard } from './gameboard.js';

export const DisplayController = (() => {
    
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