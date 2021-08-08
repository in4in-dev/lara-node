import {ExpressRequest, ExpressRequestCookies, ExpressRequestParams} from "../Express/ExpressRequest";

export class Request{

    protected $request : ExpressRequest;

    protected readonly isXhr : boolean;
    protected readonly isSecure : boolean;
    protected readonly ip : string;
    protected readonly baseUrl : string;
    protected readonly hostname : string;
    protected readonly originalUrl : string;
    protected readonly path : string;
    protected readonly protocol : string;

    constructor(req : ExpressRequest) {
       this.$request = req;

       this.path     = req.path;
       this.isXhr    = req.xhr;
       this.isSecure = req.secure;
       this.ip       = req.ip;
       this.baseUrl  = req.baseUrl;
       this.hostname = req.hostname;
       this.protocol = req.protocol;
       this.originalUrl = req.originalUrl;
    }

    public get cookies() : ExpressRequestCookies {
        return Object.assign({}, this.$request.cookies);
    }

    public get ips() : string[]{
        return this.$request.ips.slice();
    }

    public get subdomains() : string[]{
        return this.$request.subdomains.slice();
    }

    public get params() : ExpressRequestParams {
        return Object.assign({}, this.$request.params);
    }

    public get(name : string = '', def : any = null) : any {

        if(!name){
            return Object.assign({}, this.$request.query);
        }

        if(name in this.$request.query){
            return this.$request.query[name];
        }

        return def;

    }

    public post(name : string = '', def : any = null) : any {

        if(!name){
            return (typeof this.$request.body === 'object') ? this.$request.body : {};
        }

        let postArray = this.post();

        if(name in postArray){
            return postArray[name];
        }

        return def;

    }

    public accepts(types : string | string[]) : any
    {
        return this.$request.accepts(types);
    }

}