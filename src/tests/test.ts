import {App} from "../Module/App";
import {Middleware} from "../Module/Http/Middleware";
import {Abort, HttpCodes} from "../Module/Http/Abort";
import {Route} from "../Module/Routing/Route";
import {TestController} from "./TestController";

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