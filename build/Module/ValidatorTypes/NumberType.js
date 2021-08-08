"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumberType = void 0;
var Validator_1 = require("../Validator");
var Abort_1 = require("../Abort");
var NumberType = /** @class */ (function (_super) {
    __extends(NumberType, _super);
    function NumberType() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NumberType.prototype.validate = function (data) {
        var options = this.options;
        var result = parseFloat(data) || 0;
        if (('min' in options) && result < options.min) {
            throw new Abort_1.Abort(Abort_1.HttpCodes.SERVER_ERROR, "Bad min for number");
        }
        if (('max' in options) && result > options.max) {
            throw new Abort_1.Abort(Abort_1.HttpCodes.SERVER_ERROR, 'Bad max for number');
        }
        return result;
    };
    return NumberType;
}(Validator_1.ValidatorType));
exports.NumberType = NumberType;
