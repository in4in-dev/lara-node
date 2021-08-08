import { Controller } from "../Module/Http/Controller";
import { Redirect } from "../Module/Http/Redirect";
import { Request } from "../Module/Http/Request";
export declare class TestController extends Controller {
    redirect(): Redirect;
    get(req: Request): {
        item: any;
    };
    index(req: Request): string;
}
