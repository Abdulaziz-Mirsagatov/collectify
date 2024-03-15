"use client";

import RegularInput from "@/components/Atoms/Input/Regular";
import { LoginFormProps } from "./types";
import { useState } from "react";
import { login } from "@/services/actions/auth/login";

const LoginForm = ({ dict }: LoginFormProps) => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [invalidCredentials, setInvalidCredentials] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setInvalidCredentials(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await login(form, "/");
    } catch (error) {
      setInvalidCredentials(true);
    }
  };

  return (
    <form className="grid gap-3" onSubmit={handleSubmit}>
      <RegularInput
        type="text"
        placeholder={dict.username}
        name="username"
        value={form.username}
        onChange={handleChange}
        required
      />
      <RegularInput
        type="password"
        placeholder={dict.password}
        name="password"
        value={form.password}
        onChange={handleChange}
        required
      />
      {invalidCredentials && (
        <p className="text-warning-red text-sm text-center">
          {dict.invalidCredentials}
        </p>
      )}

      <button type="submit" className="button button-info mt-4">
        {dict.login}
      </button>
    </form>
  );
};

export default LoginForm;
