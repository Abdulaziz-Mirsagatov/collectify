"use client";

import { RegisterFormProps } from "./types";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema, RegisterSchemaType } from "@/schemas/register";
import { addUser, updateUser } from "@/services/actions/users";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { SingleImageDropzone } from "../../SingleImageDropzone";
import { useEdgeStore } from "@/app/edgestore";

const RegisterForm = ({ dict }: RegisterFormProps) => {
  const [registerError, setRegisterError] = useState<string>("");
  const [file, setFile] = useState<File | undefined>();
  const { edgestore } = useEdgeStore();
  const { replace } = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema),
  });
  const onSubmit: SubmitHandler<RegisterSchemaType> = async (
    data: RegisterSchemaType
  ) => {
    const res = await addUser(data);
    if (res.error === "User with this email already exists") {
      setRegisterError(dict.errors.emailExists);
    } else if (res.error === "User with this username already exists") {
      setRegisterError(dict.errors.usernameExists);
    } else {
      if (file) {
        const image = await edgestore.publicFiles.upload({ file });
        // you can run some server action or api here
        // to add the necessary data to your database
        await updateUser(res.id, { image: image.url });
      }
      setRegisterError("");
      reset();
      replace("login");
    }
  };

  return (
    <form className="grid gap-3" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input
          type="text"
          className={`input 
        ${errors.name ? "error" : ""}
        `}
          placeholder={dict.name}
          {...register("name")}
        />
        {errors.name && (
          <p className="text-warning-red text-sm mt-1">
            {dict.errors.nameInvalid}
          </p>
        )}
      </div>

      <div>
        <input
          type="text"
          className={`input ${errors.email ? "error" : ""}`}
          placeholder={dict.email}
          {...register("email")}
        />
        {errors.email && (
          <p className="text-warning-red text-sm mt-1">
            {dict.errors.emailInvalid}
          </p>
        )}
      </div>

      <div>
        <input
          type="text"
          className={`input ${errors.username ? "error" : ""}`}
          placeholder={dict.username}
          {...register("username")}
        />
        {errors.username && (
          <p className="text-warning-red text-sm mt-1">
            {dict.errors.usernameInvalid}
          </p>
        )}
      </div>

      <div>
        <input
          type="password"
          className={`input ${errors.password ? "error" : ""}`}
          placeholder={dict.password}
          {...register("password")}
        />
        {errors.password && errors.password.message === "too short" && (
          <p className="text-warning-red text-sm mt-1">
            {dict.errors.passwordInvalidLength}
          </p>
        )}
        {errors.password && errors.password.message === "invalid password" && (
          <p className="text-warning-red text-sm mt-1">
            {dict.errors.passwordInvalid}
          </p>
        )}
      </div>

      <div>
        <input
          type="password"
          className={`input ${errors.passwordMismatch ? "error" : ""}`}
          placeholder={dict.confirmPassword}
          {...register("confirmPassword")}
        />
        {errors.passwordMismatch && (
          <p className="text-warning-red text-sm mt-1">
            {dict.errors.passwordsNotMatch}
          </p>
        )}
        {registerError && (
          <p className="text-warning-red text-sm mt-1 text-center">
            {registerError}
          </p>
        )}
      </div>

      <div className="w-full grid justify-center">
        <SingleImageDropzone
          width={200}
          height={100}
          value={file}
          onChange={(file) => {
            setFile(file);
          }}
        />
      </div>

      <button
        type="submit"
        className={`button button-info mt-4 ${
          isSubmitting ? "submitting" : ""
        }`}
      >
        {dict.register}
      </button>
    </form>
  );
};

export default RegisterForm;
