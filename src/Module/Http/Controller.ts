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

    protected middlewares : string[] = [];

    public execute(method : string, req : Request){

        if(method in this){
            return Middleware.use(this.middlewares, req) || (<any>this)[method](req);
        }

        return new Abort(HttpCodes.NOT_FOUND, 'Not found');

    }

}