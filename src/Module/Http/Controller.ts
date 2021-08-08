/////////////////////////////////////////////
// Controller's main class
//
// Inherit your controllers from this class
//
/////////////////////////////////////////////
// class TestController extends Controller{}
/////////////////////////////////////////////

import {Abort, HttpCodes} from "./Abort";
import {Middleware} from "./Middleware";
import {Request} from "./Request";

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