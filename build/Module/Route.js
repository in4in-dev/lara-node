"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Route = void 0;
var App_1 = require("./App");
var Abort_1 = require("./Abort");
var Middleware_1 = require("./Middleware");
var Redirect_1 = require("./Redirect");
var RouteItem = /** @class */ (function () {
    function RouteItem(pattern, parent) {
        if (parent === void 0) { parent = null; }
        this.parent = null;
        this.pattern = pattern;
        this.parent = parent;
    }
    RouteItem.prototype.getRenderUrl = function (options) {
        if (options === void 0) { options = {}; }
        var url = this.getUrl();
        for (var k in options) {
            url = url.replace(":" + k, options[k]);
        }
        return url;
    };
    RouteItem.prototype.getUrl = function () {
        var url = this.pattern;
        if (this.parent) {
            url = this.parent.getPreventPath() + url;
        }
        return url;
    };
    RouteItem.prototype.getParentName = function () {
        if (this.parent) {
            return this.parent.getPreventName();
        }
        return '';
    };
    RouteItem.prototype.getMiddlewares = function () {
        if (this.parent) {
            return this.parent.getPreventMiddlewares();
        }
        return [];
    };
    RouteItem.prototype.name = function (name) {
        Route.routes[this.getParentName() + name] = this;
    };
    RouteItem.prototype.setup = function (type, callback) {
        var url = this.getUrl();
        var middlewares = this.getMiddlewares();
        App_1.App.$express[type](url, function (req, res) {
            var response;
            try {
                response = Middleware_1.Middleware.use(middlewares) || callback(req);
            }
            catch (e) {
                response = new Abort_1.Abort(Abort_1.HttpCodes.SERVER_ERROR, (typeof e === 'object' ? e.message : e).toString());
            }
            if (response instanceof Abort_1.Abort) {
                res.status(response.status).send(response.message);
            }
            else if (response instanceof Redirect_1.Redirect) {
                res.redirect(response.url);
            }
            else {
                if (typeof response === 'object') {
                    res.json(response);
                }
                else {
                    res.send(response.toString());
                }
            }
            res.end();
        });
    };
    return RouteItem;
}());
var RouteClosure = /** @class */ (function () {
    function RouteClosure(options, parentRouteClosure) {
        if (options === void 0) { options = {}; }
        if (parentRouteClosure === void 0) { parentRouteClosure = null; }
        this.options = options;
        this.parentRouteClosure = parentRouteClosure;
    }
    RouteClosure.prototype.requestBinding = function (type, pattern, controller, method) {
        var route = new RouteItem(pattern, this);
        route.setup(type, function (req) {
            return (new controller).execute(method, req);
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
        var route = new RouteItem(pattern, this);
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
var Route = /** @class */ (function () {
    function Route() {
    }
    Route.get = function (pattern, controller, method) {
        return (new RouteClosure).get(pattern, controller, method);
    };
    Route.post = function (pattern, controller, method) {
        return (new RouteClosure).post(pattern, controller, method);
    };
    Route.all = function (pattern, controller, method) {
        return (new RouteClosure).all(pattern, controller, method);
    };
    Route.group = function (options, fn) {
        fn(new RouteClosure(options));
    };
    Route.bind = function (keyword, fn) {
        Route.bindings[keyword] = fn;
    };
    Route.redirect = function (pattern, to) {
        (new RouteClosure).redirect(pattern, to);
    };
    Route.render = function (name, options) {
        if (options === void 0) { options = {}; }
        if (name in Route.routes) {
            return Route.routes[name].getRenderUrl(options);
        }
        throw new Abort_1.Abort(Abort_1.HttpCodes.SERVER_ERROR, "Route \"" + name + "\" is not defined");
    };
    Route.bindings = {};
    Route.routes = {};
    return Route;
}());
exports.Route = Route;
