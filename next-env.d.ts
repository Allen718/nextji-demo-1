/// <reference types="next" />
/// <reference types="next/types/global" />
import { User } from "./pages/api/v1/";
declare module "*.svg";
declare module "*.png";
declare module "*.jpg";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
      username: string;
      password: string;
    };
  }
}
