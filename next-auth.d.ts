import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      accountType: string;
      provider: string;
    } & DefaultSession["user"];
  }
  interface User extends DefaultUser {
    accountType: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    accountType: string;
    provider: string;
  }
}
