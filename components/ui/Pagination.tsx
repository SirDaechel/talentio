"use client";

import { createURL } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

type PaginationProps = {
  page: number;
  totalPages: number | undefined;
};

const Pagination = ({ page, totalPages }: PaginationProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageParam = new URLSearchParams(searchParams.toString());

  const [inputValue, setInputValue] = useState<string | number>("");

  // Go to previous page
  const prevPage = () => {
    // Decrement the page number
    const prevPage = page - 1;
    // Set the url param to the prevPage value
    pageParam.set("page", prevPage.toString());
    const url = createURL(pathname, pageParam);
    router.push(url);
  };

  // Go to next page
  const nextPage = () => {
    // Increment the page number
    const nextPage = page + 1;
    if (totalPages && nextPage <= totalPages) {
      // Set the url param to the nextPage value
      pageParam.set("page", nextPage.toString());
      const url = createURL(pathname, pageParam);
      router.push(url);
    }
  };

  // Paginate through pages from input
  const paginateOnInput = (e: FormEvent<HTMLFormElement>, value: string) => {
    e.preventDefault();
    // Set the url param to the value param
    pageParam.set("page", value);
    const url = createURL(pathname, pageParam);
    router.push(url);
  };

  // Set inputValue to page value when ever page changes
  useEffect(() => {
    setInputValue(page);
  }, [page]);

  return (
    <section className="w-full flex justify-end">
      <div className="flex items-center gap-3 mt-4">
        <button
          type="button"
          onClick={prevPage}
          style={{
            display: page === 1 ? "none" : "block",
          }}
        >
          Prev
        </button>
        <form onSubmit={(e) => paginateOnInput(e, inputValue as string)}>
          <input
            type="text"
            inputMode="numeric"
            className="w-[4rem] px-3 py-2 border border-gray-400 text-sm focus:border-[#272829] focus:transition focus:outline-none"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={page === totalPages || !totalPages}
          />
        </form>
        <button
          type="button"
          onClick={nextPage}
          style={{
            display:
              (totalPages && page === totalPages) || !totalPages
                ? "none"
                : "block",
          }}
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default Pagination;
