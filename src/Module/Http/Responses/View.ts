import {Response} from "../";
import {ExpressResponse} from "../../Express/ExpressResponse";

interface ViewLocals{
    [key:string] : any
}

export class View extends Response{

    protected view : string;
    protected locals : ViewLocals;

    constructor(view : string, locals : ViewLocals) {
        super();

        this.view = view;
        this.locals = locals;

    }


    public answer(res: ExpressResponse) {
        res.render(this.view, this.locals);
    }
}