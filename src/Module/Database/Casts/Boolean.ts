import {Cast} from "../Cast";

export class Json extends Cast{

    public middle(value : any) : boolean {
        return !!value;
    }

    public from(value : string) : boolean{
        return !!+value;
    }

    public to(value : boolean) : number{
        return +value;
    }

}