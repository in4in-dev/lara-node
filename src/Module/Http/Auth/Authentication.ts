import {Authenticable} from "./Authenticable";
import {Request} from "../Request";

export abstract class Authentication{

    public user : Authenticable | null = null;
    protected $request : Request;

    public abstract firstCheck(): Authenticable | null;

    constructor(req : Request) {

        this.$request = req;

        this.auth(
            this.firstCheck()
        );

    }

    public auth(user : Authenticable | null){
        this.user = user;
    }

    public get isAuth(): boolean {
        return !!this.user;
    }

}