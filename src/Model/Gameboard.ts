import { GameboardTile } from "./GameboardTile"
import { TwoDimensionCoordinate } from "../Common/TwoDimensionCoordinate";

export class Gameboard {
    tiles: GameboardTile[] = [];
    width: number = 400;
    height: number = 400;


    render() : SVGElement {
        let element = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        element.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        element.setAttribute("height", this.width.toString());
        element.setAttribute("width", this.height.toString());

        for (let tile of this.tiles) {
            let tileElement = tile.render();
            element.appendChild(tileElement);
        }

        return element;
    }
}