import {ExpressResponse} from "../Express/ExpressResponse";

export abstract class Response{
    public abstract answer(res : ExpressResponse) : void;
}