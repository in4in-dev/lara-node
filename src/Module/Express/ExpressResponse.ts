import {Response, CookieOptions} from "express";

export type ExpressResponse = Response;
export type ExpressCookieOptions = CookieOptions;
export type ExpressResponseLocals = { [key:string] : any };