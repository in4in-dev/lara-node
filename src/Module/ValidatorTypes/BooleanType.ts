import {ValidatorArgumentsOptions, ValidatorType} from "../Validator";
import {Abort, HttpCodes} from "../Abort";

export class BooleanType extends ValidatorType{


    public validate(data : any) : boolean
    {
        return (data != false);
    }

}