"use client";

import { LoginFormProps } from "./types";
import { useState } from "react";
import { login } from "@/services/actions/auth/login";

const LoginForm = ({ dict }: LoginFormProps) => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [invalidCredentials, setInvalidCredentials] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setInvalidCredentials(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSubmitting(true);
    try {
      await login(form, "/");
    } catch (error) {
      setInvalidCredentials(true);
    }
    setIsSubmitting(false);
  };

  return (
    <form className="grid gap-3" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder={dict.username}
        name="username"
        value={form.username}
        onChange={handleChange}
        className={`input ${invalidCredentials ? " error" : ""}`}
      />
      <div>
        <input
          type="password"
          placeholder={dict.password}
          name="password"
          value={form.password}
          onChange={handleChange}
          className={`input ${invalidCredentials ? "error" : ""}`}
        />
        {invalidCredentials && (
          <p className="text-warning-red text-sm text-center mt-1">
            {dict.invalidCredentials}
          </p>
        )}
      </div>

      <button
        type="submit"
        className={`button button-info mt-4
      ${isSubmitting ? "submitting" : ""}
      `}
      >
        {dict.login}
      </button>
    </form>
  );
};

export default LoginForm;
