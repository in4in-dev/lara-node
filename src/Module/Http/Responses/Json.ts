import {Response} from "../Response";
import {ExpressResponse} from "../../Express/ExpressResponse";

export class Json extends Response{

    protected value : any;

    constructor(value : any) {
        super();
        this.value = value;
    }

    public answer(res: ExpressResponse) {
        res.json(this.value);
    }


}