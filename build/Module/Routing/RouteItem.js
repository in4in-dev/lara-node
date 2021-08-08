"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteItem = void 0;
/////////////////////
// Just easy route
////////////////////
var Route_1 = require("./Route");
var Abort_1 = require("../Http/Abort");
var Middleware_1 = require("../Http/Middleware");
var App_1 = require("../App");
var Redirect_1 = require("../Http/Redirect");
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
        Route_1.Route.routes[this.getParentName() + name] = this;
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
exports.RouteItem = RouteItem;
