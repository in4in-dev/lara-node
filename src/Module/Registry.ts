//////////////////////////////
// Global box for u variables
//////////////////////////////
// Registry.set('var', database);
// Registry.get('var');
//////////////////////////////

export class Registry
{

    protected static dump : { [key:string] : any } = {};

    public static set(name : string, value : any){
        Registry.dump[name] = value;
    }

    public static get(name : string){
        return ('name' in Registry.dump) ? Registry.dump[name] : null;
    }

}