
import { Gameboard } from "./gameboard.js";
import { DisplayController } from "./displayController.js";
import { Gameplay } from "./gameplay";

export const GameController = (e) => {

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