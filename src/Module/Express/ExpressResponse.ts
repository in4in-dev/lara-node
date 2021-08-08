export type ExpressResponseLocals = { [key:string] : any };

export interface ExpressCookieOptions{
    domain? : string,
    encode? : (value : string) => {},
    expires? : Date,
    httpOnly? : boolean,
    maxAge? : number,
    path? : string,
    secure? : boolean,
    signed? : boolean,
    sameSite? : boolean | string,
    [propName: string]: any
}

export interface ExpressResponse{
    readonly headersSent : boolean,
    locals : ExpressResponseLocals,

    get(field : string) : any,
    sendStatus(status : number) : any,
    set(header : string, value : string) : any,
    status(status : number) : any,
    type(type : string) : any,
    vary(value : string) : any,
    send(data : any) : any,
    cookie(name : string, value : any, options : ExpressCookieOptions) : any,
    clearCookie(name : string, options : ExpressCookieOptions) : any,
    json(obj : any) : any,
    jsonp(obj : any) : any,
    location(path : string) : any,

    append(...args : any[]) : any,
    attachment(...args : any[]) : any,
    download(...args : any[]) : any,
    end(...args : any[]) : any,
    format(...args : any[]) : any,
    redirect(...args : any[]) : any,
    render(...args : any[]) : any,
    sendFile(...args : any[]) : any
}