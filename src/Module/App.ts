/////////////////////////////////////////////////////////////
//// App - is CORE. Use for start web-server
////
//// App.start(port)
/////////////////////////////////////////////////////////////

import {DB} from "./Database/DB";

import express from 'express';
import expressSession from 'express-session';
import fileUpload from 'express-fileupload';
import cookieParser from 'cookie-parser';
import {Sequelize} from "sequelize";

export class App{

    public static $express : any;

    public static initDatabase(
        host : string,
        user : string,
        password : string,
        database : string
    ) : Promise<Sequelize>{
        return DB.createConnection(host, user, password, database);
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

        app.use(cookieParser());

        app.use(express.urlencoded({
            extended: true
        }));

        app.use(fileUpload({
            uploadTimeout : 0
        }));

        app.listen(port);

        App.$express = app;

        return App;

    }

}