import {App} from "../Module/App";
import {Middleware, HttpCodes} from "../Module/Http";
import {Abort} from "../Module/Http/Responses";
import {Route} from "../Module/Routing";
import {TestController} from "./TestController";
import {Table} from "../Module/Database/Migrations/Table";

App.initDatabase('localhost', 'in4in', 'in4libjs', 'laranode');
App.start(3000);

Route.group({
    'prefix' : '/catalog',
    'name' : 'catalog'
},(route) => {

    route.get('/', TestController, 'index');

    route.group({
        'prefix' : '/:item_id',
        'name' : '.item'
    }, route => {

        route.redirect('/redirect', '/catalog/test');

        route.get('/', TestController, 'get').name('.get');

    });

});
