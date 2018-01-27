import { ThreeDimensionCoordinate } from "../Common/ThreeDimensionCoordinate"
import { TwoDimensionCoordinate } from "../Common/TwoDimensionCoordinate";

export class GameboardTile {
    virtualCoordinates : ThreeDimensionCoordinate = new ThreeDimensionCoordinate();
    centerPoint: TwoDimensionCoordinate = new TwoDimensionCoordinate();
    points: TwoDimensionCoordinate[] = [];

    render() : SVGElement  {
        
        let group = document.createElementNS("http://www.w3.org/2000/svg", "g");
        let polygon = this.renderPolygon();
        let text = this.renderText();

        group.appendChild(polygon);
        group.appendChild(text);
    
        return group;
    }

    renderText() : SVGElement {

        let text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        
        text.setAttribute("x", this.centerPoint.x.toString());
        text.setAttribute("y", this.centerPoint.y.toString());
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("font-family", "Verdana");
        text.setAttribute("font-size", "12");  

        text.textContent = `[ ${this.virtualCoordinates.x},${this.virtualCoordinates.y},${this.virtualCoordinates.z} ]` 

        return text;
    }

    renderPolygon() : SVGElement {
        
        let polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        let points = this.points.map(point => point.x + "," + point.y).join(" ");
        
        polygon.setAttribute("points", points);
        polygon.setAttribute("fill", "lime");
        polygon.setAttribute("stroke-width", "1");
        polygon.setAttribute("stroke", "black");

        return polygon;
    }
}