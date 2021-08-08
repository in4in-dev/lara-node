/////////////////////
// Just easy route
////////////////////
import {Route} from "./Route";
import {RouteClosure} from "./RouteClosure";
import {ExpressRequest} from "../Express/ExpressRequest";
import {Abort, HttpCodes} from "../Http/Abort";
import {Middleware} from "../Http/Middleware";
import {App} from "../App";
import {Redirect} from "../Http/Redirect";

export class RouteItem
{

    protected parent : RouteClosure | null = null;
    protected pattern : string;

    public constructor(pattern : string, parent : RouteClosure | null = null) {
        this.pattern = pattern;
        this.parent = parent;
    }

    public getRenderUrl(options : { [key:string] : string } = {}) : string {

        let url = this.getUrl();

        for(let k in options){
            url = url.replace(`:${k}`, options[k]);
        }

        return url;

    }

    protected getUrl() : string {

        let url = this.pattern;

        if(this.parent){
            url = this.parent.getPreventPath() + url;
        }

        return url;

    }

    protected getParentName() : string {

        if(this.parent){
            return this.parent.getPreventName();
        }

        return '';

    }

    protected getMiddlewares() : string[] {

        if(this.parent){
            return this.parent.getPreventMiddlewares();
        }

        return [];

    }

    public name(name : string)
    {
        Route.routes[this.getParentName() + name] = this;
    }

    public setup(
        type : string,
        callback : (req : ExpressRequest) => any
    ){

        let url = this.getUrl();
        let middlewares = this.getMiddlewares();

        App.$express[type](url, (req : ExpressRequest, res : any) => {

            let response: any;

            try{
                response = Middleware.use(middlewares) || callback(req);
            }catch(e) {
                response = new Abort(HttpCodes.SERVER_ERROR, (typeof e === 'object' ? e.message : e).toString());
            }

            if(response instanceof Abort) {
                res.status(response.status).send(response.message);
            }else if(response instanceof Redirect){
                res.redirect(response.url);
            }else{

                if(typeof response === 'object'){
                    res.json(response);
                }else{
                    res.send(response.toString());
                }

            }

            res.end();

        });

    }



}