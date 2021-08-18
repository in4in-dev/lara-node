export interface SquelizeColumn{
    type : any,
    allowNull : boolean,
    primaryKey : boolean,
    defaultValue? : any,
    unique? : string | boolean,
    index? : string | boolean,
    comment? : string
}