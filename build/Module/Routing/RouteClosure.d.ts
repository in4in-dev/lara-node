import { RouteClosureArguments } from "./RouteClosureArguments";
import { RouteItem } from "./RouteItem";
import { Controller } from "../Http/Controller";
export declare class RouteClosure {
    protected options: RouteClosureArguments;
    protected parentRouteClosure: RouteClosure | null;
    constructor(options?: RouteClosureArguments, parentRouteClosure?: RouteClosure | null);
    protected requestBinding(type: string, pattern: string, controller: typeof Controller, method: string): RouteItem;
    get(pattern: string, controller: typeof Controller, method: string): RouteItem;
    post(pattern: string, controller: typeof Controller, method: string): RouteItem;
    all(pattern: string, controller: typeof Controller, method: string): RouteItem;
    redirect(pattern: string, to: string): RouteItem;
    group(options: RouteClosureArguments, fn: (route: RouteClosure) => void): void;
    getPreventPath(): string;
    getPreventMiddlewares(): string[];
    getPreventName(): string;
}
