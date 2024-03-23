"use client";

import { useEffect, useRef, useState } from "react";

import { useOutsideClick } from "@/hooks/useOutsideClick";

import { PopoverInterface } from "./types";

const Popover = ({
  trigger,
  children,
  isOpen,
  setIsOpen,
  outsideClickHandling = true,
}: PopoverInterface) => {
  const [height, setHeight] = useState(0);
  const [modalAnimation, setModalAnimation] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(isOpen);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) setHeight(ref.current.clientHeight);
  }, [ref.current?.clientHeight]);

  useEffect(() => {
    if (isOpen) openModal();
    else closeModal();
  }, [isOpen]);

  const openModal = () => {
    setModalAnimation("animate-fade-in");
    setIsModalOpen(true);
  };
  const closeModal = async () => {
    setModalAnimation("animate-fade-out");
    await new Promise((resolve) => setTimeout(resolve, 300));
    setIsModalOpen(false);
  };

  useOutsideClick(ref, () => {
    if (outsideClickHandling) setIsOpen(false);
  });

  return (
    <div className="relative select-none" ref={ref}>
      <div
        className="cursor-pointer"
        onClick={() => (isModalOpen ? setIsOpen(false) : setIsOpen(true))}
      >
        {trigger}
      </div>
      <div
        className={`absolute w-full left-0 z-10 bg-freezing-white shadow-md rounded-lg ${modalAnimation}`}
        style={{ top: `${height + 5}px` }}
      >
        {isModalOpen && <>{children}</>}
      </div>
    </div>
  );
};

export default Popover;
