import {TableColumn} from "./TableColumn";
import {Varchar} from "./ColumnTypes/Varchar";
import {Integer} from "./ColumnTypes/Integer";

export abstract class ColumnFactory{

    protected abstract createColumn(name : string, col : TableColumn) : TableColumn;

    public varchar(name : string, length : number = 255) : TableColumn{

        return this.createColumn(name,
            new Varchar(name, length)
        );

    }

    public integer(name : string, length : number = 11) : TableColumn{

        return this.createColumn(name,
            new Integer(name, length)
        );

    }



}