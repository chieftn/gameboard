/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Common/ThreeDimensionCoordinate.ts":
/*!************************************************!*\
  !*** ./src/Common/ThreeDimensionCoordinate.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ThreeDimensionCoordinate": () => (/* binding */ ThreeDimensionCoordinate)
/* harmony export */ });
var ThreeDimensionCoordinate = /** @class */ (function () {
    function ThreeDimensionCoordinate() {
    }
    return ThreeDimensionCoordinate;
}());



/***/ }),

/***/ "./src/Common/TwoDimensionCoordinate.ts":
/*!**********************************************!*\
  !*** ./src/Common/TwoDimensionCoordinate.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TwoDimensionCoordinate": () => (/* binding */ TwoDimensionCoordinate)
/* harmony export */ });
var TwoDimensionCoordinate = /** @class */ (function () {
    function TwoDimensionCoordinate() {
    }
    return TwoDimensionCoordinate;
}());



/***/ }),

/***/ "./src/Model/Gameboard.ts":
/*!********************************!*\
  !*** ./src/Model/Gameboard.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Gameboard": () => (/* binding */ Gameboard)
/* harmony export */ });
var Gameboard = /** @class */ (function () {
    function Gameboard() {
        this.tiles = [];
        this.width = 400;
        this.height = 400;
    }
    Gameboard.prototype.render = function () {
        var element = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        element.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        element.setAttribute("height", this.width.toString());
        element.setAttribute("width", this.height.toString());
        for (var _i = 0, _a = this.tiles; _i < _a.length; _i++) {
            var tile = _a[_i];
            var tileElement = tile.render();
            element.appendChild(tileElement);
        }
        return element;
    };
    return Gameboard;
}());



/***/ }),

/***/ "./src/Model/GameboardFactory.ts":
/*!***************************************!*\
  !*** ./src/Model/GameboardFactory.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GameboardFactory": () => (/* binding */ GameboardFactory)
/* harmony export */ });
/* harmony import */ var _Gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Gameboard */ "./src/Model/Gameboard.ts");
/* harmony import */ var _GameboardTile__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GameboardTile */ "./src/Model/GameboardTile.ts");


