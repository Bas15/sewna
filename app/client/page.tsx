"use client";

import { useState } from "react";
import { useDesigners } from "./hooks/useDesigners";
import { Designer } from "./types/designer";
import FilterBar from "./components/FilterBar";
import DesignerCard from "./components/DesignerCard";
import PortfolioPreview from "./components/PortfolioPreview";
import { useRouter } from "next/navigation";

export default function ClientPage() {
  const router = useRouter();
  const { designers } = useDesigners();
  const [filtered, setFiltered] = useState(designers);
  const [selectedDesigner, setSelectedDesigner] = useState<Designer | null>(
    null
  );

  const handleFilter = (query: string) => {
    const lower = query.toLowerCase();
    const results = designers.filter(
      (d) =>
        d.name.toLowerCase().includes(lower) ||
        d.categories.some((cat) => cat.toLowerCase().includes(lower))
    );
    setFiltered(results);
  };

  return (
    <main className="min-h-screen bg-linear-to-b from-white to-[#f9f7f4] px-6 md:px-20 py-10 text-black font-inter">
      <button
        onClick={() => router.back()}
        className="mb-8 flex items-center text-[#00b67f] font-medium hover:text-[#009e6f] transition"
      >
        ← Back to Previous Page
      </button>
      <h1 className="text-4xl font-playfair font-bold mb-6">
        Find Your <span className="text-[#00b67f]">Perfect Designer</span>
      </h1>
      <p className="text-gray-600 mb-10 max-w-2xl">
        Browse talented fashion designers, explore their work, and find the
        perfect match for your next outfit.
      </p>

      <FilterBar onFilter={handleFilter} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((designer) => (
          <DesignerCard
            key={designer.id}
            designer={designer}
            onViewPortfolio={(d) => setSelectedDesigner(d)}
          />
        ))}
      </div>

      <PortfolioPreview
        designer={selectedDesigner}
        onClose={() => setSelectedDesigner(null)}
      />
    </main>
  );
}
