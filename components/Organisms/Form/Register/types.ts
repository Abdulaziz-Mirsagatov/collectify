export interface RegisterFormProps {
  dict: Record<string, any>;
}

export interface RegisterForm {
  name: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}
