import {App} from "../Module/App";
import {Middleware, HttpCodes} from "../Module/Http";
import {Abort} from "../Module/Http/Responses";
import {Route} from "../Module/Routing";
import {TestController} from "./TestController";
import {Table} from "../Module/Database/Migrations/Table";

App.start(3000);

Middleware.create('test', () => {
    return false;
});

Middleware.create('test2', () => {
    return new Abort(HttpCodes.SERVER_ERROR, 'Error middleware');
});

Route.group({
    'prefix' : '/catalog',
    'middlewares' : ['test'],
    'name' : 'catalog'
},(route) => {

    route.get('/', TestController, 'index');

    route.group({
        'prefix' : '/:item_id',
        'name' : '.item',
        'middlewares' : ['test2']
    }, route => {

        route.redirect('/redirect', '/catalog/test');

        route.get('/', TestController, 'get').name('.get');

    });

});


Table.create('users', (table : Table) => {

    table.varchar('username');
    table.integer('balance', 10);

});

