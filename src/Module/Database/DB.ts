import {Sequelize} from "sequelize";

export class DB{

    protected static connection : Sequelize | null = null;
    protected static REGISTRY_KEY = 'sequelize_connection';

    public static getConnection(){
        return this.connection;
    }

    public static async createConnection(
        host : string,
        user : string,
        password : string,
        database : string,
        dialect : any = 'mysql',
        options : { [key:string] : any } = {}
    ) : Promise<Sequelize> {

        let conn = new Sequelize(database, user, password, { host, dialect, ...options });
        await conn.authenticate();

        this.connection = conn;

        return conn;

    }

}