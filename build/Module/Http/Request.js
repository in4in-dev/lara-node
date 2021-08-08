"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Request = void 0;
var Request = /** @class */ (function () {
    function Request(req) {
        this.$request = req;
        this.path = req.path;
        this.isXhr = req.xhr;
        this.isSecure = req.secure;
        this.ip = req.ip;
        this.baseUrl = req.baseUrl;
        this.hostname = req.hostname;
        this.protocol = req.protocol;
        this.originalUrl = req.originalUrl;
    }
    Object.defineProperty(Request.prototype, "cookies", {
        get: function () {
            return Object.assign({}, this.$request.cookies);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Request.prototype, "ips", {
        get: function () {
            return this.$request.ips.slice();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Request.prototype, "subdomains", {
        get: function () {
            return this.$request.subdomains.slice();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Request.prototype, "params", {
        get: function () {
            return Object.assign({}, this.$request.params);
        },
        enumerable: false,
        configurable: true
    });
    Request.prototype.get = function (name, def) {
        if (name === void 0) { name = ''; }
        if (def === void 0) { def = null; }
        if (!name) {
            return Object.assign({}, this.$request.query);
        }
        if (name in this.$request.query) {
            return this.$request.query[name];
        }
        return def;
    };
    Request.prototype.post = function (name, def) {
        if (name === void 0) { name = ''; }
        if (def === void 0) { def = null; }
        if (!name) {
            return (typeof this.$request.body === 'object') ? this.$request.body : {};
        }
        var postArray = this.post();
        if (name in postArray) {
            return postArray[name];
        }
        return def;
    };
    Request.prototype.accepts = function (types) {
        return this.$request.accepts(types);
    };
    return Request;
}());
exports.Request = Request;
