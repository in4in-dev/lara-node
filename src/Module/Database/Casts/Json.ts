import {Cast} from "../Cast";

export class Json extends Cast{
    public from(value : string) : any{
        return JSON.parse(value);
    }
    public to(value : any) : string{
        return JSON.stringify(value);
    }
}