var GameboardFactory = /** @class */ (function () {
    function GameboardFactory(faceLength, radius) {
        this.invalidFaceLengthMessage = "facelength must be a positive integer";
        this.invalidRadiusMessage = "radius must be an integer greater than zero";
        if (faceLength < 0)
            throw this.invalidFaceLengthMessage;
        if (faceLength != parseInt(faceLength.toString(), 10))
            throw this.invalidFaceLengthMessage;
        if (radius < 1)
            throw this.invalidRadiusMessage;
        if (radius != parseInt(radius.toString(), 10))
            throw this.invalidRadiusMessage;
        this.faceLength = faceLength;
        this.radius = radius;
    }
    GameboardFactory.prototype.generateGameboard = function () {
        this.calculateTileDimensions();
        this.calculateBoardDimensions();
        var tiles = this.generateTiles();
        var gameboard = new _Gameboard__WEBPACK_IMPORTED_MODULE_0__.Gameboard();
        gameboard.tiles = tiles;
        gameboard.height = this.boardHeight;
        gameboard.width = this.boardWidth;
        return gameboard;
    };
    GameboardFactory.prototype.calculateTileDimensions = function () {
        this.tileHalfHeight = Math.ceil(Math.sin(Math.PI / 3) * this.faceLength);
        this.tileHeight = 2 * this.tileHalfHeight;
        this.tileWidth = 2 * this.faceLength;
        this.columnOffset = Math.ceil(1.5 * this.faceLength);
    };
    GameboardFactory.prototype.calculateBoardDimensions = function () {
        this.boardHeight = (2 * this.radius * this.tileHeight) - this.tileHeight;
        this.boardWidth = this.boardHeight; //calculate based on whether odd or even radisu
    };
    GameboardFactory.prototype.generateTiles = function () {
        var tiles = [];
        var columnTileCount = 2 * this.radius - 1;
        var topCenterTile = this.generateTopCenterTile();
        var centerColumn = this.generateColumn(topCenterTile, columnTileCount);
        var leftReferenceTile = topCenterTile;
        var rightReferenceTile = topCenterTile;
        columnTileCount -= 1;
        while (columnTileCount >= this.radius) {
            leftReferenceTile = this.generateTileFromReference(leftReferenceTile, { x: -1 * this.columnOffset, y: this.tileHalfHeight }, { x: -1, y: 0, z: 1 });
            tiles = tiles.concat(this.generateColumn(leftReferenceTile, columnTileCount));
            rightReferenceTile = this.generateTileFromReference(rightReferenceTile, { x: this.columnOffset, y: this.tileHalfHeight }, { x: 1, y: -1, z: 0 });
            tiles = tiles.concat(this.generateColumn(rightReferenceTile, columnTileCount));
            columnTileCount -= 1;
        }
        tiles = tiles.concat(centerColumn);
        return tiles;
    };
    GameboardFactory.prototype.generateColumn = function (topTile, tileCount) {
        var tiles = [topTile];
        var referenceTile = topTile;
        for (var i = 1; i < tileCount; i++) {
            referenceTile = this.generateTileFromReference(referenceTile, { x: 0, y: this.tileHeight }, { x: 0, y: -1, z: 1 });
            tiles.push(referenceTile);
        }
        return tiles;
    };
    GameboardFactory.prototype.generateTileFromReference = function (referenceTile, positionTranslation, coordinateTranslation) {
        var tile = new _GameboardTile__WEBPACK_IMPORTED_MODULE_1__.GameboardTile();
        tile.virtualCoordinates = {
            x: referenceTile.virtualCoordinates.x + coordinateTranslation.x,
            y: referenceTile.virtualCoordinates.y + coordinateTranslation.y,
            z: referenceTile.virtualCoordinates.z + coordinateTranslation.z
        };
        tile.centerPoint = {
            x: referenceTile.centerPoint.x + positionTranslation.x,
            y: referenceTile.centerPoint.y + positionTranslation.y
        };
        for (var _i = 0, _a = referenceTile.points; _i < _a.length; _i++) {
            var point = _a[_i];
            tile.points.push({
                x: point.x + positionTranslation.x,
                y: point.y + positionTranslation.y
            });
        }
        return tile;
    };
    GameboardFactory.prototype.generateTopCenterTile = function () {
        var center = { x: Math.round(this.boardWidth / 2), y: this.tileHalfHeight };
        var northEast = { x: (center.x + Math.round(this.faceLength / 2)), y: 0 };
        var northWest = { x: (northEast.x - this.faceLength), y: 0 };
        var east = { x: (center.x + this.faceLength), y: center.y };
        var west = { x: (center.x - this.faceLength), y: center.y };
        var southEast = { x: northEast.x, y: this.tileHeight };
        var southWest = { x: northWest.x, y: this.tileHeight };
        var topCenterTile = new _GameboardTile__WEBPACK_IMPORTED_MODULE_1__.GameboardTile();
        topCenterTile.virtualCoordinates = { x: 0, y: 0, z: 0 };
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
    };
    return GameboardFactory;
}());



/***/ }),

/***/ "./src/Model/GameboardTile.ts":
/*!************************************!*\
  !*** ./src/Model/GameboardTile.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GameboardTile": () => (/* binding */ GameboardTile)
/* harmony export */ });
/* harmony import */ var _Common_ThreeDimensionCoordinate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Common/ThreeDimensionCoordinate */ "./src/Common/ThreeDimensionCoordinate.ts");
/* harmony import */ var _Common_TwoDimensionCoordinate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Common/TwoDimensionCoordinate */ "./src/Common/TwoDimensionCoordinate.ts");


var GameboardTile = /** @class */ (function () {
    function GameboardTile() {
        this.virtualCoordinates = new _Common_ThreeDimensionCoordinate__WEBPACK_IMPORTED_MODULE_0__.ThreeDimensionCoordinate();
        this.centerPoint = new _Common_TwoDimensionCoordinate__WEBPACK_IMPORTED_MODULE_1__.TwoDimensionCoordinate();
        this.points = [];
    }
    GameboardTile.prototype.render = function () {
        var group = document.createElementNS("http://www.w3.org/2000/svg", "g");
        var polygon = this.renderPolygon();
        var text = this.renderText();
        group.appendChild(polygon);
        group.appendChild(text);
        return group;
    };
    GameboardTile.prototype.renderText = function () {
        var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", this.centerPoint.x.toString());
        text.setAttribute("y", this.centerPoint.y.toString());
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("font-family", "Verdana");
        text.setAttribute("font-size", "12");
        text.textContent = "[ ".concat(this.virtualCoordinates.x, ",").concat(this.virtualCoordinates.y, ",").concat(this.virtualCoordinates.z, " ]");
        return text;
    };
    GameboardTile.prototype.renderPolygon = function () {
        var polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        var points = this.points.map(function (point) { return point.x + "," + point.y; }).join(" ");
        polygon.setAttribute("points", points);
        polygon.setAttribute("fill", "lime");
        polygon.setAttribute("stroke-width", "1");
        polygon.setAttribute("stroke", "black");
        return polygon;
    };
    return GameboardTile;
}());



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Model_GameboardFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Model/GameboardFactory */ "./src/Model/GameboardFactory.ts");

