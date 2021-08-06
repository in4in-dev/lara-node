import {ValidatorArgumentsOptions, ValidatorType} from "../Validator";
import {Abort, HttpCodes} from "../Abort";

interface StringTypeOptions extends ValidatorArgumentsOptions{
    min_length? : number,
    max_length? : number
}

export class StringType extends ValidatorType{


    public validate(data : any) : string
    {

        let options : StringTypeOptions = this.options;
        let result = data.toString();

        if(('min_length' in options) && result.length < options.min_length!){
            throw new Abort(HttpCodes.SERVER_ERROR, `Bad min_length for string`);
        }

        if(('max_length' in options) && result.length > options.max_length!){
            throw new Abort(HttpCodes.SERVER_ERROR, 'Bad max_length for string');
        }

        return result;

    }

}