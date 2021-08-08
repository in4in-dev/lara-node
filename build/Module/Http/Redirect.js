"use strict";
///////////////////////////////////////////
// You can return Redirect from controller
//
// new Redirect('/catalog');
//
// or just use
//
// Redirect.to('/catalog'); - redirect to url
//
// Redirect.route('catalog');
// Redirect.route('product', { id : 25 }); - redirect to route
////////////////////////////////////////////
Object.defineProperty(exports, "__esModule", { value: true });
exports.Redirect = void 0;
var Route_1 = require("../Routing/Route");
var Redirect = /** @class */ (function () {
    function Redirect(url) {
        this.url = url;
    }
    Redirect.route = function (name, options) {
        if (options === void 0) { options = {}; }
        return new Redirect(Route_1.Route.render(name, options));
    };
    Redirect.to = function (url) {
        return new Redirect(url);
    };
    return Redirect;
}());
exports.Redirect = Redirect;
