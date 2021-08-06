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
///////////////////////////////////////////
// And more, u can bind route :param (only global) as here:
//
// For all urls contains :item, item will be replaced to getProductByCode return
//
// Route.bind('item', (value) => {
//      return getProductByCode(value)';
// })
//
///////////////////////////////////////////

import {App} from "./App";
import {Abort, HttpCodes} from "./Abort";
import {Middleware} from "./Middleware";
import {Redirect} from "./Redirect";
import {Controller} from "./Controller";

////////////////////////
// Route.group options
////////////////////////
interface RouteClosureArguments{
    prefix? : string,
    name? : string,
    middlewares? : string[]
}

type ConstructorClass = new () => Controller;

/////////////////////
// Just easy route
////////////////////
class RouteItem
{

    protected parent : RouteClosure | null = null;
    protected pattern : string;

    public constructor(pattern : string, parent : RouteClosure | null = null) {
        this.pattern = pattern;
        this.parent = parent;
    }

    public getRenderUrl(options : { [key:string] : string } = {}) : string {

        let url = this.getUrl();

        for(let k in options){
            url = url.replace(`:${k}`, options[k]);
        }

        return url;

    }

    protected getUrl() : string {

        let url = this.pattern;

        if(this.parent){
            url = this.parent.getPreventPath() + url;
        }

        return url;

    }

    protected getParentName() : string {

        if(this.parent){
            return this.parent.getPreventName();
        }

        return '';

    }

    protected getMiddlewares() : string[] {

        if(this.parent){
            return this.parent.getPreventMiddlewares();
        }

        return [];

    }

    public name(name : string)
    {
        Route.routes[this.getParentName() + name] = this;
    }

    public setup(
        type : string,
        callback : (req : any) => any
    ){

        let url = this.getUrl();
        let middlewares = this.getMiddlewares();

        App.$express[type](url, (req : any, res : any) => {

            let response: any;

            try{
                response = Middleware.use(middlewares) || callback(req);
            }catch(e) {
                response = new Abort(HttpCodes.SERVER_ERROR, (typeof e === 'object' ? e.message : e).toString());
            }

            if(response instanceof Abort) {
                res.status(response.status).send(response.message);
            }else if(response instanceof Redirect){
                res.redirect(response.url);
            }else{

                if(typeof response === 'object'){
                    res.json(response);
                }else{
                    res.send(response.toString());
                }

            }

            res.end();

        });

    }



}

/////////////////////
// For route grouping
////////////////////
class RouteClosure
{

    protected options : RouteClosureArguments;
    protected parentRouteClosure : RouteClosure | null;

    constructor(options : RouteClosureArguments = {}, parentRouteClosure : RouteClosure | null = null) {
        this.options = options;
        this.parentRouteClosure = parentRouteClosure;
    }

    protected requestBinding(type : string, pattern : string, controller : ConstructorClass, method : string) : RouteItem{

        let route = new RouteItem(pattern, this);

        route.setup(type, (req : any) => {
            return (new controller).execute(method, req);
        });

        return route;

    }

    public get(pattern : string, controller : ConstructorClass, method : string) : RouteItem{
        return this.requestBinding('get', pattern, controller, method);
    }

    public post(pattern : string, controller : ConstructorClass, method : string) : RouteItem{
        return this.requestBinding('post', pattern, controller, method);
    }

    public all(pattern : string, controller : ConstructorClass, method : string) : RouteItem{
        return this.requestBinding('all', pattern, controller, method);
    }

    public redirect(pattern : string, to : string) : RouteItem
    {
        let route = new RouteItem(pattern, this);

        route.setup('all', (req : any) => {
            return Redirect.to(to);
        });

        return route;

    }

    public group(options : RouteClosureArguments, fn : (route : RouteClosure) => void) : void
    {
        fn(new RouteClosure(options, this));
    }

    public getPreventPath() : string{

        let parent = this.parentRouteClosure
            ? this.parentRouteClosure.getPreventPath()
            : '';

        return parent + (this.options.prefix + '');

    }

    public getPreventMiddlewares() : string[]
    {

        let middlewares : string[] = this.options.middlewares || [];

        if(this.parentRouteClosure){
           middlewares.unshift(...this.parentRouteClosure.getPreventMiddlewares());
        }

        return middlewares;

    }

    public getPreventName() : string
    {

        let name = this.parentRouteClosure
            ? this.parentRouteClosure.getPreventName()
            : '';

        return name + (this.options.name + '');

    }

}


////////////////////
// Global interface
////////////////////
export class Route
{

    public static bindings : { [key:string] : (value : string) => any } = {};
    public static routes : { [key:string] : RouteItem } = {};

    public static get(pattern : string, controller : ConstructorClass, method : string) : RouteItem{
        return (new RouteClosure).get(pattern, controller, method);
    }

    public static post(pattern : string, controller : ConstructorClass, method : string) : RouteItem{
        return (new RouteClosure).post(pattern, controller, method);
    }

    public static all(pattern : string, controller : ConstructorClass, method : string) : RouteItem{
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