/////////////////////
// For route grouping
////////////////////
import {Route, RouteClosureArguments, RouteItem} from "./";

import {Redirect} from "../Http/Responses";
import {ExpressRequest, ExpressRequestParams} from "../Express/ExpressRequest";
import {Request, Controller, Response} from "../Http";
import {ExpressResponse} from "../Express/ExpressResponse";

export class RouteClosure
{

    protected options : RouteClosureArguments;
    protected parentRouteClosure : RouteClosure | null;

    constructor(options : RouteClosureArguments = {}, parentRouteClosure : RouteClosure | null = null) {
        this.options = options;
        this.parentRouteClosure = parentRouteClosure;
    }

    protected requestBinding(type : string, pattern : string, controller : typeof Controller, method : string) : RouteItem{

        let route = new RouteItem(pattern, this);

        route.setup(type, (req : ExpressRequest, res : ExpressResponse) => {

            let bindingParams : ExpressRequestParams = {};

            for(let name in req.params){

                let value : any = req.params[name];

                if(name in Route.$bindings){

                    value = Route.$bindings[name](value);

                    if(value instanceof Response){
                        return value;
                    }

                }

                bindingParams[name] = value;

            }

            return (new controller).execute(method, new Request(req, res, bindingParams));

            // $request.session.flushOnce();

        });

        return route;

    }

    public get(pattern : string, controller : typeof Controller, method : string) : RouteItem{
        return this.requestBinding('get', pattern, controller, method);
    }

    public post(pattern : string, controller : typeof Controller, method : string) : RouteItem{
        return this.requestBinding('post', pattern, controller, method);
    }

    public all(pattern : string, controller : typeof Controller, method : string) : RouteItem{
        return this.requestBinding('all', pattern, controller, method);
    }

    public redirect(pattern : string, to : string) : RouteItem
    {
        let route = new RouteItem(pattern, this);

        route.setup('all', (req : ExpressRequest) => {
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