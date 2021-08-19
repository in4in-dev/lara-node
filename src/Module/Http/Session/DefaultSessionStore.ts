import {SessionContainer, SessionStore} from "./SessionStore";

export class DefaultSessionStore implements SessionStore{

    protected data : SessionContainer;

    constructor(values : SessionContainer) {
        this.data = values;
    }

    public has(key : string) : boolean{
        return (key in this.data);
    }

    public set(key : string, value : any){
        this.data[key] = value;
    }

    public clear(key: string){
        delete this.data[key];
    }

    public get(key : string) : any | null{

        if(this.has(key)){
            return this.data[key];
        }

        return null;

    }

    public all() : SessionContainer{
        return { ...this.data }
    }

    public toJSON() : SessionContainer{
        return this.data;
    }

}