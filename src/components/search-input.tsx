"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";

export function SearchInput({ initialSearch = "" }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleSearch = useDebounce((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }
    startTransition(() => {
      router.replace(`/explore?${params.toString()}`);
    });
  }, 300);

  return (
    <Input
      className="max-w-sm"
      placeholder="Search restaurants..."
      defaultValue={initialSearch}
      onChange={(e) => handleSearch(e.target.value)}
      aria-label="Search restaurants"
    />
  );
}
