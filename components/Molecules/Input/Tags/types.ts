export interface TagsInputProps {
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
  dict: Record<string, any>;
}
