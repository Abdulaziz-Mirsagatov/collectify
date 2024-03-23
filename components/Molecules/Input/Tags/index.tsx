"use client";

import { useEffect, useRef, useState } from "react";
import { TagsInputProps } from "./types";
import TagButton from "@/components/Atoms/Button/Tag";
import { Tag } from "@/types/env";
import { getTags } from "@/services/actions/tags";

const TagsInput = ({ tags, setTags, dict }: TagsInputProps) => {
  const [newTag, setNewTag] = useState("");
  const [matchingTags, setMatchingTags] = useState<Tag[]>([]);
  const [selectedMatchingTag, setSelectedMatchingTag] = useState<number>();
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getTags(newTag).then((res) => {
      // filter out repeated tags, leave one
      const uniqueTags: Tag[] = [];
      res.forEach((tag) => {
        if (!uniqueTags.find((t) => t.name === tag.name)) uniqueTags.push(tag);
      });
      setMatchingTags(uniqueTags);
    });
  }, [newTag]);

  useEffect(() => {
    if (selectedMatchingTag === undefined) return;
    setNewTag(matchingTags[selectedMatchingTag].name);
  }, [selectedMatchingTag]);

  const appendTag = (tag: string) => {
    setTags((prev) => [...prev, tag]);
    setNewTag("");
  };

  const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newTag.length > 0) {
      e.preventDefault();
      appendTag(newTag);
    }
    // up and down keys
    else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (matchingTags.length === 0) return;
      setSelectedMatchingTag((prev) => {
        if (prev === undefined) return;
        return prev === 0 ? 0 : prev - 1;
      });
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (matchingTags.length === 0) return;
      setSelectedMatchingTag((prev) => {
        if (prev === matchingTags.length - 1) return prev;
        return prev !== undefined ? prev + 1 : 0;
      });
    }
  };

  const handleNewTag = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedMatchingTag(undefined);
    if (e.target.value.length >= 25) {
      appendTag(newTag);
      return;
    }
    setNewTag(e.target.value);
  };

  const removeTag = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    e.stopPropagation();
    setTags((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-w-60 w-full dark:bg-dark bg-light rounded-lg p-2 flex flex-wrap gap-1 select-none border dark:border-light-gray border-dark-gray">
      {tags.map((tag, i) => (
        <TagButton
          key={tag + i.toString()}
          name={tag}
          onClick={(e) => removeTag(e, i)}
        />
      ))}
      <div className="relative flex items-center px-1">
        <input
          type="text"
          placeholder={dict.component.input.tags.placeholder}
          className="bg-transparent border-none outline-none grow"
          ref={ref}
          value={newTag}
          onChange={handleNewTag}
          onKeyDown={handleTagInput}
        />
        {matchingTags.length > 0 && newTag && (
          <div className="absolute left-0 max-h-24 overflow-y-auto top-8 bg-light dark:bg-dark rounded-lg shadow-md">
            {matchingTags.map((tag, i) => (
              <p
                className={`px-4 py-1 cursor-pointer hover:bg-light-gray dark:hover:bg-dark-gray transition-colors ${
                  i === matchingTags.length - 1 ? "rounded-b-lg" : ""
                }
                ${i === 0 ? "rounded-t-lg" : ""}
                ${
                  selectedMatchingTag === i
                    ? "bg-light-gray dark:bg-dark-gray"
                    : ""
                }
                `}
                key={tag.id}
                onClick={() => appendTag(tag.name)}
              >
                {tag.name}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TagsInput;
