import {Controller, Request} from "../Module/Http";
import {Redirect} from "../Module/Http/Responses";

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