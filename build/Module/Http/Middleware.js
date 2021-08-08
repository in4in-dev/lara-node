"use strict";
///////////////////////////////////////////
// A simple way to interact with the
// request before the controller
///////////////////////////////////////////
//
// Create your middleware, use
// Middleware.create('my_middleware', function(request){
//      return true; //or throw Abort
// });
///////////////////////////////////////////
Object.defineProperty(exports, "__esModule", { value: true });
exports.Middleware = void 0;
var Middleware = /** @class */ (function () {
    function Middleware() {
    }
    Middleware.create = function (name, fn) {
        Middleware.dump[name] = fn;
    };
    Middleware.use = function (names) {
        var _a;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        for (var _b = 0, names_1 = names; _b < names_1.length; _b++) {
            var name = names_1[_b];
            if (name in Middleware.dump) {
                var value = (_a = Middleware.dump)[name].apply(_a, args);
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
