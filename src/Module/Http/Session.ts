import {ExpressResponse} from "../Express/ExpressResponse";

interface SystemOnceStorage{
    [key:string] : any
}

export class Session{

    public static readonly USER_SYSTEM_STORAGE = 'system';
    public static readonly USER_ONCE_STORAGE = 'system_once';

    protected systemOnceStorage : SystemOnceStorage;

    constructor(res : ExpressResponse) {
        this.systemOnceStorage = this.get(Session.USER_ONCE_STORAGE, true);
    }

    public set(key : string, value : any) : void{

        if(typeof value === 'object'){
            return this.set(key, JSON.stringify(value));
        }

        value = String(value);

        //set

    }

    public setOnce(key : string, value : any){
        this.systemOnceStorage[key] = value;
        this.set(Session.USER_ONCE_STORAGE, this.systemOnceStorage);
    }

    public has(key : string) : boolean{
        //has
        return false;
    }

    public get(key : string, isJson : boolean = false) : any {

        if(this.has(key)){
            //get
        }

        return null;

    }

    public flushOnce(){
        this.systemOnceStorage = {};
        this.set(Session.USER_ONCE_STORAGE, this.systemOnceStorage);
    }

}