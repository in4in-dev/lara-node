export class ModelCollection{

    constructor() {

    }

    [Symbol.iterator] = function* () {

    }

}

class Where{
    constructor(d : string) {

    }

    public or(){

    }

    public and(){

    }

}

export class Model
{

    protected keyName : string = 'id';
    protected table : string = '';

    constructor() {
    }

    public find(id : any){
        return this.where(this.keyName, id);
    }

    public first(){

    }

    public get(){

    }

    public last(){

    }

    public all(){

    }

    public orderBy(field : string, type : string){
        return this;
    }

    public limit(limit : number){
        return this;
    }

    public where(field : string, value : any) : Model {
        return this;
    }

    public whereIn(field : string, values : any[]){
        return this;
    }

    public whereGroup(closure : (where : Where) => void){

        let where = new Where('OR');

        closure(where);

        //save

        return this;
    }


}