let { Sequelize } = require('sequelize');

import {Registry} from "../Registry";

export class DB{

    protected static REGISTRY_KEY = 'sequelize_connection';

    public static getConnection(){
        return Registry.get(DB.REGISTRY_KEY);
    }

    public static async connection(
        host : string,
        user : string,
        password : string,
        database : string,
        dialect = 'mysql'
    ) : Promise<boolean> {

        let conn = new Sequelize(database, user, password, { host, dialect });
        await conn.authenticate();

        Registry.set(DB.REGISTRY_KEY, conn);

        return true;

    }

}