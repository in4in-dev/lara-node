//////////////////////////////////////////////////////
// new Abort(404, 'Not found');
// new Abort(500, 'Something not working');
//////////////////////////////////////////////////////

import {Response} from "../Response";
import {ExpressResponse} from "../../Express/ExpressResponse";

export class Abort extends Response
{

    public status : number;
    public message : string;

    constructor(status : number, message : string = "") {
        super();
        this.status = status;
        this.message = message;
    }

    public answer(res : ExpressResponse){
        res.status(this.status);

        if(this.message){
            res.send(this.message);
        }
    }


}

