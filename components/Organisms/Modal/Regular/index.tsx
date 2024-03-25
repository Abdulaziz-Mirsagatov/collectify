"use client";

import { useEffect, useRef, useState } from "react";
import { RegularModalProps } from "./types";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { Icon } from "@iconify/react";

const RegularModal = ({
  isModalOpen,
  setIsModalOpen,
  children,
  title,
  trigger,
}: RegularModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalAnimation, setModalAnimation] = useState("");
  const [overlayAnimation, setOverlayAnimation] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick(ref, () => {
    setIsModalOpen(false);
  });

  useEffect(() => {
    if (isModalOpen) openModal();
    else closeModal();
  }, [isModalOpen]);

  const closeModal = () => {
    setModalAnimation("animate-modal-close");
    setOverlayAnimation("animate-fade-out");
    setTimeout(() => {
      setIsOpen(false);
    }, 300);
  };

  const openModal = () => {
    setModalAnimation("animate-modal-open");
    setOverlayAnimation("animate-fade-in");
    setIsOpen(true);
  };

  return (
    <>
      {trigger}

      {isOpen && (
        <>
          <div
            className={`fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-light-gray dark:bg-dark-gray min-w-48 min-h-48 w-4/5 md:w-auto rounded-xl z-30 shadow-lg p-4 ${modalAnimation}`}
            ref={ref}
          >
            <div className="flex justify-between items-center mb-4">
              <h1 className="font-bold text-2xl">{title}</h1>
              <Icon
                icon="mingcute:close-line"
                className="text-2xl cursor-pointer"
                onClick={() => setIsModalOpen(false)}
              />
            </div>
            {children}
          </div>
          <div
            className={`bg-black/80 z-20 fixed left-0 top-0 right-0 bottom-0 ${overlayAnimation}`}
          />
        </>
      )}
    </>
  );
};

export default RegularModal;
