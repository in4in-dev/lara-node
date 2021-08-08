"use strict";
/////////////////////////////////////////////
// Controller's main class
//
// Inherit your controllers from this class
//
/////////////////////////////////////////////
// class TestController extends Controller{}
/////////////////////////////////////////////
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
var Abort_1 = require("./Abort");
var Middleware_1 = require("./Middleware");
var Controller = /** @class */ (function () {
    function Controller() {
        this.middlewares = [];
    }
    Controller.prototype.execute = function (method, req) {
        if (method in this) {
            try {
                return Middleware_1.Middleware.use(this.middlewares, req) || this[method](req);
            }
            catch (e) {
                return new Abort_1.Abort(Abort_1.HttpCodes.SERVER_ERROR, 'Error is ' + (typeof e === 'string' ? e : e.message));
            }
        }
        return new Abort_1.Abort(Abort_1.HttpCodes.NOT_FOUND);
    };
    return Controller;
}());
exports.Controller = Controller;
