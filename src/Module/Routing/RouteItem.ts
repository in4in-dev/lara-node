/////////////////////
// Just easy route
////////////////////
import {App} from "../App";
import {Route, RouteClosure} from "./";
import {HttpCodes, Middleware, Request, Response} from "../Http";
import {Redirect, Abort, Plain, Json} from "../Http/Responses";

import {ExpressRequest, ExpressRequestParams} from "../Express/ExpressRequest";
import {ExpressResponse} from "../Express/ExpressResponse";

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
        Route.$routes[this.getParentName() + name] = this;
    }


    public setup(
        type : string,
        callback : (req : ExpressRequest, res : ExpressResponse) => any
    ){

        let url = this.getUrl();
        let middlewares = this.getMiddlewares();

        App.$express[type](url, (req : ExpressRequest, res : ExpressResponse) => {

            let response: any;
            try{
                response = Middleware.use(middlewares) || callback(req, res);

                if(!response){
                    response = new Plain('');
                }else if(!(response instanceof Response)){

                    if(typeof response === 'object'){
                        response = new Json(response);
                    }else{
                        response = new Plain(response);
                    }

                }

            }catch(e) {

                response = e;

                if(!(response instanceof Response)){
                    response = new Abort(HttpCodes.SERVER_ERROR, String(e));
                }

            }

            // request.session.flushOnce();

            response.answer(res);
            res.end();

        });

    }



}