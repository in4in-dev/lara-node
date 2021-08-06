import {Abort, HttpCodes} from "./Abort";
import {Middleware} from "./Middleware";

export class Controller
{

    protected middlewares = [];

    public execute(method : string, req : any){

        if(method in this){
            try{
                return Middleware.use(this.middlewares) || (<any>this)[method](req);
            }catch(e){
                return new Abort(HttpCodes.SERVER_ERROR, 'Error is ' + (typeof e === 'string' ? e : e.message));
            }
        }

        return new Abort(HttpCodes.NOT_FOUND);

    }

}