"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var range_1 = __importDefault(require("lodash/range"));
var styles_1 = __importDefault(require("./styles"));
var FORCE = 0.5; // 0-1 roughly the vertical force at which particles initially explode
var SIZE = 12; // max height for particle rectangles, diameter for particle circles
var FLOOR_HEIGHT = 800; // pixels the particles will fall from initial explosion point
var FLOOR_WIDTH = 1600; // horizontal spread of particles in pixels
var PARTICLE_COUNT = 150;
var DURATION = 3500;
var COLORS = [
    '#FFC700',
    '#FF0000',
    '#2E3191',
    '#41BBC7'
];
var createParticles = function (count, colors) {
    var increment = 360 / count;
    return range_1.default(count).map(function (index) { return ({
        color: colors[index % colors.length],
        degree: increment * index,
    }); });
};
function ConfettiExplosion(_a) {
    var _b = _a.particleCount, particleCount = _b === void 0 ? PARTICLE_COUNT : _b, _c = _a.duration, duration = _c === void 0 ? DURATION : _c, _d = _a.colors, colors = _d === void 0 ? COLORS : _d, _e = _a.particleSize, particleSize = _e === void 0 ? SIZE : _e, _f = _a.force, force = _f === void 0 ? FORCE : _f, _g = _a.floorHeight, floorHeight = _g === void 0 ? FLOOR_HEIGHT : _g, _h = _a.floorWidth, floorWidth = _h === void 0 ? FLOOR_WIDTH : _h;
    var particles = createParticles(particleCount, colors);
    var classes = styles_1.default({ particles: particles, duration: duration, particleSize: particleSize, force: force, floorWidth: floorWidth, floorHeight: floorHeight })();
    return (React.createElement("div", { className: classes.container }, particles.map(function (particle, i) { return (React.createElement("div", { id: "confetti-particle-" + i, className: classes.particle, key: particle.degree },
        React.createElement("div", null))); })));
}
exports.default = ConfettiExplosion;
//# sourceMappingURL=index.js.map