/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/canvas.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/canvas.js":
/*!**************************!*\
  !*** ./src/js/canvas.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./src/js/utils.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_utils_js__WEBPACK_IMPORTED_MODULE_0__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;
var mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
};
var colors = ['#2185C5', '#7ECEFD', '#FF7F66'];
var GRAVITY = 0.01; // Event Listeners

addEventListener('mousemove', function (event) {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});
addEventListener('resize', function () {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  init();
}); // Objects

var Ball = /*#__PURE__*/function () {
  function Ball(x, y, radius, color, elasticity) {
    _classCallCheck(this, Ball);

    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.dx = Math.sign(Math.random() - 0.5) * Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["randomFromRange"])(5, 10);
    this.dy = Math.sign(Math.random() - 0.5) * Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["randomFromRange"])(5, 10);
    this.elasticity = elasticity;
  }

  _createClass(Ball, [{
    key: "draw",
    value: function draw() {
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      c.fillStyle = this.color;
      c.fill();
      c.closePath();
    }
  }, {
    key: "update",
    value: function update() {
      var minX = this.radius;
      var maxX = innerWidth - this.radius;
      var minY = this.radius;
      var maxY = innerHeight - this.radius;

      if (this.y > maxY) {
        console.log("Floor Bounce");
        this.y = maxY;
        this.dy *= -this.elasticity;
      } else if (this.y < minY) {
        this.y = minY;
        this.dy *= -this.elasticity;
      } else {
        this.dy += GRAVITY;
        this.y += this.dy;
      }

      if (this.x < minX) {
        console.log("Left Bounce");
        this.x = minX;
        this.dx *= -this.elasticity;
      } else if (this.x > maxX) {
        console.log("Left Bounce");
        this.x = maxX;
        this.dx *= -this.elasticity;
      } else {
        this.x += this.dx;
      } // if (distance(this.x, this.y, mouse.x, mouse.y) <= this.radius) {
      //   this.showDetails();
      // }


      this.draw();
    }
  }, {
    key: "gpe",
    value: function gpe() {
      return GRAVITY * (innerHeight - this.radius - this.y);
    }
  }, {
    key: "vke",
    value: function vke() {
      return 0.5 * Math.pow(this.dy, 2);
    }
  }, {
    key: "hke",
    value: function hke() {
      return 0.5 * Math.pow(this.dx, 2);
    }
  }, {
    key: "showDetails",
    value: function showDetails() {
      c.fillStyle = this.color;
      c.fillText("Elasticity = ".concat(this.elasticity), mouse.x, mouse.y - 2 * this.radius);
    }
  }]);

  return Ball;
}(); // Implementation


var objects;

function init() {
  objects = [];

  for (var i = 0; i < 100; i++) {
    var radius = Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["randomFromRange"])(10, 20);
    var x = Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["randomFromRange"])(radius, innerWidth - radius);
    var y = Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["randomFromRange"])(radius, innerHeight / 2 - radius);
    var color = Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["randomColor"])(colors);
    var elasticity = Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["randomFromRange"])(0.6, 0.9);
    objects.push(new Ball(x, y, radius, color, elasticity));
  }
} // Animation Loop


function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  objects.forEach(function (object) {
    object.update();
  });
}

init();
animate();

/***/ }),

/***/ "./src/js/utils.js":
/*!*************************!*\
  !*** ./src/js/utils.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

function randomFromRange(min, max) {
  return Math.random() * (max - min) + min;
}

function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}

function distance(x1, y1, x2, y2) {
  var xDist = x2 - x1;
  var yDist = y2 - y1;
  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

module.exports = {
  randomFromRange: randomFromRange,
  randomIntFromRange: randomIntFromRange,
  randomColor: randomColor,
  distance: distance
};

/***/ })

/******/ });
//# sourceMappingURL=canvas.bundle.js.map