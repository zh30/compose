"use strict";
exports.__esModule = true;
exports.isNumber = void 0;
var PrimitiveNumber = /** @class */ (function () {
    function PrimitiveNumber() {
    }
    PrimitiveNumber[Symbol.hasInstance] = function (value) {
        return typeof value === 'number';
    };
    return PrimitiveNumber;
}());
function isNumber(num) {
    return num instanceof PrimitiveNumber;
}
exports.isNumber = isNumber;
