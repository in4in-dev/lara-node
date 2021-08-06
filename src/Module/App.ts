const express = require('express');

export class App{

    public static $express : any;

    public static start(port : number = 3000){

        let app = express();

        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));

        app.listen(port);

        App.$express = app;

        return App;

    }

}