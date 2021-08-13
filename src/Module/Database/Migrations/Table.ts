import {TableColumn} from "./TableColumn";
import {ColumnFactory} from "./ColumnFactory";
import {TableIndex} from "./TableIndex";

export type TableColumnsList = { [key:string] : TableColumn };
export type TableIndexList = { [key:string] : TableIndex }


export class Table extends ColumnFactory{

    protected name;

    protected columns : TableColumnsList;
    protected createdColumns : TableColumnsList = {};
    protected indexes : TableIndexList = {};

    constructor(name : string, columns : TableColumnsList = {}) {
        super();
        this.name = name;
        this.columns = columns;
    }

    protected createColumn(name : string, col : TableColumn) : TableColumn{
        this.createdColumns[name] = col;
        return col;
    }

    public create(){



    }

    public index(){



    }

    public unique(){

    }

    public primary(){

    }

}