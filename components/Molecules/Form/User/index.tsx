"use client";

import { useEffect, useState } from "react";
import { UserFormProps } from "./types";
import RegularModal from "@/components/Organisms/Modal/Regular";
import { getUser, updateUser } from "@/services/actions/users";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSchema, UserSchemaType } from "@/schemas/user";
import { SingleImageDropzone } from "@/components/Organisms/SingleImageDropzone";
import { imageUrlToFile } from "@/helpers/imageUrlToFile";
import { User } from "@/types/env";
import { useEdgeStore } from "@/app/edgestore";

const UserForm = ({ userId, lang, dict }: UserFormProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState<File>();
  const [serverError, setServerError] = useState<string>("");
  const [initialUsername, setInitialUsername] = useState<string>("");
  const { edgestore } = useEdgeStore();

  useEffect(() => {
    getUser(userId).then((user) => {
      reset(user);
      setInitialUsername(user.username ?? "");

      if (user.image) {
        imageUrlToFile(user.image, "user-image").then((file) => {
          if (file) setFile(file);
        });
      }
    });
  }, [userId, isModalOpen]);

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserSchemaType>({
    resolver: zodResolver(UserSchema),
  });

  const onSubmit = async (data: UserSchemaType) => {
    const userRes = await updateUser(userId, {
      ...data,
      username: data.username === initialUsername ? undefined : data.username,
    });
    if (Object.hasOwn(userRes, "error")) {
      setServerError(userRes.error);
      return;
    }
    const user = userRes as User;

    // reuploading image
    if (file && user.image) {
      const image = await edgestore.publicFiles.upload({
        file,
        options: {
          replaceTargetUrl: user.image,
        },
      });
      await updateUser(user.id, { image: image.url });
    } // deleting image
    else if (user.image) {
      await edgestore.publicFiles.delete({ url: user.image });
      await updateUser(user.id, { image: "" });
    } // uploading new image
    else if (file) {
      const image = await edgestore.publicFiles.upload({ file });
      await updateUser(user.id, { image: image.url });
    }

    setIsModalOpen(false);
  };

  return (
    <RegularModal
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      title={dict.component.form.user.edit}
      trigger={
        <button
          className={`button button-info min-w-32`}
          onClick={() => setIsModalOpen((prev) => !prev)}
        >
          {dict.component.button.edit}
        </button>
      }
    >
      <form
        className="w-[500px] p-2 grid gap-4 max-h-96 overflow-y-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <input
            type="text"
            className={`input 
        ${errors.name ? "error" : ""}
        `}
            placeholder={dict.page.register.name}
            {...register("name")}
          />
          {errors.name && (
            <p className="text-warning-red text-sm mt-1">
              {dict.page.register.errors.nameInvalid}
            </p>
          )}
        </div>

        <div>
          <input
            type="text"
            className={`input ${errors.username ? "error" : ""}`}
            placeholder={dict.page.register.username}
            {...register("username")}
          />
          {errors.username && (
            <p className="text-warning-red text-sm mt-1">
              {dict.page.register.errors.usernameInvalid}
            </p>
          )}
        </div>

        <div className="flex justify-center">
          <SingleImageDropzone
            width={200}
            height={100}
            value={file}
            onChange={(file) => {
              setFile(file);
            }}
          />
        </div>

        {serverError && (
          <p className="text-warning-red text-sm mt-1 text-center">
            {serverError}
          </p>
        )}

        <button
          className={`button button-info mt-4 ${
            isSubmitting ? "submitting" : ""
          }`}
        >
          {dict.component.button.edit}
        </button>
      </form>
    </RegularModal>
  );
};

export default UserForm;
