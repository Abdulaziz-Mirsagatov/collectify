import { SKELETON_BASE_COLOR } from "@/constants/skeleton";
import Skeleton from "react-loading-skeleton";

const CardSkeleton = () => {
  return (
    <Skeleton
      height={300}
      className="w-full max-w-[850px]"
      baseColor={SKELETON_BASE_COLOR}
      borderRadius={10}
    />
  );
};

export default CardSkeleton;
