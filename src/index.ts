import {App} from "./Module/App";
import {Route} from "./Module/Route";
import {Middleware} from "./Module/Middleware";
import {TestController} from "./TestController";
import {Abort, HttpCodes} from "./Module/Abort";

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
},route => {

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