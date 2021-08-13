import {Sqlable} from "./Sqlable";

export abstract class TableIndex extends Sqlable{

    protected name : string;
    protected fields : string[];

    constructor(name : string, fields : string[]) {
        super();
        this.name = name;
        this.fields = fields;
    }

}