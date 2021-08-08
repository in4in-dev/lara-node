import {ExpressResponse} from "../Express/ExpressResponse";

export interface Response{
    answer(res : ExpressResponse) : void;
}