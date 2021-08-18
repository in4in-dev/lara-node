import {col} from "sequelize";

let { Model } = require("sequelize");

import {Registry} from "../../Registry";
import {TableColumn} from "./TableColumn";
import Types from "./Types";
import {SquelizeColumn} from "./Sequelize/SquelizeColumn";
import {DB} from "../DB";

export type TableColumnsList = { [key:string] : TableColumn };


export class Table{

    protected name;

    protected columns : TableColumnsList;
    protected createdColumns : TableColumnsList = {};

    protected timestamped : boolean = false;

    constructor(name : string, columns : TableColumnsList = {}) {
        this.name = name;
        this.columns = columns;
    }

    public async create(){

        let columns : { [key:string] : SquelizeColumn } = {};

        for(let c in this.createdColumns){
            columns[c] = this.createdColumns[c].toSequelize();
        }

        let conn = DB.getConnection();

        conn.define(this.name, columns, { tableName : this.name });

        return await conn.sync();

    }

    public index(col : string | string[], name : string = '') : Table{

        if(col instanceof Array){
            col.forEach(c => this.index(c, name));
        }else{
            this.createdColumns[col]?.index(name);
        }

        return this;

    }

    public unique(col : string | string[], name : string = '') : Table{

        if(col instanceof Array){
            col.forEach(c => this.unique(c, name));
        }else{
            this.createdColumns[col]?.unique(name);
        }

        return this;

    }

    public timestamps(){
        this.timestamped = true;
    }

    public primary(col : string) : Table{
        this.createdColumns[col]?.primary();
        return this;
    }

    protected addColumn(name : string, type : any, ...args : any[]): TableColumn {

        let column = new TableColumn(name, type, args);
        this.createdColumns[name] = column;

        return column;

    }

    ///////

    public string(name : string, length : number = 255): TableColumn {
        return this.addColumn(name, Types.STRING, length);
    }

    public text(name : string): TableColumn {
        return this.addColumn(name, Types.TEXT);
    }

    public tinyText(name : string): TableColumn {
        return this.addColumn(name, Types.TINYTEXT);
    }

    public mediumText(name : string): TableColumn {
        return this.addColumn(name, Types.MEDIUMTEXT);
    }

    public longText(name : string): TableColumn {
        return this.addColumn(name, Types.LONGTEXT);
    }

    public bool(name : string): TableColumn {
        return this.addColumn(name, Types.BOOLEAN);
    }

    public tiny(name : string): TableColumn {
        return this.addColumn(name, Types.TINYINT);
    }

    public int(name: string, length: number = 11): TableColumn {
        return this.addColumn(name, Types.INTEGER, length);
    }

    public bigint(name : string, length : number = 11) : TableColumn{
        return this.addColumn(name, Types.BIGINT, length);
    }

    public float(name : string, ...args : number[]): TableColumn {
        return this.addColumn(name, Types.FLOAT, ...args);
    }

    public double(name : string, ...args : number[]): TableColumn {
        return this.addColumn(name, Types.DOUBLE, ...args);
    }

    public real(name : string, ...args : number[]): TableColumn {
        return this.addColumn(name, Types.REAL, ...args);
    }

    public decimal(name : string, ...args : number[]): TableColumn {
        return this.addColumn(name, Types.DECIMAL, ...args);
    }

    public date(name : string): TableColumn {
        return this.addColumn(name, Types.DATE);
    }

    public datetime(name : string): TableColumn {
        return this.addColumn(name, Types.DATETIME);
    }

    public blob(name : string): TableColumn {
        return this.addColumn(name, Types.BLOB);
    }

    public tinyBlob(name : string): TableColumn {
        return this.addColumn(name, Types.TINYBLOB);
    }

    public mediumBlob(name : string): TableColumn {
        return this.addColumn(name, Types.MEDIUMBLOB);
    }

    public longBlob(name : string): TableColumn {
        return this.addColumn(name, Types.LONGBLOB);
    }

    public enum(name : string, values : any[]): TableColumn {
        return this.addColumn(name, Types.ENUM, ...values);
    }

    public json(name : string): TableColumn {
        return this.addColumn(name, Types.JSON);
    }

}