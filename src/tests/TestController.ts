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

        let c = req.session.get('dickenson') || 1;

        console.log(c);
        console.log(req.session.get('dickenson' + (c - 1)));
        console.log(req.session.get('dickenson' + c));

        req.session.set('dickenson', c + 1);
        req.session.once('dickenson' + c, 223);

    }

}