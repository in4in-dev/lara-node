/////////////////////////////////////////////////////////////
//// App - is CORE. Use for start web-server
////
//// App.start(port)
/////////////////////////////////////////////////////////////

import {DB} from "./Database/DB";

const express = require('express');
const expressSession = require('express-session');

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
        app.use(expressSession({
            secret : 'laranode',
            resave : true,
            saveUninitialized : true,
            cookie: { maxAge: 60000 }
        }));
        app.use(express.urlencoded({ extended: true }));

        app.listen(port);

        App.$express = app;

        return App;

    }

}