import {Controller} from "../Module/Http/Controller";
import {Redirect} from "../Module/Http/Redirect";
import {Request} from "../Module/Http/Request";

export class TestController extends Controller{

    public redirect()
    {
        return Redirect.route('catalog.item.get', {
            item_id : 'red_test_1'
        });
    }

    public get(req : Request)
    {
        return {'item' : req.params.item_id};
    }

    public index(req : Request)
    {
        return 'All ok my friend';
    }

}