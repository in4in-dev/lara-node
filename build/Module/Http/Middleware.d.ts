export declare class Middleware {
    protected static dump: {
        [key: string]: (...args: any[]) => any;
    };
    static create(name: string, fn: (...args: any[]) => any): void;
    static use(names: string[], ...args: any[]): any;
}
