import {Cast} from "../Cast";
import {Abort} from "../../Http/Responses";

export class Json extends Cast{

    public middle(value : any) : any{
        if(typeof value === 'object'){
            return value;
        }

        throw new Abort(502, 'Bad value for JSON field');
    }

    public from(value : string) : any{
        return JSON.parse(value);
    }

    public to(value : any) : string{
        return JSON.stringify(value);
    }

}