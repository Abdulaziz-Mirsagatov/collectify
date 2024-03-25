import { USER_ROLES } from "@/constants/users";
import { Collection } from "@/types/env";
import { Session } from "next-auth";

export function hasEditAccess(session: Session | null, collection: Collection) {
  // logged in user is admin or the owner of the item
  return (
    session &&
    (session.user?.role === USER_ROLES.ADMIN ||
      session.user?.userId === collection.userId)
  );
}
