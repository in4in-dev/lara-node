import {Route} from "./Route";

export class Redirect
{

    public url : string;

    constructor(url : string) {
        this.url = url;
    }

    public static route(name : string, options : { [key:string] : string } = {}) : Redirect
    {
        return new Redirect(Route.render(name, options));
    }

    public static to(url : string) : Redirect
    {
        return new Redirect(url);
    }

}