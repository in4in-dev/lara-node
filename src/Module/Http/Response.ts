import {ExpressResponse} from "../Express/ExpressResponse";
import {Session} from "./Session";

interface QueueList{
    [index:number] : (res : ExpressResponse) => void
}

export abstract class Response{

    public abstract answer(res : ExpressResponse) : void;

    public with(key : string, value : any){
        // Session.set(key, value);
    }

    public withInput(){
        //
    }

}