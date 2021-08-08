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
exports.ArrayType = void 0;
var Validator_1 = require("../Validator");
var Abort_1 = require("../Abort");
var ArrayType = /** @class */ (function (_super) {
    __extends(ArrayType, _super);
    function ArrayType() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ArrayType.prototype.validate = function (data) {
        if (typeof data !== 'string') {
            throw new Abort_1.Abort(Abort_1.HttpCodes.SERVER_ERROR, 'Bad array');
        }
        var options = this.options;
        var result = data ? data.split(",") : [];
        if (('min_length' in options) && result.length < options.min_length) {
            throw new Abort_1.Abort(Abort_1.HttpCodes.SERVER_ERROR, "Bad min_length for array");
        }
        if (('max_length' in options) && result.length > options.max_length) {
            throw new Abort_1.Abort(Abort_1.HttpCodes.SERVER_ERROR, 'Bad max_length for array');
        }
        return data.split(",");
    };
    return ArrayType;
}(Validator_1.ValidatorType));
exports.ArrayType = ArrayType;
