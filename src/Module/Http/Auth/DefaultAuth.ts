import {Authentication} from "./Authentication";
import {Authenticable} from "./Authenticable";

export class DefaultAuth extends Authentication{

    public firstCheck(): Authenticable | null {

        if(this.$request.session.get('auth', false)){
            return null;
        }

        return null;

    }

    public loginByPwd(login : string, password : string) : boolean{
        this.auth(null);
        return this.isAuth;
    }

    public loginById(id : number) : boolean{
        this.auth(null);
        return this.isAuth;
    }

}