"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validator = exports.ValidatorType = void 0;
var Abort_1 = require("./Abort");
var ValidatorType = /** @class */ (function () {
    function ValidatorType(options) {
        this.options = options;
    }
    ValidatorType.prototype.validate = function (data) {
        return data;
    };
    return ValidatorType;
}());
exports.ValidatorType = ValidatorType;
var Validator = /** @class */ (function () {
    function Validator() {
    }
    Validator.create = function (name, type) {
        Validator.validators[name] = type;
    };
    Validator.make = function (data, settings) {
        //required
        //default
    };
    Validator.use = function (data, type, options) {
        if (type in Validator.validators) {
            var constructor = Validator.validators[type];
            var validator = new constructor(options);
            return validator.validate(data);
        }
        else {
            throw new Abort_1.Abort(Abort_1.HttpCodes.SERVER_ERROR, "Validator " + type + " not found");
        }
    };
    Validator.validators = {};
    return Validator;
}());
exports.Validator = Validator;
