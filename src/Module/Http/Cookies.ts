import {ExpressRequestCookies} from "../Express/ExpressRequest";
import {ExpressCookieOptions, ExpressResponse} from "../Express/ExpressResponse";

export class Cookies{

    protected $response : ExpressResponse;
    protected cookies : ExpressRequestCookies;

    constructor(res : ExpressResponse, cookies : ExpressRequestCookies) {
        this.cookies = cookies;
        this.$response = res;
    }

    public get(name : string = '') : ExpressRequestCookies | string | null {

        if(name){
            return this.has(name) ? this.cookies[name] : null;
        }

        return { ...this.cookies };
    }

    public delete(name : string, options : ExpressCookieOptions = {}){
        this.$response.clearCookie(name, options);
    }

    public set(name : string, value : any, options : ExpressCookieOptions = {}){
        this.$response.cookie(name, value, options);
    }

    public forever(name : string, value : any, options : ExpressCookieOptions = {}){

        let time = Date.now() + (1000 * 60 * 60 * 24 * 365);

        this.set(name, value,
            { ...options, expires : new Date(time) }
        );

    }

    public session(name : string, value : any, options : ExpressCookieOptions = {}){

        this.set(name, value,
            { ...options, expires : undefined }
        );

    }

    public has(name : string) : boolean {
        return (name in this.cookies);
    }

}