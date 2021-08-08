"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var App_1 = require("../Module/App");
var Middleware_1 = require("../Module/Http/Middleware");
var Abort_1 = require("../Module/Http/Abort");
var Route_1 = require("../Module/Routing/Route");
var TestController_1 = require("./TestController");
App_1.App.start(3000);
Middleware_1.Middleware.create('test', function () {
    return false;
});
Middleware_1.Middleware.create('test2', function () {
    return new Abort_1.Abort(Abort_1.HttpCodes.SERVER_ERROR, 'Error middleware');
});
Route_1.Route.group({
    'prefix': '/catalog',
    'middlewares': ['test'],
    'name': 'catalog'
}, function (route) {
    route.get('/', TestController_1.TestController, 'index');
    route.group({
        'prefix': '/:item_id',
        'name': '.item',
        'middlewares': ['test2']
    }, function (route) {
        route.redirect('/redirect', '/catalog/test');
        route.get('/', TestController_1.TestController, 'get').name('.get');
    });
});
