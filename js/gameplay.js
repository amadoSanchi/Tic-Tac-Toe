
import { Gameboard } from "./gameboard.js";
import { General } from "./general.js";

export const Gameplay = (() => {
    
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