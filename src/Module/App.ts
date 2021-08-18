/////////////////////////////////////////////////////////////
//// App - is CORE. Use for start web-server
////
//// App.start(port)
/////////////////////////////////////////////////////////////

import {Session} from "./Http/Session";
import {DB} from "./Database/DB";

const express = require('express');

export class App{

    public static $express : any;

    public static initDatabase(
        host : string,
        user : string,
        password : string,
        database : string
    ) : Promise<boolean>{
        return DB.connection(host, user, password, database);
    }

    public static start(port : number = 3000){

        let app = express();

        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));

        app.listen(port);

        App.$express = app;

        return App;

    }

}