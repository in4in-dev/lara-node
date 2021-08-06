import {ValidatorArgumentsOptions, ValidatorType} from "../Validator";
import {Abort, HttpCodes} from "../Abort";

interface NumberTypeOptions extends ValidatorArgumentsOptions{
    min? : number,
    max? : number
}

export class NumberType extends ValidatorType{


    public validate(data : any) : number
    {

        let options : NumberTypeOptions = this.options;
        let result = parseFloat(data) || 0;

        if(('min' in options) && result < options.min!){
            throw new Abort(HttpCodes.SERVER_ERROR, `Bad min for number`);
        }

        if(('max' in options) && result > options.max!){
            throw new Abort(HttpCodes.SERVER_ERROR, 'Bad max for number');
        }

        return result;

    }

}