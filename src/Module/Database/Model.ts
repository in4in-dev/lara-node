import {Cast} from "./Cast";

export type ModelCasts = { [key:string] : typeof Cast };
export type ModelFields = { [key:string] : string };
export type ModelCastFields = { [key:string] : any }

export class Model{

    protected static table : string = '';
    protected static key : string = 'id';

    protected static fillable : string[]  = [];
    protected static hidden : string[] = [];
    protected static casts : ModelCasts = {};

    public static fieldsToCasts(fields : ModelFields) : ModelCastFields{

        let result : ModelCastFields = {};

        for(let name in fields){

            result[name] = (name in this.casts)
                ? this.casts[name].from(fields[name])
                : fields[name];

        }

        return result;

    }

    public static castsToFields(casts : ModelCastFields) : ModelFields{

        let result : ModelFields = {};

        for(let name in casts){
            result[name] = (name in this.casts)
                ? this.casts[name].to(casts[name])
                : casts[name].toString();
        }

        return result;


    }

}