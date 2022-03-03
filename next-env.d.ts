/// <reference types="next" />
/// <reference types="next/types/global" />
import {User} from './pages/api/v1/'
declare module "*.svg";
declare module "*.png";
type Post={
    id:string
    title:string
    date:string

}
declare module "iron-session" {
    interface IronSessionData {
        user?: {username:string,password:string};
    }
}
