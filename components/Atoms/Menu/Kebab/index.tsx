"use client";

import { useState } from "react";
import Popover from "../../Popover";
import { Icon } from "@iconify/react";
import { KebabMenuProps } from "./types";

const KebabMenu = ({
  options,
  alignment = "right",
  outsideClickHandling = true,
}: KebabMenuProps) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  return (
    <Popover
      isOpen={isPopoverOpen}
      setIsOpen={setIsPopoverOpen}
      outsideClickHandling={outsideClickHandling}
      trigger={
        <button className="w-10 h-10 rounded-lg shadow-md cursor-pointer bg-light dark:bg-dark flex justify-center items-center">
          <Icon
            icon="charm:menu-kebab"
            className="text-xl text-dark dark:text-light"
          />
        </button>
      }
    >
      <div
        className={`absolute ${
          alignment === "right" ? "right-0" : "left-0"
        } shadow-md grid`}
      >
        {options.map((option, index) =>
          typeof option.label === "string" ? (
            <p
              key={index}
              onClick={async (e) => {
                e.stopPropagation();
                if (option.onClick) {
                  if (option.args) await option.onClick(...option.args);
                  else await option.onClick();
                  setIsPopoverOpen(false);
                }
              }}
              className={`text-center dark:bg-dark bg-light text-dark dark:text-light p-2 cursor-pointer hover:bg-light dark:hover:bg-dark-gray hover:text-dark dark:hover:text-light-gray
              ${index === options.length - 1 ? "rounded-b-md" : ""}
              ${index === 0 ? "rounded-t-md" : ""}
              `}
            >
              {option.label}
            </p>
          ) : (
            <div
              key={index}
              onClick={async () => {
                if (option.onClick) {
                  if (option.args) await option.onClick(...option.args);
                  else await option.onClick();
                  setIsPopoverOpen(false);
                }
              }}
            >
              {option.label}
            </div>
          )
        )}
      </div>
    </Popover>
  );
};

export default KebabMenu;
