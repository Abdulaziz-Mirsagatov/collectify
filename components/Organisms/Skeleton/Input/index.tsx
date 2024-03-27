import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { InputSkeletonProps } from "./types";

const InputSkeleton = ({ height = 40 }: InputSkeletonProps) => {
  return (
    <Skeleton
      height={height}
      className="w-full"
      baseColor={"#1a1a1a"}
      borderRadius={10}
    />
  );
};

export default InputSkeleton;
