"use strict";
/////////////////////////////////////////
// Like at Laravel
//
// Route.get
// Route.post
// Route.all
// Route.redirect
// Route.group({options}, (route) => {
//
//      route.get(...)
//      route.post(...)
//      route.redirect(...)
//      route.all(...)
//
//      route.group({options}, (route) => {
//          ...
//      });
// })
//
// Option can contains middleware list, url-prefix, name-prefix etc.
//
///////////////////////////////////////////
// Route-render example
//
// Route.get('/catalog/:item', ...).name('catalog-item');
//
// then u can get string url by item
//
// Route.render('catalog-item', { item : 'test' }) === '/catalog/test';
//
//////////////////////////////////////////
// And more, u can bind route :param (only global) as here:
//
// For all urls contains :item, item will be replaced to getProductByCode return
//
// Route.bind('item', (value) => {
//      return getProductByCode(value)';
// })
//
///////////////////////////////////////////
Object.defineProperty(exports, "__esModule", { value: true });
exports.Route = void 0;
var Abort_1 = require("../Http/Abort");
var RouteClosure_1 = require("./RouteClosure");
////////////////////
// Global interface
////////////////////
var Route = /** @class */ (function () {
    function Route() {
    }
    Route.get = function (pattern, controller, method) {
        return (new RouteClosure_1.RouteClosure).get(pattern, controller, method);
    };
    Route.post = function (pattern, controller, method) {
        return (new RouteClosure_1.RouteClosure).post(pattern, controller, method);
    };
    Route.all = function (pattern, controller, method) {
        return (new RouteClosure_1.RouteClosure).all(pattern, controller, method);
    };
    Route.group = function (options, fn) {
        fn(new RouteClosure_1.RouteClosure(options));
    };
    Route.bind = function (keyword, fn) {
        Route.bindings[keyword] = fn;
    };
    Route.redirect = function (pattern, to) {
        (new RouteClosure_1.RouteClosure).redirect(pattern, to);
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
