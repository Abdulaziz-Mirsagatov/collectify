import { useEffect, RefObject } from "react";

export const useOutsideClick = (
  ref: RefObject<HTMLElement>,
  callback: () => void
) => {
  useEffect(() => {
    const handleClickOrTouchOutside = (event: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClickOrTouchOutside);
    document.addEventListener("touchstart", handleClickOrTouchOutside);
    document.addEventListener("click", handleClickOrTouchOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOrTouchOutside);
      document.removeEventListener("touchstart", handleClickOrTouchOutside);
      document.removeEventListener("click", handleClickOrTouchOutside);
    };
  }, [ref, callback]);
};
