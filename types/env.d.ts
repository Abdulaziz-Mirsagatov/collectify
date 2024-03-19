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
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
}

export interface Collection {
  id: string;
  name: string;
  description?: string;
  image?: string;
  userId: string;
  categoryId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Item {
  id: string;
  name: string;
  collectionId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CustomField {
  id: string;
  name: string;
  type: string;
  collectionId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Comment {
  id: string;
  content: string;
  userId: string;
  itemId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Like {
  id: string;
  userId: string;
  itemId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Tag {
  id: string;
  name: string;
  itemId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ErrorResponse {
  error: { message: string };
}
