"use client";

import Popover from "@/components/Atoms/Popover";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { LanguageSelectInputProps } from "./types";
import { Locale, i18n } from "@/i18n-config";

const locales = i18n.locales;

const LanguageSelectInput = <T extends Record<string, any>>({
  dict,
}: LanguageSelectInputProps<T>) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const pathname = usePathname();
  const pathSplitted = pathname.split("/");
  const locale = pathSplitted[1];

  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedLanguage =
    locales.find((lang) => lang === locale) || locales[0];

  const handleSelectLanguage = (lang: Locale) => {
    if (selectedLanguage === lang) return;
    const route = pathSplitted.slice(2).join("/");
    const params = new URLSearchParams(searchParams);
    router.push(`/${lang}/${route}?${params.toString()}`);
  };

  return (
    <div className="w-32">
      <Popover
        trigger={
          <div className="bg-light dark:bg-dark rounded-md shadow-md p-2 flex items-center">
            <p className="grow text-center">{dict[selectedLanguage]}</p>
            <Icon icon="raphael:arrowdown" />
          </div>
        }
        isOpen={isPopoverOpen}
        setIsOpen={setIsPopoverOpen}
      >
        <div className="grid bg-light dark:bg-dark rounded-md shadow-md">
          {locales.map((lang, i) => (
            <p
              key={lang}
              className={`p-2 text-center hover:bg-light-gray dark:hover:bg-dark-gray cursor-pointer ${
                i === locales.length - 1
                  ? "rounded-b-md"
                  : i === 0
                  ? "rounded-t-md"
                  : ""
              }
                ${
                  lang === selectedLanguage
                    ? "bg-light-gray dark:bg-dark-gray"
                    : ""
                }
              `}
              onClick={() => handleSelectLanguage(lang)}
            >
              {dict[lang]}
            </p>
          ))}
        </div>
      </Popover>
    </div>
  );
};

export default LanguageSelectInput;
