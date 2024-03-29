import { USER_ROLES } from "@/constants/users";

export interface CredentialsInteface {
  username: string;
  password: string;
}

declare module "next-auth" {
  interface User {
    role: USER_ROLES;
    userId: string;
  }

  interface JWT {
    role: USER_ROLES;
    userId: string;
  }
}