function generateGameboard() {
    var gameboardFactory = new _Model_GameboardFactory__WEBPACK_IMPORTED_MODULE_0__.GameboardFactory(60, 7);
    var gameboard = gameboardFactory.generateGameboard();
    return gameboard.render();
}
var graphic = generateGameboard();
document.body.appendChild(graphic);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ21DOzs7Ozs7Ozs7Ozs7Ozs7QUNMcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ2lDOzs7Ozs7Ozs7Ozs7Ozs7QUNMbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQyxnQkFBZ0I7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ29COzs7Ozs7Ozs7Ozs7Ozs7OztBQ3BCbUI7QUFDUTtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixpREFBUztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUE0QztBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9GQUFvRixtREFBbUQsSUFBSSxtQkFBbUI7QUFDOUo7QUFDQSxzRkFBc0YsOENBQThDLElBQUksbUJBQW1CO0FBQzNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixlQUFlO0FBQ3ZDLDRFQUE0RSwwQkFBMEIsSUFBSSxtQkFBbUI7QUFDN0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1Qix5REFBYTtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvREFBb0QsZ0JBQWdCO0FBQ3BFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCLDBCQUEwQjtBQUMxQiwwQkFBMEI7QUFDMUIscUJBQXFCO0FBQ3JCLHFCQUFxQjtBQUNyQiwwQkFBMEI7QUFDMUIsMEJBQTBCO0FBQzFCLGdDQUFnQyx5REFBYTtBQUM3Qyw2Q0FBNkM7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUMyQjs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzR2tEO0FBQ0o7QUFDMUU7QUFDQTtBQUNBLHNDQUFzQyxzRkFBd0I7QUFDOUQsK0JBQStCLGtGQUFzQjtBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdEQUF3RCxpQ0FBaUM7QUFDekY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ3dCOzs7Ozs7O1VDckN6QjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTjREO0FBQzVEO0FBQ0EsK0JBQStCLHFFQUFnQjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZ2FtZWJvYXJkLy4vc3JjL0NvbW1vbi9UaHJlZURpbWVuc2lvbkNvb3JkaW5hdGUudHMiLCJ3ZWJwYWNrOi8vZ2FtZWJvYXJkLy4vc3JjL0NvbW1vbi9Ud29EaW1lbnNpb25Db29yZGluYXRlLnRzIiwid2VicGFjazovL2dhbWVib2FyZC8uL3NyYy9Nb2RlbC9HYW1lYm9hcmQudHMiLCJ3ZWJwYWNrOi8vZ2FtZWJvYXJkLy4vc3JjL01vZGVsL0dhbWVib2FyZEZhY3RvcnkudHMiLCJ3ZWJwYWNrOi8vZ2FtZWJvYXJkLy4vc3JjL01vZGVsL0dhbWVib2FyZFRpbGUudHMiLCJ3ZWJwYWNrOi8vZ2FtZWJvYXJkL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2dhbWVib2FyZC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vZ2FtZWJvYXJkL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vZ2FtZWJvYXJkL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vZ2FtZWJvYXJkLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBUaHJlZURpbWVuc2lvbkNvb3JkaW5hdGUgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gVGhyZWVEaW1lbnNpb25Db29yZGluYXRlKCkge1xuICAgIH1cbiAgICByZXR1cm4gVGhyZWVEaW1lbnNpb25Db29yZGluYXRlO1xufSgpKTtcbmV4cG9ydCB7IFRocmVlRGltZW5zaW9uQ29vcmRpbmF0ZSB9O1xuIiwidmFyIFR3b0RpbWVuc2lvbkNvb3JkaW5hdGUgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gVHdvRGltZW5zaW9uQ29vcmRpbmF0ZSgpIHtcbiAgICB9XG4gICAgcmV0dXJuIFR3b0RpbWVuc2lvbkNvb3JkaW5hdGU7XG59KCkpO1xuZXhwb3J0IHsgVHdvRGltZW5zaW9uQ29vcmRpbmF0ZSB9O1xuIiwidmFyIEdhbWVib2FyZCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBHYW1lYm9hcmQoKSB7XG4gICAgICAgIHRoaXMudGlsZXMgPSBbXTtcbiAgICAgICAgdGhpcy53aWR0aCA9IDQwMDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSA0MDA7XG4gICAgfVxuICAgIEdhbWVib2FyZC5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIFwic3ZnXCIpO1xuICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShcInhtbG5zXCIsIFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIik7XG4gICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKFwiaGVpZ2h0XCIsIHRoaXMud2lkdGgudG9TdHJpbmcoKSk7XG4gICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKFwid2lkdGhcIiwgdGhpcy5oZWlnaHQudG9TdHJpbmcoKSk7XG4gICAgICAgIGZvciAodmFyIF9pID0gMCwgX2EgPSB0aGlzLnRpbGVzOyBfaSA8IF9hLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgdmFyIHRpbGUgPSBfYVtfaV07XG4gICAgICAgICAgICB2YXIgdGlsZUVsZW1lbnQgPSB0aWxlLnJlbmRlcigpO1xuICAgICAgICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZCh0aWxlRWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgfTtcbiAgICByZXR1cm4gR2FtZWJvYXJkO1xufSgpKTtcbmV4cG9ydCB7IEdhbWVib2FyZCB9O1xuIiwiaW1wb3J0IHsgR2FtZWJvYXJkIH0gZnJvbSBcIi4vR2FtZWJvYXJkXCI7XG5pbXBvcnQgeyBHYW1lYm9hcmRUaWxlIH0gZnJvbSBcIi4vR2FtZWJvYXJkVGlsZVwiO1xudmFyIEdhbWVib2FyZEZhY3RvcnkgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gR2FtZWJvYXJkRmFjdG9yeShmYWNlTGVuZ3RoLCByYWRpdXMpIHtcbiAgICAgICAgdGhpcy5pbnZhbGlkRmFjZUxlbmd0aE1lc3NhZ2UgPSBcImZhY2VsZW5ndGggbXVzdCBiZSBhIHBvc2l0aXZlIGludGVnZXJcIjtcbiAgICAgICAgdGhpcy5pbnZhbGlkUmFkaXVzTWVzc2FnZSA9IFwicmFkaXVzIG11c3QgYmUgYW4gaW50ZWdlciBncmVhdGVyIHRoYW4gemVyb1wiO1xuICAgICAgICBpZiAoZmFjZUxlbmd0aCA8IDApXG4gICAgICAgICAgICB0aHJvdyB0aGlzLmludmFsaWRGYWNlTGVuZ3RoTWVzc2FnZTtcbiAgICAgICAgaWYgKGZhY2VMZW5ndGggIT0gcGFyc2VJbnQoZmFjZUxlbmd0aC50b1N0cmluZygpLCAxMCkpXG4gICAgICAgICAgICB0aHJvdyB0aGlzLmludmFsaWRGYWNlTGVuZ3RoTWVzc2FnZTtcbiAgICAgICAgaWYgKHJhZGl1cyA8IDEpXG4gICAgICAgICAgICB0aHJvdyB0aGlzLmludmFsaWRSYWRpdXNNZXNzYWdlO1xuICAgICAgICBpZiAocmFkaXVzICE9IHBhcnNlSW50KHJhZGl1cy50b1N0cmluZygpLCAxMCkpXG4gICAgICAgICAgICB0aHJvdyB0aGlzLmludmFsaWRSYWRpdXNNZXNzYWdlO1xuICAgICAgICB0aGlzLmZhY2VMZW5ndGggPSBmYWNlTGVuZ3RoO1xuICAgICAgICB0aGlzLnJhZGl1cyA9IHJhZGl1cztcbiAgICB9XG4gICAgR2FtZWJvYXJkRmFjdG9yeS5wcm90b3R5cGUuZ2VuZXJhdGVHYW1lYm9hcmQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuY2FsY3VsYXRlVGlsZURpbWVuc2lvbnMoKTtcbiAgICAgICAgdGhpcy5jYWxjdWxhdGVCb2FyZERpbWVuc2lvbnMoKTtcbiAgICAgICAgdmFyIHRpbGVzID0gdGhpcy5nZW5lcmF0ZVRpbGVzKCk7XG4gICAgICAgIHZhciBnYW1lYm9hcmQgPSBuZXcgR2FtZWJvYXJkKCk7XG4gICAgICAgIGdhbWVib2FyZC50aWxlcyA9IHRpbGVzO1xuICAgICAgICBnYW1lYm9hcmQuaGVpZ2h0ID0gdGhpcy5ib2FyZEhlaWdodDtcbiAgICAgICAgZ2FtZWJvYXJkLndpZHRoID0gdGhpcy5ib2FyZFdpZHRoO1xuICAgICAgICByZXR1cm4gZ2FtZWJvYXJkO1xuICAgIH07XG4gICAgR2FtZWJvYXJkRmFjdG9yeS5wcm90b3R5cGUuY2FsY3VsYXRlVGlsZURpbWVuc2lvbnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMudGlsZUhhbGZIZWlnaHQgPSBNYXRoLmNlaWwoTWF0aC5zaW4oTWF0aC5QSSAvIDMpICogdGhpcy5mYWNlTGVuZ3RoKTtcbiAgICAgICAgdGhpcy50aWxlSGVpZ2h0ID0gMiAqIHRoaXMudGlsZUhhbGZIZWlnaHQ7XG4gICAgICAgIHRoaXMudGlsZVdpZHRoID0gMiAqIHRoaXMuZmFjZUxlbmd0aDtcbiAgICAgICAgdGhpcy5jb2x1bW5PZmZzZXQgPSBNYXRoLmNlaWwoMS41ICogdGhpcy5mYWNlTGVuZ3RoKTtcbiAgICB9O1xuICAgIEdhbWVib2FyZEZhY3RvcnkucHJvdG90eXBlLmNhbGN1bGF0ZUJvYXJkRGltZW5zaW9ucyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5ib2FyZEhlaWdodCA9ICgyICogdGhpcy5yYWRpdXMgKiB0aGlzLnRpbGVIZWlnaHQpIC0gdGhpcy50aWxlSGVpZ2h0O1xuICAgICAgICB0aGlzLmJvYXJkV2lkdGggPSB0aGlzLmJvYXJkSGVpZ2h0OyAvL2NhbGN1bGF0ZSBiYXNlZCBvbiB3aGV0aGVyIG9kZCBvciBldmVuIHJhZGlzdVxuICAgIH07XG4gICAgR2FtZWJvYXJkRmFjdG9yeS5wcm90b3R5cGUuZ2VuZXJhdGVUaWxlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHRpbGVzID0gW107XG4gICAgICAgIHZhciBjb2x1bW5UaWxlQ291bnQgPSAyICogdGhpcy5yYWRpdXMgLSAxO1xuICAgICAgICB2YXIgdG9wQ2VudGVyVGlsZSA9IHRoaXMuZ2VuZXJhdGVUb3BDZW50ZXJUaWxlKCk7XG4gICAgICAgIHZhciBjZW50ZXJDb2x1bW4gPSB0aGlzLmdlbmVyYXRlQ29sdW1uKHRvcENlbnRlclRpbGUsIGNvbHVtblRpbGVDb3VudCk7XG4gICAgICAgIHZhciBsZWZ0UmVmZXJlbmNlVGlsZSA9IHRvcENlbnRlclRpbGU7XG4gICAgICAgIHZhciByaWdodFJlZmVyZW5jZVRpbGUgPSB0b3BDZW50ZXJUaWxlO1xuICAgICAgICBjb2x1bW5UaWxlQ291bnQgLT0gMTtcbiAgICAgICAgd2hpbGUgKGNvbHVtblRpbGVDb3VudCA+PSB0aGlzLnJhZGl1cykge1xuICAgICAgICAgICAgbGVmdFJlZmVyZW5jZVRpbGUgPSB0aGlzLmdlbmVyYXRlVGlsZUZyb21SZWZlcmVuY2UobGVmdFJlZmVyZW5jZVRpbGUsIHsgeDogLTEgKiB0aGlzLmNvbHVtbk9mZnNldCwgeTogdGhpcy50aWxlSGFsZkhlaWdodCB9LCB7IHg6IC0xLCB5OiAwLCB6OiAxIH0pO1xuICAgICAgICAgICAgdGlsZXMgPSB0aWxlcy5jb25jYXQodGhpcy5nZW5lcmF0ZUNvbHVtbihsZWZ0UmVmZXJlbmNlVGlsZSwgY29sdW1uVGlsZUNvdW50KSk7XG4gICAgICAgICAgICByaWdodFJlZmVyZW5jZVRpbGUgPSB0aGlzLmdlbmVyYXRlVGlsZUZyb21SZWZlcmVuY2UocmlnaHRSZWZlcmVuY2VUaWxlLCB7IHg6IHRoaXMuY29sdW1uT2Zmc2V0LCB5OiB0aGlzLnRpbGVIYWxmSGVpZ2h0IH0sIHsgeDogMSwgeTogLTEsIHo6IDAgfSk7XG4gICAgICAgICAgICB0aWxlcyA9IHRpbGVzLmNvbmNhdCh0aGlzLmdlbmVyYXRlQ29sdW1uKHJpZ2h0UmVmZXJlbmNlVGlsZSwgY29sdW1uVGlsZUNvdW50KSk7XG4gICAgICAgICAgICBjb2x1bW5UaWxlQ291bnQgLT0gMTtcbiAgICAgICAgfVxuICAgICAgICB0aWxlcyA9IHRpbGVzLmNvbmNhdChjZW50ZXJDb2x1bW4pO1xuICAgICAgICByZXR1cm4gdGlsZXM7XG4gICAgfTtcbiAgICBHYW1lYm9hcmRGYWN0b3J5LnByb3RvdHlwZS5nZW5lcmF0ZUNvbHVtbiA9IGZ1bmN0aW9uICh0b3BUaWxlLCB0aWxlQ291bnQpIHtcbiAgICAgICAgdmFyIHRpbGVzID0gW3RvcFRpbGVdO1xuICAgICAgICB2YXIgcmVmZXJlbmNlVGlsZSA9IHRvcFRpbGU7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgdGlsZUNvdW50OyBpKyspIHtcbiAgICAgICAgICAgIHJlZmVyZW5jZVRpbGUgPSB0aGlzLmdlbmVyYXRlVGlsZUZyb21SZWZlcmVuY2UocmVmZXJlbmNlVGlsZSwgeyB4OiAwLCB5OiB0aGlzLnRpbGVIZWlnaHQgfSwgeyB4OiAwLCB5OiAtMSwgejogMSB9KTtcbiAgICAgICAgICAgIHRpbGVzLnB1c2gocmVmZXJlbmNlVGlsZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRpbGVzO1xuICAgIH07XG4gICAgR2FtZWJvYXJkRmFjdG9yeS5wcm90b3R5cGUuZ2VuZXJhdGVUaWxlRnJvbVJlZmVyZW5jZSA9IGZ1bmN0aW9uIChyZWZlcmVuY2VUaWxlLCBwb3NpdGlvblRyYW5zbGF0aW9uLCBjb29yZGluYXRlVHJhbnNsYXRpb24pIHtcbiAgICAgICAgdmFyIHRpbGUgPSBuZXcgR2FtZWJvYXJkVGlsZSgpO1xuICAgICAgICB0aWxlLnZpcnR1YWxDb29yZGluYXRlcyA9IHtcbiAgICAgICAgICAgIHg6IHJlZmVyZW5jZVRpbGUudmlydHVhbENvb3JkaW5hdGVzLnggKyBjb29yZGluYXRlVHJhbnNsYXRpb24ueCxcbiAgICAgICAgICAgIHk6IHJlZmVyZW5jZVRpbGUudmlydHVhbENvb3JkaW5hdGVzLnkgKyBjb29yZGluYXRlVHJhbnNsYXRpb24ueSxcbiAgICAgICAgICAgIHo6IHJlZmVyZW5jZVRpbGUudmlydHVhbENvb3JkaW5hdGVzLnogKyBjb29yZGluYXRlVHJhbnNsYXRpb24uelxuICAgICAgICB9O1xuICAgICAgICB0aWxlLmNlbnRlclBvaW50ID0ge1xuICAgICAgICAgICAgeDogcmVmZXJlbmNlVGlsZS5jZW50ZXJQb2ludC54ICsgcG9zaXRpb25UcmFuc2xhdGlvbi54LFxuICAgICAgICAgICAgeTogcmVmZXJlbmNlVGlsZS5jZW50ZXJQb2ludC55ICsgcG9zaXRpb25UcmFuc2xhdGlvbi55XG4gICAgICAgIH07XG4gICAgICAgIGZvciAodmFyIF9pID0gMCwgX2EgPSByZWZlcmVuY2VUaWxlLnBvaW50czsgX2kgPCBfYS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIHZhciBwb2ludCA9IF9hW19pXTtcbiAgICAgICAgICAgIHRpbGUucG9pbnRzLnB1c2goe1xuICAgICAgICAgICAgICAgIHg6IHBvaW50LnggKyBwb3NpdGlvblRyYW5zbGF0aW9uLngsXG4gICAgICAgICAgICAgICAgeTogcG9pbnQueSArIHBvc2l0aW9uVHJhbnNsYXRpb24ueVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRpbGU7XG4gICAgfTtcbiAgICBHYW1lYm9hcmRGYWN0b3J5LnByb3RvdHlwZS5nZW5lcmF0ZVRvcENlbnRlclRpbGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBjZW50ZXIgPSB7IHg6IE1hdGgucm91bmQodGhpcy5ib2FyZFdpZHRoIC8gMiksIHk6IHRoaXMudGlsZUhhbGZIZWlnaHQgfTtcbiAgICAgICAgdmFyIG5vcnRoRWFzdCA9IHsgeDogKGNlbnRlci54ICsgTWF0aC5yb3VuZCh0aGlzLmZhY2VMZW5ndGggLyAyKSksIHk6IDAgfTtcbiAgICAgICAgdmFyIG5vcnRoV2VzdCA9IHsgeDogKG5vcnRoRWFzdC54IC0gdGhpcy5mYWNlTGVuZ3RoKSwgeTogMCB9O1xuICAgICAgICB2YXIgZWFzdCA9IHsgeDogKGNlbnRlci54ICsgdGhpcy5mYWNlTGVuZ3RoKSwgeTogY2VudGVyLnkgfTtcbiAgICAgICAgdmFyIHdlc3QgPSB7IHg6IChjZW50ZXIueCAtIHRoaXMuZmFjZUxlbmd0aCksIHk6IGNlbnRlci55IH07XG4gICAgICAgIHZhciBzb3V0aEVhc3QgPSB7IHg6IG5vcnRoRWFzdC54LCB5OiB0aGlzLnRpbGVIZWlnaHQgfTtcbiAgICAgICAgdmFyIHNvdXRoV2VzdCA9IHsgeDogbm9ydGhXZXN0LngsIHk6IHRoaXMudGlsZUhlaWdodCB9O1xuICAgICAgICB2YXIgdG9wQ2VudGVyVGlsZSA9IG5ldyBHYW1lYm9hcmRUaWxlKCk7XG4gICAgICAgIHRvcENlbnRlclRpbGUudmlydHVhbENvb3JkaW5hdGVzID0geyB4OiAwLCB5OiAwLCB6OiAwIH07XG4gICAgICAgIHRvcENlbnRlclRpbGUuY2VudGVyUG9pbnQgPSBjZW50ZXI7XG4gICAgICAgIHRvcENlbnRlclRpbGUucG9pbnRzID0gW1xuICAgICAgICAgICAgbm9ydGhFYXN0LFxuICAgICAgICAgICAgZWFzdCxcbiAgICAgICAgICAgIHNvdXRoRWFzdCxcbiAgICAgICAgICAgIHNvdXRoV2VzdCxcbiAgICAgICAgICAgIHdlc3QsXG4gICAgICAgICAgICBub3J0aFdlc3QsXG4gICAgICAgIF07XG4gICAgICAgIHJldHVybiB0b3BDZW50ZXJUaWxlO1xuICAgIH07XG4gICAgcmV0dXJuIEdhbWVib2FyZEZhY3Rvcnk7XG59KCkpO1xuZXhwb3J0IHsgR2FtZWJvYXJkRmFjdG9yeSB9O1xuIiwiaW1wb3J0IHsgVGhyZWVEaW1lbnNpb25Db29yZGluYXRlIH0gZnJvbSBcIi4uL0NvbW1vbi9UaHJlZURpbWVuc2lvbkNvb3JkaW5hdGVcIjtcbmltcG9ydCB7IFR3b0RpbWVuc2lvbkNvb3JkaW5hdGUgfSBmcm9tIFwiLi4vQ29tbW9uL1R3b0RpbWVuc2lvbkNvb3JkaW5hdGVcIjtcbnZhciBHYW1lYm9hcmRUaWxlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEdhbWVib2FyZFRpbGUoKSB7XG4gICAgICAgIHRoaXMudmlydHVhbENvb3JkaW5hdGVzID0gbmV3IFRocmVlRGltZW5zaW9uQ29vcmRpbmF0ZSgpO1xuICAgICAgICB0aGlzLmNlbnRlclBvaW50ID0gbmV3IFR3b0RpbWVuc2lvbkNvb3JkaW5hdGUoKTtcbiAgICAgICAgdGhpcy5wb2ludHMgPSBbXTtcbiAgICB9XG4gICAgR2FtZWJvYXJkVGlsZS5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZ3JvdXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLCBcImdcIik7XG4gICAgICAgIHZhciBwb2x5Z29uID0gdGhpcy5yZW5kZXJQb2x5Z29uKCk7XG4gICAgICAgIHZhciB0ZXh0ID0gdGhpcy5yZW5kZXJUZXh0KCk7XG4gICAgICAgIGdyb3VwLmFwcGVuZENoaWxkKHBvbHlnb24pO1xuICAgICAgICBncm91cC5hcHBlbmRDaGlsZCh0ZXh0KTtcbiAgICAgICAgcmV0dXJuIGdyb3VwO1xuICAgIH07XG4gICAgR2FtZWJvYXJkVGlsZS5wcm90b3R5cGUucmVuZGVyVGV4dCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLCBcInRleHRcIik7XG4gICAgICAgIHRleHQuc2V0QXR0cmlidXRlKFwieFwiLCB0aGlzLmNlbnRlclBvaW50LngudG9TdHJpbmcoKSk7XG4gICAgICAgIHRleHQuc2V0QXR0cmlidXRlKFwieVwiLCB0aGlzLmNlbnRlclBvaW50LnkudG9TdHJpbmcoKSk7XG4gICAgICAgIHRleHQuc2V0QXR0cmlidXRlKFwidGV4dC1hbmNob3JcIiwgXCJtaWRkbGVcIik7XG4gICAgICAgIHRleHQuc2V0QXR0cmlidXRlKFwiZm9udC1mYW1pbHlcIiwgXCJWZXJkYW5hXCIpO1xuICAgICAgICB0ZXh0LnNldEF0dHJpYnV0ZShcImZvbnQtc2l6ZVwiLCBcIjEyXCIpO1xuICAgICAgICB0ZXh0LnRleHRDb250ZW50ID0gXCJbIFwiLmNvbmNhdCh0aGlzLnZpcnR1YWxDb29yZGluYXRlcy54LCBcIixcIikuY29uY2F0KHRoaXMudmlydHVhbENvb3JkaW5hdGVzLnksIFwiLFwiKS5jb25jYXQodGhpcy52aXJ0dWFsQ29vcmRpbmF0ZXMueiwgXCIgXVwiKTtcbiAgICAgICAgcmV0dXJuIHRleHQ7XG4gICAgfTtcbiAgICBHYW1lYm9hcmRUaWxlLnByb3RvdHlwZS5yZW5kZXJQb2x5Z29uID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcG9seWdvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIFwicG9seWdvblwiKTtcbiAgICAgICAgdmFyIHBvaW50cyA9IHRoaXMucG9pbnRzLm1hcChmdW5jdGlvbiAocG9pbnQpIHsgcmV0dXJuIHBvaW50LnggKyBcIixcIiArIHBvaW50Lnk7IH0pLmpvaW4oXCIgXCIpO1xuICAgICAgICBwb2x5Z29uLnNldEF0dHJpYnV0ZShcInBvaW50c1wiLCBwb2ludHMpO1xuICAgICAgICBwb2x5Z29uLnNldEF0dHJpYnV0ZShcImZpbGxcIiwgXCJsaW1lXCIpO1xuICAgICAgICBwb2x5Z29uLnNldEF0dHJpYnV0ZShcInN0cm9rZS13aWR0aFwiLCBcIjFcIik7XG4gICAgICAgIHBvbHlnb24uc2V0QXR0cmlidXRlKFwic3Ryb2tlXCIsIFwiYmxhY2tcIik7XG4gICAgICAgIHJldHVybiBwb2x5Z29uO1xuICAgIH07XG4gICAgcmV0dXJuIEdhbWVib2FyZFRpbGU7XG59KCkpO1xuZXhwb3J0IHsgR2FtZWJvYXJkVGlsZSB9O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBHYW1lYm9hcmRGYWN0b3J5IH0gZnJvbSBcIi4vTW9kZWwvR2FtZWJvYXJkRmFjdG9yeVwiO1xuZnVuY3Rpb24gZ2VuZXJhdGVHYW1lYm9hcmQoKSB7XG4gICAgdmFyIGdhbWVib2FyZEZhY3RvcnkgPSBuZXcgR2FtZWJvYXJkRmFjdG9yeSg2MCwgNyk7XG4gICAgdmFyIGdhbWVib2FyZCA9IGdhbWVib2FyZEZhY3RvcnkuZ2VuZXJhdGVHYW1lYm9hcmQoKTtcbiAgICByZXR1cm4gZ2FtZWJvYXJkLnJlbmRlcigpO1xufVxudmFyIGdyYXBoaWMgPSBnZW5lcmF0ZUdhbWVib2FyZCgpO1xuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChncmFwaGljKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==