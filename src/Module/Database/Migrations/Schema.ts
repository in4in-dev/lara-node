import {Table} from "./Table";

export class Schema{

    public static async create(name : string, fn : (table : Table) => void){

        let table = new Table(name);

        fn(table);

        return await table.create();

    }

}