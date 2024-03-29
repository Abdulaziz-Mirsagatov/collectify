"use client";

import RegularModal from "@/components/Organisms/Modal/Regular";
import { useState } from "react";
import { DeleteModalProps } from "./types";
import { useRouter } from "next/navigation";
import { useEdgeStore } from "@/app/edgestore";
import { signOut } from "@/auth";

const DeleteModal = ({
  type,
  name,
  dict,
  deleteHandler,
  id,
  redirectPath,
  imageUrl,
  userId,
  trigger = (
    <button className="button button-warning min-w-32">
      {dict.component.button.delete}
    </button>
  ),
}: DeleteModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { edgestore } = useEdgeStore();
  const router = useRouter();

  return (
    <RegularModal
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      title={`${dict.component.modal.delete.title} ${dict[type]}`}
      trigger={<div onClick={() => setIsModalOpen(true)}>{trigger}</div>}
    >
      <div className="w-full md:w-[400px] grid gap-8">
        <h1 className="text-center">
          {dict.component.modal.delete.message}{" "}
          <span className="font-bold">{name}?</span>
        </h1>

        <div className="grid grid-cols-2 justify-items-center gap-4">
          <button
            onClick={() => setIsModalOpen(false)}
            className="button dark:bg-dark bg-light dark:hover:bg-dark/70 hover:bg-light/70 w-full"
          >
            {dict.component.button.cancel}
          </button>
          <button
            onClick={async () => {
              await deleteHandler(id);
              if (imageUrl)
                await edgestore.publicFiles.delete({ url: imageUrl });
              if (id === userId) await signOut();
              if (redirectPath) router.push(redirectPath);
              setIsModalOpen(false);
            }}
            className="button button-warning w-full"
          >
            {dict.component.button.delete}
          </button>
        </div>
      </div>
    </RegularModal>
  );
};

export default DeleteModal;
