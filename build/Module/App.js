"use strict";
/////////////////////////////////////////////////////////////
//// App - is CORE. Use for start web-server
////
//// App.start(port)
/////////////////////////////////////////////////////////////
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
var express = require('express');
var App = /** @class */ (function () {
    function App() {
    }
    App.start = function (port) {
        if (port === void 0) { port = 3000; }
        var app = express();
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.listen(port);
        App.$express = app;
        return App;
    };
    return App;
}());
exports.App = App;
