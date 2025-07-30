'use client';

import { useState } from "react";
import { textStyle } from "@/constants/text";
import cn from "@/utils/cn";
import Link from "next/link";
import ProjectList from "../projects/ProjectList";

export default function SearchPage() {
  const [query, setQuery] = useState("");

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div className="flex flex-col mb-20">
        <input 
          type="text" 
          title="query" 
          name="query" 
          id="search-query" 
          className={cn(
            textStyle({ size: "xxl", weight: "light" }),
            "w-full h-20 px-2 border-solid border-white border-b-1 focus:outline-none"
          )} 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {/* Pass the current query to ProjectList */}
        <ProjectList className="mx-8 mt-5" searchQuery={query} />
      </div>

      <Link href="/">
        <div className="fixed bottom-0 bg-black w-full py-5">
          <div className="flex justify-center">
            <p className={textStyle({ size: "md" })}>back</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
