"use client";

import { Icon } from "@iconify/react";
import { TagButtonProps } from "./types";

const TagButton = ({ name, onClick }: TagButtonProps) => {
  return (
    <div
      className="flex items-center gap-1 p-1 rounded-lg bg-light-gray dark:bg-dark-gray cursor-pointer"
      onClick={onClick}
    >
      <span>{name}</span>
      <Icon icon="ic:round-close" className="text-warning-red" />
    </div>
  );
};

export default TagButton;
