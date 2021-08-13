import {Sqlable} from "./Sqlable";

export class TableColumn extends Sqlable{

    protected defaultValue : any;
    protected canBeNull : boolean = false;
    protected isUnsigned : boolean = false;

    public name : string;

    constructor(name : string) {
        super();
        this.name = name;
    }

    public default(value : any){
        this.defaultValue = value;
    }

    public nullable(){
        this.canBeNull = true;
    }

    public unsigned(){
        this.isUnsigned = true;
    }

    public toSql() : string{
        return '';
    }


}