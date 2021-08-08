export declare class Registry {
    protected static dump: {
        [key: string]: any;
    };
    static set(name: string, value: any): void;
    static get(name: string): any;
}
