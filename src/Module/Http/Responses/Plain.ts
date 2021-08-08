import {Response} from "../Response";
import {ExpressResponse} from "../../Express/ExpressResponse";

export class Plain implements Response{

    protected value : string;

    constructor(value : any) {
        this.value = String(value);
    }

    public answer(res: ExpressResponse) {
        res.send(this.value);
    }

}