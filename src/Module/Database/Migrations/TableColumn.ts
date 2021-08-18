import {SquelizeColumn} from "./Sequelize/SquelizeColumn";

export class TableColumn{

    protected canBeNull : boolean = false;
    protected autoIncrement : boolean = false;
    protected primaryKey : boolean = false;
    protected defaultValue : any = null;
    protected commentText : string = '';

    public name : string;
    public type : any;

    constructor(name : string, type : any, params : any[]) {
        this.name = name;
        this.type = (params.length ? type(...params) : type);
    }

    public comment(text : string){
        this.commentText = text;
    }

    public default(value : any) : TableColumn{
        this.defaultValue = value;
        return this;
    }

    public nullable() : TableColumn{
        this.canBeNull = true;
        return this;
    }

    public AI() : TableColumn{
        this.autoIncrement = true;
        return this;
    }

    public primary(autoIncrement : boolean = false) : TableColumn{
        this.primaryKey = true;
        this.autoIncrement = autoIncrement;
        return this;
    }

    public toSequelize() : SquelizeColumn{

        let result : SquelizeColumn  = {
            'type' : this.type,
            'allowNull' : this.canBeNull,
            'primaryKey' : this.primaryKey,
            'autoIncrement' : this.autoIncrement
        };

        if(this.defaultValue){
            result.defaultValue = this.defaultValue;
        }

        if(this.commentText){
            result.comment = this.commentText;
        }

        return result;

    }

}