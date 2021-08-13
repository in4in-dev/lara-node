import {TableColumn} from "../TableColumn";

export class Integer extends TableColumn{

    public length;

    constructor(name : string, length : number) {
        super(name);
        this.length = length;
    }

}