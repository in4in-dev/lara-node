/////////////////////////////////////////
// Like at Laravel
//
// Route.get
// Route.post
// Route.all
// Route.redirect
// Route.group({options}, (route) => {
//
//      route.get(...)
//      route.post(...)
//      route.redirect(...)
//      route.all(...)
//
//      route.group({options}, (route) => {
//          ...
//      });
// })
//
// Option can contains middleware list, url-prefix, name-prefix etc.
//
///////////////////////////////////////////
// Route-render example
//
// Route.get('/catalog/:item', ...).name('catalog-item');
//
// then u can get string url by item
//
// Route.render('catalog-item', { item : 'test' }) === '/catalog/test';
//
//////////////////////////////////////////
// And more, u can bind route :param (only global) as here:
//
// For all urls contains :item, item will be replaced to getProductByCode return
//
// Route.bind('item', (value) => {
//      return getProductByCode(value)';
// })
//
///////////////////////////////////////////

import {Abort, HttpCodes} from "../Http/Abort";
import {Controller} from "../Http/Controller";
import {RouteItem} from "./RouteItem";
import {RouteClosure} from "./RouteClosure";
import {RouteClosureArguments} from "./RouteClosureArguments";

////////////////////
// Global interface
////////////////////
export class Route
{

    public static bindings : { [key:string] : (value : string) => any } = {};
    public static routes : { [key:string] : RouteItem } = {};

    public static get(pattern : string, controller : typeof Controller, method : string) : RouteItem{
        return (new RouteClosure).get(pattern, controller, method);
    }

    public static post(pattern : string, controller : typeof Controller, method : string) : RouteItem{
        return (new RouteClosure).post(pattern, controller, method);
    }

    public static all(pattern : string, controller : typeof Controller, method : string) : RouteItem{
        return (new RouteClosure).all(pattern, controller, method);
    }

    public static group(options : RouteClosureArguments, fn : (route : RouteClosure) => void) : void{
        fn(new RouteClosure(options));
    }

    public static bind(keyword : string, fn : (value : string) => any) : void{
        Route.bindings[keyword] = fn;
    }

    public static redirect(pattern : string, to : string) : void{
        (new RouteClosure).redirect(pattern, to);
    }

    public static render(name : string, options : { [key:string] : string } = {}) : string
    {

        if(name in Route.routes){
            return Route.routes[name].getRenderUrl(options);
        }

        throw new Abort(HttpCodes.SERVER_ERROR, `Route "${name}" is not defined`);

    }

}