import { Gameboard } from "./Model/Gameboard"
import { GameboardFactory } from "./Model/GameboardFactory"

function generateGameboard() {

    let gameboardFactory = new GameboardFactory(60, 7);
    let gameboard = gameboardFactory.generateGameboard();
    return gameboard.render();
}

let graphic = generateGameboard();
document.body.appendChild(graphic);