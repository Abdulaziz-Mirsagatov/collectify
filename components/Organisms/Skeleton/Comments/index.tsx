import Skeleton from "react-loading-skeleton";
import { CommentsSkeletonProps } from "./types";
import "react-loading-skeleton/dist/skeleton.css";
import { SKELETON_BASE_COLOR } from "@/constants/skeleton";

const CommentsSkeleton = ({ numComments, dict }: CommentsSkeletonProps) => {
  return (
    <div className="grid gap-4">
      <h1 className="text-3xl">{dict.component.container.comments.title}</h1>
      {[...Array(numComments)].map((_, index) => (
        <Skeleton
          key={index}
          height={200}
          className="w-full max-w-[850px]"
          baseColor={SKELETON_BASE_COLOR}
          borderRadius={10}
        />
      ))}
    </div>
  );
};

export default CommentsSkeleton;
