"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Middleware = void 0;
var Middleware = /** @class */ (function () {
    function Middleware() {
    }
    Middleware.create = function (name, fn) {
        Middleware.dump[name] = fn;
    };
    Middleware.use = function (names) {
        for (var _i = 0, names_1 = names; _i < names_1.length; _i++) {
            var name = names_1[_i];
            if (name in Middleware.dump) {
                var value = Middleware.dump[name]();
                if (value) {
                    return value;
                }
            }
        }
        return false;
    };
    Middleware.dump = {};
    return Middleware;
}());
exports.Middleware = Middleware;
