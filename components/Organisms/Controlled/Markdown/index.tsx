"use client";

import Markdown from "react-markdown";
import { ControlledMarkdownProps } from "./types";
import { useEffect, useState } from "react";

const ControlledMarkdown = ({ content }: ControlledMarkdownProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return <Markdown className={"markdown"}>{content}</Markdown>;
};

export default ControlledMarkdown;
