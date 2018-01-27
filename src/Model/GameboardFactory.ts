import { Gameboard } from "./Gameboard"
import { GameboardTile } from "./GameboardTile"
import { TwoDimensionCoordinate } from "../Common/TwoDimensionCoordinate";
import { ThreeDimensionCoordinate } from "../Common/ThreeDimensionCoordinate";

export class GameboardFactory {

    readonly invalidFaceLengthMessage: string = "facelength must be a positive integer";
    readonly invalidRadiusMessage: string = "radius must be an integer greater than zero";
    
    faceLength : number;
    radius: number;
    tileHalfHeight: number; 
    tileHeight: number;
    tileWidth: number;
    boardHeight: number; 
    boardWidth: number; 
    columnOffset: number;

    constructor(faceLength: number, radius: number) {

        if (faceLength < 0) throw this.invalidFaceLengthMessage;
        if (faceLength != parseInt(faceLength.toString(), 10)) throw this.invalidFaceLengthMessage;

        if (radius < 1) throw this.invalidRadiusMessage;
        if (radius != parseInt(radius.toString(), 10)) throw this.invalidRadiusMessage;

        this.faceLength = faceLength;
        this.radius = radius;
    }

    generateGameboard() : Gameboard {
        
        this.calculateTileDimensions();
        this.calculateBoardDimensions();
        
        let tiles = this.generateTiles();
        let gameboard = new Gameboard();

        gameboard.tiles = tiles;
        gameboard.height = this.boardHeight;
        gameboard.width = this.boardWidth;
    
        return gameboard;
    }

    protected calculateTileDimensions() {

        this.tileHalfHeight = Math.ceil(Math.sin(Math.PI / 3) * this.faceLength);
        this.tileHeight = 2 * this.tileHalfHeight; 
        this.tileWidth = 2 * this.faceLength;
        this.columnOffset = Math.ceil(1.5 * this.faceLength);  
    }

    protected calculateBoardDimensions() {

        this.boardHeight = (2 * this.radius * this.tileHeight) - this.tileHeight;
        this.boardWidth = this.boardHeight;  //calculate based on whether odd or even radisu
    }

    protected generateTiles() : GameboardTile[] {

        let tiles:  GameboardTile[] = [];
        let columnTileCount = 2*this.radius - 1;
        
        let topCenterTile = this.generateTopCenterTile();
        let centerColumn = this.generateColumn(topCenterTile, columnTileCount);
        
        let leftReferenceTile = topCenterTile;
        let rightReferenceTile = topCenterTile; 
        columnTileCount -= 1;

        while (columnTileCount >= this.radius) {

            leftReferenceTile = this.generateTileFromReference(
                leftReferenceTile,
                 { x: -1 * this.columnOffset, y: this.tileHalfHeight},
                 { x:  -1, y: 0, z: 1});

            tiles = tiles.concat(this.generateColumn(leftReferenceTile, columnTileCount));

            rightReferenceTile = this.generateTileFromReference(
                rightReferenceTile, 
                {x: this.columnOffset, y: this.tileHalfHeight},
                { x:  1, y: -1, z: 0});
            
            tiles = tiles.concat(this.generateColumn(rightReferenceTile, columnTileCount));

            columnTileCount -= 1;
        }

        tiles = tiles.concat(centerColumn); 
        return tiles;
    }

    protected generateColumn(topTile: GameboardTile, tileCount: number) : GameboardTile[] {

        let tiles: GameboardTile[] = [ topTile ];
        let referenceTile = topTile;

        for (let i = 1; i < tileCount; i++) {
            referenceTile = this.generateTileFromReference(
                referenceTile, 
                { x: 0, y: this.tileHeight},
                { x: 0, y: -1, z: 1});
            
            tiles.push(referenceTile);
        }

        return tiles;
    }

    protected generateTileFromReference(
        referenceTile: GameboardTile, 
        positionTranslation: TwoDimensionCoordinate, 
        coordinateTranslation: ThreeDimensionCoordinate ) : GameboardTile {

        let tile: GameboardTile = new GameboardTile();
        
        tile.virtualCoordinates = { 
            x: referenceTile.virtualCoordinates.x + coordinateTranslation.x, 
            y: referenceTile.virtualCoordinates.y + coordinateTranslation.y, 
            z: referenceTile.virtualCoordinates.z + coordinateTranslation.z};

        tile.centerPoint = { 
            x: referenceTile.centerPoint.x + positionTranslation.x, 
            y: referenceTile.centerPoint.y + positionTranslation.y};

        for (let point of referenceTile.points) {
            tile.points.push({
                x: point.x + positionTranslation.x,
                y: point.y + positionTranslation.y
            })
        }

        return tile;
    }

    protected generateTopCenterTile() : GameboardTile {

        let center: TwoDimensionCoordinate = { x: Math.round(this.boardWidth / 2), y: this.tileHalfHeight };
        
        let northEast: TwoDimensionCoordinate = { x: (center.x + Math.round(this.faceLength /2)) , y: 0  };
        let northWest: TwoDimensionCoordinate = { x: (northEast.x - this.faceLength) , y: 0  };
        
        let east: TwoDimensionCoordinate = { x: (center.x + this.faceLength) , y: center.y  };
        let west: TwoDimensionCoordinate = { x: (center.x - this.faceLength) , y: center.y  };
        
        let southEast: TwoDimensionCoordinate = { x: northEast.x , y: this.tileHeight };
        let southWest: TwoDimensionCoordinate = { x: northWest.x, y: this.tileHeight  };

        let topCenterTile = new GameboardTile();
        topCenterTile.virtualCoordinates = { x: 0, y: 0, z: 0};
        topCenterTile.centerPoint = center;
        topCenterTile.points = [
            northEast,
            east,
            southEast,
            southWest,
            west,
            northWest,
        ];

        return topCenterTile;
    }
}