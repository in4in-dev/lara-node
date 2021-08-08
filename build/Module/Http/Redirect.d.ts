export declare class Redirect {
    url: string;
    constructor(url: string);
    static route(name: string, options?: {
        [key: string]: string;
    }): Redirect;
    static to(url: string): Redirect;
}
