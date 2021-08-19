import {SessionContainer, SessionStore} from "./SessionStore";

export class TempSessionStore implements SessionStore{

    protected newData : SessionContainer = {};
    protected oldData : SessionContainer;

    constructor(values : SessionContainer) {
        this.oldData = values;
    }

    public has(key : string) : boolean{
        return (key in this.newData) || (key in this.oldData);
    }

    public set(key : string, value : any){
        this.clear(key);
        this.newData[key] = value;
    }

    public clear(key : string){
        delete this.newData[key];
        delete this.oldData[key];
    }

    public get(key : string) : any | null{

        if(key in this.newData){
            return this.newData[key];
        }

        if(key in this.oldData){
            return this.oldData[key];
        }

        return null;

    }

    public all() : SessionContainer{
        return { ...this.oldData, ...this.newData }
    }

    public toJSON() : SessionContainer{
        return this.newData;
    }

    public clearAll(){
        this.oldData = {};
        this.newData = {};
    }

}