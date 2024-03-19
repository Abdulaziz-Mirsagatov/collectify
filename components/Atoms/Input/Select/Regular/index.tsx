"use client";

import Popover from "@/components/Atoms/Popover";
import { RegularSelectInputProps } from "./types";
import { useState } from "react";
import { Icon } from "@iconify/react";

const RegularSelectInput = <T extends Record<string, any>>({
  selected,
  setSelected,
  options,
  labelKey,
  dict,
  dictKey,
}: RegularSelectInputProps<T>) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  return (
    <div className="min-w-32 w-full">
      <Popover
        isOpen={isPopoverOpen}
        setIsOpen={setIsPopoverOpen}
        trigger={
          <div className="border border-dark rounded-md shadow-md p-2 flex items-center">
            <p className="grow text-center">
              {dict[dictKey][selected[labelKey]]}
            </p>
            <Icon icon="raphael:arrowdown" />
          </div>
        }
      >
        <div className="grid bg-light dark:bg-dark rounded-md shadow-md">
          {options.map((option, i) => (
            <p
              key={option[labelKey]}
              className={`p-2 text-center hover:bg-light-gray dark:hover:bg-dark-gray cursor-pointer ${
                i === options.length - 1
                  ? "rounded-b-md"
                  : i === 0
                  ? "rounded-t-md"
                  : ""
              }
                    ${
                      option[labelKey] === selected[labelKey]
                        ? "bg-light-gray dark:bg-dark-gray"
                        : ""
                    }`}
              onClick={() => {
                setSelected(option);
                setIsPopoverOpen(false);
              }}
            >
              {dict[dictKey][option[labelKey]]}
            </p>
          ))}
        </div>
      </Popover>
    </div>
  );
};

export default RegularSelectInput;
