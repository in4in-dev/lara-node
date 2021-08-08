import {Response} from "../Response";
import {ExpressResponse} from "../../Express/ExpressResponse";

export class Plain extends Response{

    protected value : string;

    constructor(value : any) {
        super();
        this.value = String(value);
    }

    public answer(res: ExpressResponse) {
        res.send(this.value);
    }

}