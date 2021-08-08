import {Response} from "../Response";
import {ExpressResponse} from "../../Express/ExpressResponse";

export class Json implements Response{

    protected value : any;

    constructor(value : any) {
        this.value = value;
    }

    public answer(res: ExpressResponse) {
        res.json(this.value);
    }


}