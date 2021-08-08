"use strict";
//////////////////////////////
// Global box for u variables
//////////////////////////////
// Registry.set('var', database);
// Registry.get('var');
//////////////////////////////
Object.defineProperty(exports, "__esModule", { value: true });
exports.Registry = void 0;
var Registry = /** @class */ (function () {
    function Registry() {
    }
    Registry.set = function (name, value) {
        Registry.dump[name] = value;
    };
    Registry.get = function (name) {
        return ('name' in Registry.dump) ? Registry.dump[name] : null;
    };
    Registry.dump = {};
    return Registry;
}());
exports.Registry = Registry;
