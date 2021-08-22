import {ExpressRequest, ExpressRequestParams} from "../Express/ExpressRequest";
import {ExpressResponse} from "../Express/ExpressResponse";
import {Cookies} from "./Cookies";
import {Session} from "./Session/Session";
import {Redirect} from "./Responses";

export class Request{

    public readonly $request : ExpressRequest;
    public readonly $response : ExpressResponse;

    public readonly isXhr : boolean;
    public readonly isSecure : boolean;
    public readonly ip : string;
    public readonly baseUrl : string;
    public readonly hostname : string;
    public readonly originalUrl : string;
    public readonly path : string;
    public readonly protocol : string;
    public readonly cookies : Cookies;
    public readonly session : Session;
    public readonly params : ExpressRequestParams;

    constructor(req : ExpressRequest, res : ExpressResponse, bindingParams : ExpressRequestParams) {
       this.$request = req;
       this.$response = res;

       this.path     = req.path;
       this.isXhr    = req.xhr;
       this.isSecure = req.secure;
       this.ip       = req.ip;
       this.baseUrl  = req.baseUrl;
       this.hostname = req.hostname;
       this.protocol = req.protocol;
       this.originalUrl = req.originalUrl;
       this.params = bindingParams;

       this.cookies = new Cookies(res, req.cookies);
       this.session = new Session(req);
    }

    public status(status : number){
        this.$response.status(status);
    }

    public get ips() : string[]{
        return this.$request.ips.slice();
    }

    public get subdomains() : string[]{
        return this.$request.subdomains.slice();
    }

    public get originalParams() : ExpressRequestParams {
        return { ...this.$request.params };
    }

    public get(name : string = '', def : any = null) : any {

        if(!name){
            return { ...this.$request.query };
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

    public getHeader(field : string) : string | undefined{
        return this.$request.get(field);
    }

    public setHeader(field : string, value : string){
        this.$response.set(field, value);
    }

    public accepts(types : string | string[]) : any
    {
        return this.$request.accepts(types);
    }

}