import { USER_ROLES } from "@/constants/users";

export interface User {
  id: string;
  name: string;
  username?: string;
  password?: string;
  email: string;
  image?: string;
  role: USER_ROLES;
  createdAt: Date;
}

export interface Category {
  id: string;
  name: string;
}

export interface Collection {
  id: string;
  name: string;
  description?: string;
  topic: string;
  image?: string;
  userId: string;
  categoryId: string;
  createdAt: Date;
  updatedAt: Date;
}
