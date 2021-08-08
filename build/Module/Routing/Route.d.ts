import { Controller } from "../Http/Controller";
import { RouteItem } from "./RouteItem";
import { RouteClosure } from "./RouteClosure";
import { RouteClosureArguments } from "./RouteClosureArguments";
export declare class Route {
    static bindings: {
        [key: string]: (value: string) => any;
    };
    static routes: {
        [key: string]: RouteItem;
    };
    static get(pattern: string, controller: typeof Controller, method: string): RouteItem;
    static post(pattern: string, controller: typeof Controller, method: string): RouteItem;
    static all(pattern: string, controller: typeof Controller, method: string): RouteItem;
    static group(options: RouteClosureArguments, fn: (route: RouteClosure) => void): void;
    static bind(keyword: string, fn: (value: string) => any): void;
    static redirect(pattern: string, to: string): void;
    static render(name: string, options?: {
        [key: string]: string;
    }): string;
}
