export class Middleware{

    protected static dump : { [key:string] : () => any } = {};

    public static create(name : string, fn : () => any){
        Middleware.dump[name] = fn;
    }

    public static use(names : string[]) : any
    {

        for(let name of names){

            if(name in Middleware.dump){

                let value = Middleware.dump[name]();

                if(value){
                    return value;
                }

            }

        }

        return false;

    }


}