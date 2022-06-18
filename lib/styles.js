"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var makeStyles_1 = __importDefault(require("@material-ui/styles/makeStyles"));
var round_1 = __importDefault(require("lodash/round"));
var utils_1 = require("./utils");
var ROTATION_SPEED_MIN = 200; // minimum possible duration of single particle full rotation
var ROTATION_SPEED_MAX = 800; // maximum possible duration of single particle full rotation
var CRAZY_PARTICLES_FREQUENCY = 0.1; // 0-1 frequency of crazy curvy unpredictable particles
var CRAZY_PARTICLE_CRAZINESS = 0.3; // 0-1 how crazy these crazy particles are
var BEZIER_MEDIAN = 0.5; // utility for mid-point bezier curves, to ensure smooth motion paths
var rotationKeyframes = utils_1.rotationTransforms.reduce(function (acc, xyz, i) {
    var _a;
    return __assign(__assign({}, acc), (_a = {}, _a["@keyframes rotation-" + i] = {
        '50%': {
            transform: "rotate3d(" + xyz.map(function (v) { return v / 2; }).join() + ", 180deg)",
        },
        '100%': {
            transform: "rotate3d(" + xyz.join() + ", 360deg)",
        },
    }, _a));
}, {});
var confettiKeyframes = function (degrees, floorHeight, floorWidth) {
    var xLandingPoints = degrees.reduce(function (acc, degree, i) {
        var _a;
        var landingPoint = utils_1.mapRange(Math.abs(utils_1.rotate(degree, 90) - 180), 0, 180, -floorWidth / 2, floorWidth / 2);
        return __assign(__assign({}, acc), (_a = {}, _a["@keyframes x-axis-" + i] = {
            to: {
                transform: "translateX(" + landingPoint + "px)",
            },
        }, _a));
    }, {});
    return __assign({ '@keyframes y-axis': {
            to: {
                transform: "translateY(" + floorHeight + "px)",
            },
        } }, xLandingPoints);
};
var confettoStyle = function (particle, duration, force, size, i) {
    var _a;
    var rotation = Math.round(Math.random() * (ROTATION_SPEED_MAX - ROTATION_SPEED_MIN) + ROTATION_SPEED_MIN);
    var rotationIndex = Math.round(Math.random() * (utils_1.rotationTransforms.length - 1));
    var durationChaos = duration - Math.round(Math.random() * 1000);
    var shouldBeCrazy = Math.random() < CRAZY_PARTICLES_FREQUENCY;
    var isCircle = utils_1.shouldBeCircle(rotationIndex);
    // x-axis disturbance, roughly the distance the particle will initially deviate from its target
    var x1 = shouldBeCrazy ? round_1.default(Math.random() * CRAZY_PARTICLE_CRAZINESS, 2) : 0;
    var x2 = x1 * -1;
    var x3 = x1;
    // x-axis arc of explosion, so 90deg and 270deg particles have curve of 1, 0deg and 180deg have 0
    var x4 = round_1.default(Math.abs(utils_1.mapRange(Math.abs(utils_1.rotate(particle.degree, 90) - 180), 0, 180, -1, 1)), 4);
    // roughly how fast particle reaches end of its explosion curve
    var y1 = round_1.default(Math.random() * BEZIER_MEDIAN, 4);
    // roughly maps to the distance particle goes before reaching free-fall
    var y2 = round_1.default(Math.random() * force * (utils_1.coinFlip() ? 1 : -1), 4);
    // roughly how soon the particle transitions from explosion to free-fall
    var y3 = BEZIER_MEDIAN;
    // roughly the ease of free-fall
    var y4 = round_1.default(Math.max(utils_1.mapRange(Math.abs(particle.degree - 180), 0, 180, force, -force), 0), 4);
    return _a = {},
        _a["&#confetti-particle-" + i] = {
            animation: "$x-axis-" + i + " " + durationChaos + "ms forwards cubic-bezier(" + x1 + ", " + x2 + ", " + x3 + ", " + x4 + ")",
            '& > div': {
                width: isCircle ? size : Math.round(Math.random() * 4) + size / 2,
                height: isCircle ? size : Math.round(Math.random() * 2) + size,
                animation: "$y-axis " + durationChaos + "ms forwards cubic-bezier(" + y1 + ", " + y2 + ", " + y3 + ", " + y4 + ")",
                '&:after': __assign({ backgroundColor: particle.color, animation: "$rotation-" + rotationIndex + " " + rotation + "ms infinite linear" }, (isCircle ? { borderRadius: '50%' } : {})),
            },
        },
        _a;
};
var useStyles = function (_a) {
    var particles = _a.particles, duration = _a.duration, floorHeight = _a.floorHeight, floorWidth = _a.floorWidth, force = _a.force, particleSize = _a.particleSize;
    return makeStyles_1.default(function () {
        var confettiStyles = particles.reduce(function (acc, particle, i) { return (__assign(__assign({}, acc), confettoStyle(particle, duration, force, particleSize, i))); }, {});
        return __assign(__assign(__assign({}, rotationKeyframes), confettiKeyframes(particles.map(function (particle) { return particle.degree; }), floorHeight, floorWidth)), { container: {
                width: 0,
                height: 0,
                position: 'relative',
                overflow: 'visible',
                zIndex: 1200,
            }, particle: __assign(__assign({}, confettiStyles), { '& > div': {
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    '&:after': {
                        content: "''",
                        display: 'block',
                        width: '100%',
                        height: '100%',
                    },
                } }) });
    }, { name: 'ConfettiExplosion' });
};
exports.default = useStyles;
//# sourceMappingURL=styles.js.map