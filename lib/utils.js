"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shouldBeCircle = exports.rotationTransforms = exports.coinFlip = exports.rotate = exports.mapRange = void 0;
var isEqual_1 = __importDefault(require("lodash/isEqual"));
exports.mapRange = function (value, x1, y1, x2, y2) {
    return ((value - x1) * (y2 - x2)) / (y1 - x1) + x2;
};
exports.rotate = function (degree, amount) {
    var result = degree + amount;
    return result > 360 ? result - 360 : result;
};
exports.coinFlip = function () { return Math.random() > 0.5; };
// avoid this for circles, as it will have no visual effect
var zAxisRotation = [0, 0, 1];
exports.rotationTransforms = [
    // dual axis rotations (a bit more realistic)
    [1, 1, 0],
    [1, 0, 1],
    [0, 1, 1],
    // single axis rotations (a bit dumber)
    [1, 0, 0],
    [0, 1, 0],
    zAxisRotation,
];
exports.shouldBeCircle = function (rotationIndex) {
    return !isEqual_1.default(exports.rotationTransforms[rotationIndex], zAxisRotation) && exports.coinFlip();
};
//# sourceMappingURL=utils.js.map