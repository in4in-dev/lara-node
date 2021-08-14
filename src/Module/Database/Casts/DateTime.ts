import {Cast} from "../Cast";

export class DateTime{
    public from(value : string) : Date{
        return new Date(value);
    }
    public to(value : Date) : string{
        return value.toISOString();
    }
}