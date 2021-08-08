/////////////////////
// For route grouping
////////////////////
import {RouteClosureArguments} from "./RouteClosureArguments";
import {RouteItem} from "./RouteItem";
import {Redirect} from "../Http/Redirect";
import {Controller} from "../Http/Controller";
import {ExpressRequest} from "../Express/ExpressRequest";
import {Request} from "../Http/Request";

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

        route.setup(type, (req : ExpressRequest) => {
            return (new controller).execute(method, new Request(req));
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