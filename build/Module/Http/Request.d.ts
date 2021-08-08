import { ExpressRequest, ExpressRequestCookies, ExpressRequestParams } from "../Express/ExpressRequest";
export declare class Request {
    protected $request: ExpressRequest;
    protected readonly isXhr: boolean;
    protected readonly isSecure: boolean;
    protected readonly ip: string;
    protected readonly baseUrl: string;
    protected readonly hostname: string;
    protected readonly originalUrl: string;
    protected readonly path: string;
    protected readonly protocol: string;
    constructor(req: ExpressRequest);
    get cookies(): ExpressRequestCookies;
    get ips(): string[];
    get subdomains(): string[];
    get params(): ExpressRequestParams;
    get(name?: string, def?: any): any;
    post(name?: string, def?: any): any;
    accepts(types: string | string[]): any;
}
