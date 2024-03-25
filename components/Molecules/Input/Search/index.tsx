"use client";

import { Icon } from "@iconify/react";
import { SearchInputProps } from "./types";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const SearchInput = ({ dict }: SearchInputProps) => {
  const [search, setSearch] = useState("");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  useEffect(() => {
    const search = searchParams.get("search") ?? "";
    setSearch(search);
  }, []);

  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (!value) {
      params.delete("search");
      return replace(`${pathname}?${params.toString()}`);
    }

    params.set("search", value);
    replace(`${pathname}?${params.toString()}`);
  }, 500);

  return (
    <div className="w-full sm:w-96 flex items-center gap-2 rounded-lg shadow-md bg-light-gray dark:bg-dark-gray p-2">
      <Icon icon="tabler:search" className="text-xl" />
      <input
        type="text"
        name="search"
        id="search"
        className="bg-transparent focus:outline-none w-full"
        placeholder={`${dict.component.search.placeholder}...`}
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          handleSearch(e.target.value);
        }}
      />
    </div>
  );
};

export default SearchInput;
