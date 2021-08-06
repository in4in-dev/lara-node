import {Abort, HttpCodes} from "./Abort";

interface ValidatorArguments{
    0 : string,
    1 : ValidatorArgumentsOptions
}

type ValidatorTypeClass = new (options : ValidatorArgumentsOptions) => ValidatorType;

export interface ValidatorArgumentsOptions{
    required? : boolean,
    default? : any
}

export class ValidatorType{

    protected options : ValidatorArgumentsOptions;

    constructor(options : ValidatorArgumentsOptions) {
        this.options = options;
    }

    public validate(data : any) : any
    {
        return data;
    }

}


export class Validator{

    protected static validators : { [key:string] : ValidatorTypeClass } = {};

    public static create(name : string, type : ValidatorTypeClass){
        Validator.validators[name] = type;
    }

    public static make(data : any, settings : { [key:string] : ValidatorArguments }) : any{

        //required
        //default

    }

    public static use(data : any, type : string, options : ValidatorArgumentsOptions) : any{

        if(type in Validator.validators){

            let constructor : ValidatorTypeClass = Validator.validators[type];
            let validator : ValidatorType = new constructor(options);

            return validator.validate(data);

        }else{
            throw new Abort(HttpCodes.SERVER_ERROR, `Validator ${type} not found`);
        }

    }

}