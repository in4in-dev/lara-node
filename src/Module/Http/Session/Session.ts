import {SessionContainer, SessionStore} from "./SessionStore";
import {DefaultSessionStore} from "./DefaultSessionStore";
import {TempSessionStore} from "./TempSessionStore";
import {ExpressSession} from "../../Express/ExpressSession";
import {ExpressRequest} from "../../Express/ExpressRequest";

export class Session{

    protected static TEMP_STORE = '$$_tempStore$$';
    protected static STORE = '$$_store$$';

    protected session : ExpressSession;

    protected store : SessionStore;
    protected tempStore : SessionStore;

    constructor(req : ExpressRequest) {
        this.session = req.session!;

        this.store = this.getStore();
        this.tempStore = this.getTempStore();

        //Update temp store
        this.saveStores();
    }

    protected getStore() : SessionStore{

        if(!(Session.STORE in this.session)){
            this.session[Session.STORE] = {};
        }

        return new DefaultSessionStore(this.session[Session.STORE]);
    }

    protected getTempStore() : SessionStore{

        if(!(Session.TEMP_STORE in this.session)){
            this.session[Session.TEMP_STORE] = {};
        }

        return new TempSessionStore(this.session[Session.TEMP_STORE]);

    }

    protected saveStores(){
        this.session[Session.STORE] = this.store.toJSON();
        this.session[Session.TEMP_STORE] = this.tempStore.toJSON();
    }

    public set(key : string, value : any){
        this.store.set(key, value);
        this.saveStores();
    }

    public once(key : string, value : any){
        this.tempStore.set(key, value);
        this.saveStores();
    }

    public has(key : string) : boolean{
        return this.store.has(key) || this.tempStore.has(key);
    }

    public get(key : string) : any | null {
        return this.store.get(key) || this.tempStore.get(key);
    }

    public all() : SessionContainer{
        return { ...this.store.all(), ...this.tempStore.all() }
    }

    public clear(key : string){
        this.store.clear(key);
        this.tempStore.clear(key);
        this.saveStores();
    }

}