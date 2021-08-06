import {ValidatorArgumentsOptions, ValidatorType} from "../Validator";
import {Abort, HttpCodes} from "../Abort";

interface ArrayTypeOptions extends ValidatorArgumentsOptions{
    min_length? : number,
    max_length? : number
}

export class ArrayType extends ValidatorType{


    public validate(data : any) : string[]
    {

        if(typeof data !== 'string'){
            throw new Abort(HttpCodes.SERVER_ERROR, 'Bad array');
        }


        let options : ArrayTypeOptions = this.options;
        let result = data ? data.split(",") : [];

        if(('min_length' in options) && result.length < options.min_length!){
            throw new Abort(HttpCodes.SERVER_ERROR, `Bad min_length for array`);
        }

        if(('max_length' in options) && result.length > options.max_length!){
            throw new Abort(HttpCodes.SERVER_ERROR, 'Bad max_length for array');
        }

        return data.split(",");

    }

}