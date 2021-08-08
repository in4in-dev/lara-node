/////////////////////////////////////////////
// Controller's main class
//
// Inherit your controllers from this class
//
/////////////////////////////////////////////
// class TestController extends Controller{}
/////////////////////////////////////////////

import {HttpCodes, Middleware, Request} from "./";
import {Abort} from "./Responses";

export class Controller
{

    protected middlewares = [];

    public execute(method : string, req : Request){

        if(method in this){
            try{
                return Middleware.use(this.middlewares, req) || (<any>this)[method](req);
            }catch(e){
                return new Abort(HttpCodes.SERVER_ERROR, 'Error is ' + (typeof e === 'string' ? e : e.message));
            }
        }

        return new Abort(HttpCodes.NOT_FOUND);

    }

}