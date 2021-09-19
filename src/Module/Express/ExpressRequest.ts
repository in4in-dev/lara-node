import {Request} from "express";
import {SessionData} from "express-session";
import {FileArray} from 'express-fileupload';
import {JSONCookies} from 'cookie-parser';

export type ExpressRequest = Request;
export type ExpressRequestCookies = { [key:string] : string };
export type ExpressRequestParams = { [key:string] : any };

export type ExpressCookies = { [key:string] : string };
export type ExpressFiles = FileArray;
export interface ExpressSession extends SessionData {
    [key:string] : any
}

