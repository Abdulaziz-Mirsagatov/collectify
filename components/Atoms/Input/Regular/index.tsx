import { RegularInputProps } from "./types";

const RegularInput = ({ className, ...props }: RegularInputProps) => {
  return (
    <input
      className={`w-full p-2 rounded-md border border-dark ${className}`}
      {...props}
    />
  );
};

export default RegularInput;
