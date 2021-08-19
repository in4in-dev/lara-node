import {Store} from "../Store";

export type SessionContainer = { [key:string] : any };

export interface SessionStore extends Store{
    all() : SessionContainer;
    toJSON() : SessionContainer;
}