import {Model, ModelCastFields, ModelFields} from "./Model";

type ModelItemFields = { [key:string] : string };
type ModelItemCastFields = { [key:string] : any }

export class ModelItem{

    protected model : typeof Model;
    protected originalFields : ModelItemFields;
    protected originalCastFields : ModelCastFields;

    protected fields : ModelItemFields;
    protected castFields : ModelItemCastFields;

    constructor(model : typeof Model, fields : ModelItemFields) {
        this.model = model;

        this.fields = {...fields};
        this.originalFields = {...fields};

        let casts = model.fieldsToCasts(fields);

        this.castFields = {...casts};
        this.originalCastFields = {...casts};
    }


}