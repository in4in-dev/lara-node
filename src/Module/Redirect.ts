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