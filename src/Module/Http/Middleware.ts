///////////////////////////////////////////
// A simple way to interact with the
// request before the controller
///////////////////////////////////////////
//
// Create your middleware, use
// Middleware.create('my_middleware', function(request){
//      return true; //or throw Abort
// });
///////////////////////////////////////////

export class Middleware{

    protected static dump : { [key:string] : (...args : any[]) => any } = {};

    public static create(name : string, fn : (...args : any[]) => any){
        Middleware.dump[name] = fn;
    }

    public static use(names : string[], ...args : any[]) : any
    {

        for(let name of names){

            if(name in Middleware.dump){

                let value = Middleware.dump[name](...args);

                if(value){
                    return value;
                }

            }

        }

        return false;

    }


}