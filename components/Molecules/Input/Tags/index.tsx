"use client";

import { useRef, useState } from "react";
import { TagsInputProps } from "./types";
import TagButton from "@/components/Atoms/Button/Tag";

const TagsInput = ({ tags, setTags, dict }: TagsInputProps) => {
  const [newTag, setNewTag] = useState("");
  const ref = useRef<HTMLInputElement>(null);

  const appendTag = () => {
    setTags((prev) => [...prev, newTag]);
    setNewTag("");
  };

  const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newTag.length > 0) {
      e.preventDefault();
      appendTag();
    }
  };

  const handleNewTag = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length >= 25) {
      appendTag();
      return;
    }
    setNewTag(e.target.value);
  };

  const removeTag = (index: number) => {
    setTags((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-w-60 w-full dark:bg-dark bg-light rounded-lg p-2 flex flex-wrap gap-1 select-none border dark:border-light-gray border-dark-gray">
      {tags.map((tag, i) => (
        <TagButton key={tag} name={tag} onClick={() => removeTag(i)} />
      ))}
      <input
        type="text"
        placeholder={dict.component.input.tags.placeholder}
        className="bg-transparent border-none outline-none grow"
        ref={ref}
        value={newTag}
        onChange={handleNewTag}
        onKeyDown={handleTagInput}
      />
    </div>
  );
};

export default TagsInput;
