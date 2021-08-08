"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteClosure = void 0;
var RouteItem_1 = require("./RouteItem");
var Redirect_1 = require("../Http/Redirect");
var Request_1 = require("../Http/Request");
var RouteClosure = /** @class */ (function () {
    function RouteClosure(options, parentRouteClosure) {
        if (options === void 0) { options = {}; }
        if (parentRouteClosure === void 0) { parentRouteClosure = null; }
        this.options = options;
        this.parentRouteClosure = parentRouteClosure;
    }
    RouteClosure.prototype.requestBinding = function (type, pattern, controller, method) {
        var route = new RouteItem_1.RouteItem(pattern, this);
        route.setup(type, function (req) {
            return (new controller).execute(method, new Request_1.Request(req));
        });
        return route;
    };
    RouteClosure.prototype.get = function (pattern, controller, method) {
        return this.requestBinding('get', pattern, controller, method);
    };
    RouteClosure.prototype.post = function (pattern, controller, method) {
        return this.requestBinding('post', pattern, controller, method);
    };
    RouteClosure.prototype.all = function (pattern, controller, method) {
        return this.requestBinding('all', pattern, controller, method);
    };
    RouteClosure.prototype.redirect = function (pattern, to) {
        var route = new RouteItem_1.RouteItem(pattern, this);
        route.setup('all', function (req) {
            return Redirect_1.Redirect.to(to);
        });
        return route;
    };
    RouteClosure.prototype.group = function (options, fn) {
        fn(new RouteClosure(options, this));
    };
    RouteClosure.prototype.getPreventPath = function () {
        var parent = this.parentRouteClosure
            ? this.parentRouteClosure.getPreventPath()
            : '';
        return parent + (this.options.prefix + '');
    };
    RouteClosure.prototype.getPreventMiddlewares = function () {
        var middlewares = this.options.middlewares || [];
        if (this.parentRouteClosure) {
            middlewares.unshift.apply(middlewares, this.parentRouteClosure.getPreventMiddlewares());
        }
        return middlewares;
    };
    RouteClosure.prototype.getPreventName = function () {
        var name = this.parentRouteClosure
            ? this.parentRouteClosure.getPreventName()
            : '';
        return name + (this.options.name + '');
    };
    return RouteClosure;
}());
exports.RouteClosure = RouteClosure;
