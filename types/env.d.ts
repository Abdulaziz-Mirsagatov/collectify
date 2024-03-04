import { USER_ROLES } from "@/constants/users";

export interface User {
  id: number;
  name: string;
  username?: string;
  password?: string;
  email: string;
  image?: string;
  role: USER_ROLES;
  createdAt: Date;
}

export interface Category {
  id: number;
  name: string;
}

export interface Collection {
  id: number;
  name: string;
  description?: string;
  topic: string;
  image?: string;
  userId: string;
  categoryId: number;
  createdAt: Date;
  updatedAt: Date;
}
