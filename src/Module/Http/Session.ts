import {ExpressRequest} from "../Express/ExpressRequest";
import {ExpressSession} from "../Express/ExpressSession";

type SessionStore = { [key:string] : any };

class TempSessionStorage{

    protected newData : SessionStore = {};
    protected oldData : SessionStore;

    constructor(values : SessionStore) {
        this.oldData = values;
    }

    public has(key : string){
        return (key in this.newData) || (key in this.oldData);
    }

    public set(key : string, value : any){
        this.clear(key);
        this.newData[key] = value;
    }

    public clear(key : string){
        delete this.newData[key];
        delete this.oldData[key];
    }

    public get(key : string){

        return key in this.newData
            ? this.newData[key]
            : (key in this.oldData
                ? this.oldData[key]
                : null
            );

    }

    public all(){
        return { ...this.oldData, ...this.newData }
    }

    toJSON(){
        return this.newData;
    }

}

export class Session{

    protected static TEMP_STORE = '$$_tempStore$$';
    protected static STORE = '$$_store$$';

    protected session : ExpressSession;

    protected store : SessionStore;
    protected tempStore : TempSessionStorage;

    constructor(req : ExpressRequest) {
        this.session = req.session!;

        this.store = this.getStore();
        this.tempStore = new TempSessionStorage(this.getTempStore());

        //Update temp
        this.saveStores();
    }

    protected getStore() : SessionStore{

        if(!(Session.STORE in this.session)){
            this.session[Session.STORE] = {};
        }

        return this.session[Session.STORE];
    }

    protected getTempStore() : SessionStore{

        if(!(Session.TEMP_STORE in this.session)){
            this.session[Session.TEMP_STORE] = {};
        }

        return this.session[Session.TEMP_STORE];

    }

    protected saveStores(){
        this.session[Session.STORE] = this.store;
        this.session[Session.TEMP_STORE] = this.tempStore;
    }

    public set(key : string, value : any){
        this.clear(key);
        this.store[key] = value;

        this.saveStores();
    }

    public once(key : string, value : any){
        this.clear(key);
        this.tempStore.set(key, value);

        this.saveStores();
    }

    public get(key : string) : any {

        if(key in this.store) {
            return this.store[key];
        }else if(this.tempStore.has(key)){
            return this.tempStore.get(key);
        }

        return null;

    }

    public all() : { [key:string] : any }{
        return { ...this.store, ...this.tempStore.all() }
    }

    public clear(key : string){
        delete this.store[key];
        this.tempStore.clear(key);

        this.saveStores();
    }

}