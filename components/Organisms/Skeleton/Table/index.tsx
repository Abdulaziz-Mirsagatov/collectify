import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { TableSkeletonProps } from "./types";
import { SKELETON_BASE_COLOR } from "@/constants/skeleton";

const TableSkeleton = ({ numRows = 5 }: TableSkeletonProps) => {
  return (
    <div className="w-full grid gap-4">
      {[...Array(numRows)].map((_, index) => (
        <Skeleton
          key={index}
          height={80}
          baseColor={SKELETON_BASE_COLOR}
          borderRadius={10}
        />
      ))}
    </div>
  );
};

export default TableSkeleton;
