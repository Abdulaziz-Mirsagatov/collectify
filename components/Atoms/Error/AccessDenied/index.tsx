"use client";

import { Icon } from "@iconify/react";
import { AccessDeniedErrorProps } from "./types";

const AccessDeniedError = ({ dict }: AccessDeniedErrorProps) => {
  return (
    <div className="grow w-full h-full flex place-items-center">
      <div className="w-full flex items-center justify-center gap-2">
        <Icon icon="material-symbols:lock-outline" fontSize={40} />
        <h1 className="text-3xl font-bold text-center">
          {dict.global.accessDenied}
        </h1>
      </div>
    </div>
  );
};

export default AccessDeniedError;
