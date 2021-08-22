///////////////////////////////////////////
// You can return Redirect from controller
//
// new Redirect('/catalog');
//
// or just use
//
// Redirect.to('/catalog'); - redirect to url
//
// Redirect.route('catalog');
// Redirect.route('product', { id : 25 }); - redirect to route
////////////////////////////////////////////

import {Response} from "../Response";
import {Route} from "../../Routing";
import {ExpressResponse} from "../../Express/ExpressResponse";

export class Redirect extends Response
{

    public url : string;

    constructor(url : string) {
        super();
        this.url = url;
    }

    public answer(res: ExpressResponse) {
        res.redirect(this.url);
    }

    // public static back() : Redirect
    // {
    // }

    // public static action() : Redirect
    // {
    // }

    public static route(name : string, options : { [key:string] : string } = {}) : Redirect
    {
        return new Redirect(Route.render(name, options));
    }

    public static to(url : string) : Redirect
    {
        return new Redirect(url);
    }

}