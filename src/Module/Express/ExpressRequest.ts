export type ExpressRequestCookies = { [key:string] : string };
export type ExpressRequestParams = { [key:string] : any };

export interface ExpressRequest{
    readonly baseUrl : string,
    readonly cookies : ExpressRequestCookies,
    readonly body : any,
    readonly hostname : string,
    readonly ip : string,
    readonly ips : string[],
    readonly originalUrl : string,
    readonly params : ExpressRequestParams,
    readonly path : string,
    readonly protocol : string,
    readonly query : ExpressRequestParams,
    readonly route : any,
    readonly secure : boolean,
    readonly signedCookies : ExpressRequestCookies,
    readonly subdomains : string[],
    readonly xhr : boolean,

    accepts(types : string | string[]) : any,
    get(field : string) : string | undefined,
    is(type : string) : boolean,
    acceptsCharsets(charset : string, ...args : any[]) : any,
    acceptsEncodings(encoding : string, ...args : any[]) : any,
    acceptsLanguages(lang : string, ...args : any[]) : any
}