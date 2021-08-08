import { Request } from "./Request";
export declare class Controller {
    protected middlewares: never[];
    execute(method: string, req: Request): any;
}
