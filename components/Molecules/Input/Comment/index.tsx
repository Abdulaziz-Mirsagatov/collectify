"use client";

import { useEffect, useRef, useState } from "react";
import { CommentInputProps } from "./types";
import { Comment } from "@/types/env";
import { useOutsideClick } from "@/hooks/useOutsideClick";

const MAX_COMMENT_LENGTH = 500;

const CommentInput = ({
  dict,
  itemId,
  user,
  userId,
  initialComment,
  isInputMode = false,
  onComment,
  onEditComment,
  onDeleteComment,
}: CommentInputProps) => {
  const [comment, setComment] = useState<Comment | undefined>(initialComment);
  const [inputMode, setInputMode] = useState<boolean>(isInputMode);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [focused, setFocused] = useState<boolean>(false);
  const [buttonAnimation, setButtonAnimation] = useState("animate-fade-in");
  const [charCount, setCharCount] = useState<number>(0);
  const [content, setContent] = useState<string>("");
  const [editControlsVisible, setEditControlsVisible] =
    useState<boolean>(false);
  const ref = useRef<HTMLTextAreaElement>(null);

  useOutsideClick(ref, () => {
    setButtonAnimation("animate-fade-out");
    new Promise((resolve) => setTimeout(resolve, 300)).then(() => {
      setFocused(false);
    });
  });

  useEffect(() => {
    if (initialComment) {
      setComment(initialComment);
      setContent(initialComment.content);
      setCharCount(initialComment.content.length);
    }
  }, [initialComment]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFocused(true);
    if (e.target.value.length > MAX_COMMENT_LENGTH) return;
    setContent(e.target.value);
    setCharCount(e.target.value.length);
  };

  const handleAddComment = async () => {
    if (!inputMode || !content || !userId) return;

    setDisabled(true);
    await onComment({
      content,
      itemId,
      userId,
    });
    setDisabled(false);
    setContent("");
    setCharCount(0);
  };

  const handleDeleteComment = async () => {
    if (!comment) return;

    setDisabled(true);
    await onDeleteComment(comment.id);
    setDisabled(false);
  };

  const getControls = () => {
    if (inputMode && focused)
      return (
        <button
          className={`button button-success w-full ${
            disabled ? "bg-light-gray dark:bg-dark-gray" : ""
          } ${buttonAnimation}`}
          disabled={disabled}
          onClick={handleAddComment}
        >
          {dict.component.button.comment}
        </button>
      );

    if (!inputMode)
      return (
        <div className="w-full h-10 flex flex-wrap justify-between items-center gap-2 px-2">
          <p className="text-dark-gray/70 dark:text-light-gray/70">
            {user?.username ?? user?.name}
          </p>
          {comment?.userId === userId && (
            <div
              className={`flex items-center gap-2 ${
                editControlsVisible ? "visible" : "invisible"
              }`}
            >
              <button
                className="px-2 py-1 bg-info-blue hover:bg-info-blue/70 cursor-pointer rounded-lg shadow-md text-sm transition-colors"
                disabled={disabled}
              >
                {dict.component.button.edit}
              </button>
              <button
                className="px-2 py-1 bg-warning-red hover:bg-warning-red/70 cursor-pointer rounded-lg shadow-md text-sm transition-colors"
                disabled={disabled}
                onClick={handleDeleteComment}
              >
                {dict.component.button.delete}
              </button>
            </div>
          )}
        </div>
      );

    return <div className="w-full h-10"></div>;
  };

  // Function to calculate the number of rows needed for the textarea
  const calculateRows = (text: string) => {
    const lineHeight = 20; // Adjust this value based on your font size and line height
    const minRows = 1; // Minimum number of rows
    const maxRows = 10; // Maximum number of rows
    const numRows = Math.min(Math.ceil(text.length / 100), maxRows); // Adjust the divisor as needed for your content
    return Math.max(numRows, minRows);
  };

  return (
    <div
      className={`w-full flex flex-col max-w-[850px] rounded-xl p-1 shadow-lg ${
        inputMode
          ? "border-2 border-light-gray dark:border-dark-gray min-h-48"
          : "bg-light-gray/30 dark:bg-dark-gray/30 min-h-min"
      }`}
      onMouseOver={() => setEditControlsVisible(true)}
      onMouseLeave={() => setEditControlsVisible(false)}
    >
      <textarea
        name="comment"
        id="comment"
        className={`w-full grow bg-transparent resize-none outline-none p-3 text-lg`}
        disabled={!inputMode}
        rows={calculateRows(content)}
        placeholder={
          !inputMode ? "Loading..." : dict.component.input.comment.placeholder
        }
        onFocus={() => {
          setButtonAnimation("animate-fade-in");
          setFocused(true);
        }}
        ref={ref}
        value={inputMode ? content : comment?.content}
        onChange={handleChange}
      />

      {inputMode && (
        <div className="w-full h-8 flex justify-end items-center">
          <small className="text-light/30">
            {charCount}/{MAX_COMMENT_LENGTH}
          </small>
        </div>
      )}
      {getControls()}
    </div>
  );
};

export default CommentInput;
