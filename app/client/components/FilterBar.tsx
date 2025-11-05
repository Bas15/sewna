"use client";

import { useState } from "react";

interface FilterBarProps {
  onFilter: (query: string) => void;
}

export default function FilterBar({ onFilter }: FilterBarProps) {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onFilter(query.trim());
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-3 mb-10 bg-white p-5 rounded-xl shadow-sm border border-gray-200">
      <div className="flex flex-col w-full md:w-2/3">
        <input
          type="text"
          placeholder="Search for designers (e.g. Tolu Adedeji, Bridal Wear, Street Style)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#00b67f] outline-none transition"
        />
        <small className="text-gray-500 mt-2 text-sm">
          Tip: You can search by{" "}
          <span className="font-medium">designer name</span> or{" "}
          <span className="font-medium">category</span> such as “Bridal”,
          “Casual”, “Traditional”, or “Streetwear”.
        </small>
      </div>

      <button
        onClick={handleSearch}
        className="bg-[#00b67f] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#009e6f] transition w-full md:w-auto"
      >
        Search
      </button>
    </div>
  );
}
