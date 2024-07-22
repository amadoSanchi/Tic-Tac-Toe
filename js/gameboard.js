
import { Gameplay } from "./gameplay.js";

export const Gameboard = (() => {

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