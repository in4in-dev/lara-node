"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestController = void 0;
var Controller_1 = require("./Module/Controller");
var Redirect_1 = require("./Module/Redirect");
var TestController = /** @class */ (function (_super) {
    __extends(TestController, _super);
    function TestController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TestController.prototype.redirect = function () {
        return Redirect_1.Redirect.route('catalog.item.get', {
            item_id: 'red_test_1'
        });
    };
    TestController.prototype.get = function (req) {
        return { 'item': req.params.item_id };
    };
    TestController.prototype.index = function (req) {
        return 'All ok my friend';
    };
    return TestController;
}(Controller_1.Controller));
exports.TestController = TestController;
