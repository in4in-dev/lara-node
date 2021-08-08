import { RouteClosure } from "./RouteClosure";
import { ExpressRequest } from "../Express/ExpressRequest";
export declare class RouteItem {
    protected parent: RouteClosure | null;
    protected pattern: string;
    constructor(pattern: string, parent?: RouteClosure | null);
    getRenderUrl(options?: {
        [key: string]: string;
    }): string;
    protected getUrl(): string;
    protected getParentName(): string;
    protected getMiddlewares(): string[];
    name(name: string): void;
    setup(type: string, callback: (req: ExpressRequest) => any): void;
}
