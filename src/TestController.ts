import {Controller} from "./Module/Controller";
import {Abort} from "./Module/Abort";
import {Redirect} from "./Module/Redirect";

export class TestController extends Controller{

    public redirect()
    {
        return Redirect.route('catalog.item.get', {
            item_id : 'red_test_1'
        });
    }

    public get(req : any)
    {
        return {'item' : req.params.item_id};
    }

    public index(req : any)
    {
        return 'All ok my friend';
    }

}