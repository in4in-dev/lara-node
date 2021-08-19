export interface Store{
    get(key : string) : any;
    clear(key : string) : void;
    set(key : string, value : any) : void;
    has(key : string) : boolean;
}