import {SequelizeIndex} from "./Sequelize/SquelizeIndex";

export default class TableIndex{

    protected unique : boolean;
    protected name : string;
    protected fields : string[];

    constructor(fields : string[], unique : boolean = false, name : string = '') {
        this.unique = unique;
        this.name = name;
        this.fields = fields;
    }

    public toSequelize() : SequelizeIndex{

        let result : SequelizeIndex = {
            unique : this.unique,
            fields : this.fields
        };

        if(this.name){
            result.name = this.name;
        }

        return result;

    }


}