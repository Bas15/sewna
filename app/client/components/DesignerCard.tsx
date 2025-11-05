import Image from "next/image";
import { Designer } from "../types/designer";
import { Star } from "lucide-react";

interface DesignerCardProps {
  designer: Designer;
  onViewPortfolio: (designer: Designer) => void;
}

export default function DesignerCard({
  designer,
  onViewPortfolio,
}: DesignerCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden">
      <Image
        src={designer.image}
        alt={designer.name}
        width={400}
        height={300}
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-[#00b67f]">
          {designer.name}
        </h3>
        <p className="text-gray-600 text-sm mt-1">{designer.specialty}</p>
        <p className="text-gray-500 text-xs mt-1">{designer.location}</p>

        <div className="flex items-center mt-2 text-sm text-yellow-500">
          <Star size={16} fill="currentColor" className="mr-1" />
          {designer.rating.toFixed(1)} / 5
        </div>

        <div className="flex flex-wrap gap-2 mt-3">
          {designer.categories.map((cat) => (
            <span
              key={cat}
              className="bg-[#e7f9f3] text-[#00b67f] text-xs px-3 py-1 rounded-full"
            >
              {cat}
            </span>
          ))}
        </div>

        <button
          onClick={() => onViewPortfolio(designer)}
          className="mt-4 w-full bg-black text-white py-2 rounded-lg hover:bg-[#00b67f] transition"
        >
          View Portfolio
        </button>
      </div>
    </div>
  );
}
