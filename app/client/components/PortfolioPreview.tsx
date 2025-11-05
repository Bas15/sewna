"use client";

import Image from "next/image";
import { Designer } from "../types/designer";
import Stack from "@/components/Stack";

interface PortfolioPreviewProps {
  designer: Designer | null;
  onClose: () => void;
}

export default function PortfolioPreview({
  designer,
  onClose,
}: PortfolioPreviewProps) {
  if (!designer) return null;

  // Temporary sample outfits for demo stack
  const sampleOutfits = [
    {
      id: 1,
      img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80",
    },
    {
      id: 2,
      img: "https://images.unsplash.com/photo-1544717302-de2939b7ef71?w=500&q=80",
    },
    {
      id: 3,
      img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=420",
    },
    {
      id: 4,
      img: "https://images.unsplash.com/photo-1663560455456-7c2fb0c8cfca?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=388",
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-8 w-11/12 md:w-2/3 lg:w-1/2 relative shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
        >
          ✕
        </button>

        {/* Designer Header */}
        <div className="flex flex-col md:flex-row items-center gap-5 mb-6">
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#00b67f]">
            <Image
              src={designer.image}
              alt={designer.name}
              width={96}
              height={96}
              className="object-cover w-full h-full"
            />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-[#00b67f]">
              {designer.name}
            </h2>
            <p className="text-gray-600">{designer.specialty}</p>
            <p className="text-sm text-gray-400 mt-1 italic">
              {designer.location || "Location not specified"}
            </p>
          </div>
        </div>

        {/* Stack Preview */}
        <div className="mb-6 flex justify-center">
          <Stack
            randomRotation
            sensitivity={180}
            sendToBackOnClick={false}
            cardDimensions={{ width: 180, height: 180 }}
            cardsData={sampleOutfits}
          />
        </div>

        {/* Waitlist Message */}
        <div className="text-center space-y-4">
          <p className="text-gray-600">
            Portfolio previews are currently in early access.
          </p>
          <p className="text-gray-500 italic">
            Join our waitlist to be notified when designer portfolios go live.
          </p>

          <a
            href="https://www.joinsewna.com/waitlist"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#00b67f] text-white px-6 py-2 rounded-full font-medium hover:bg-[#009e6f] transition"
          >
            Join the Waitlist
          </a>
        </div>
      </div>
    </div>
  );
}
