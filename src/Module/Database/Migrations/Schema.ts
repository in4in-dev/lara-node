import {Table} from "./Table";

export class Schema{

    public static create(name : string, fn : (table : Table) => void){

        let table = new Table(name);

        fn(table);

        table.create();

    }

}