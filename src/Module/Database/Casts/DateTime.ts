import {Cast} from "../Cast";
import {Abort} from "../../Http/Responses";

export class DateTime{

    public middle(value : any) : Date{

        if(value instanceof Date){
            return value;
        }

        throw new Abort(502, 'Bad value for Date field');

    }

    public from(value : string) : Date{
        return new Date(value);
    }
    public to(value : Date) : string{
        return value.toISOString();
    }
}