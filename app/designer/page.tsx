"use client";

import { useState } from "react";
import Stack from "./Stack";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Outfit {
  id: number;
  name: string;
  img: string;
}

interface Category {
  id: number;
  title: string;
  outfits: Outfit[];
}

export default function DesignerPortfolio() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryName, setCategoryName] = useState("");
  const router = useRouter();

  // Add new category
  const handleAddCategory = () => {
    if (!categoryName.trim()) return;
    const newCategory: Category = {
      id: Date.now(),
      title: categoryName,
      outfits: [],
    };
    setCategories((prev) => [...prev, newCategory]);
    setCategoryName("");
  };

  // Add outfit to category
  const handleAddOutfit = (categoryId: number, newOutfit: Outfit) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId
          ? { ...cat, outfits: [...cat.outfits, newOutfit] }
          : cat
      )
    );
  };

  // Check if there’s at least one outfit across all categories
  const hasOutfit = categories.some((cat) => cat.outfits.length > 0);

  const handleCreatePortfolio = () => {
    router.push("https://www.joinsewna.com/login");
  };

  return (
    <main className="min-h-screen bg-linear-to-b from-white to-[#f9f7f4] text-black px-6 md:px-20 py-10 font-inter">
      <h1 className="text-4xl font-playfair font-bold mb-6">
        Set up your <span className="text-[#00b67f]">Portfolio</span>
      </h1>

      <p className="text-gray-600 mb-10 max-w-2xl">
        Create categories to organize your designs. Upload images and name each
        outfit to showcase your creative style.
      </p>

      {/* Add Category */}
      <div className="flex items-center space-x-4 mb-8">
        <input
          type="text"
          placeholder="Enter category name (e.g., Bridal Wear)"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-lg w-full focus:ring-2 focus:ring-[#00b67f] outline-none"
        />
        <button
          onClick={handleAddCategory}
          className="bg-[#00b67f] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#009e6f] transition"
        >
          Add
        </button>
      </div>

      {/* Category List */}
      <div className="space-y-10">
        {categories.length === 0 && (
          <p className="text-gray-500 text-center italic">
            No categories added yet. Start by adding your first one above.
          </p>
        )}

        {categories.map((cat) => (
          <div
            key={cat.id}
            className="border border-gray-200 rounded-2xl p-6 bg-white shadow-sm"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-[#00b67f]">
                {cat.title}
              </h2>
              <AddOutfitButton categoryId={cat.id} onAdd={handleAddOutfit} />
            </div>

            {/* Outfits Display */}
            {cat.outfits.length > 0 ? (
              <Stack
                key={cat.outfits.map((o) => o.id).join("-")}
                randomRotation={true}
                sensitivity={180}
                sendToBackOnClick={false}
                cardDimensions={{ width: 200, height: 200 }}
                cardsData={cat.outfits.map((o) => ({
                  id: o.id,
                  img: o.img,
                }))}
              />
            ) : (
              <p className="text-gray-500 italic">No outfits added yet.</p>
            )}
          </div>
        ))}
      </div>

      {/* Show "Create Portfolio" button only after at least one outfit */}
      {hasOutfit && (
        <div className="flex justify-center mt-16">
          <button
            onClick={handleCreatePortfolio}
            className="bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-[#00b67f] transition shadow-lg"
          >
            Create Portfolio
          </button>
        </div>
      )}
    </main>
  );
}

interface AddOutfitProps {
  categoryId: number;
  onAdd: (categoryId: number, outfit: Outfit) => void;
}

const AddOutfitButton = ({ categoryId, onAdd }: AddOutfitProps) => {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreview(event.target?.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = () => {
    if (!name || !preview) return;
    const newOutfit = { id: Date.now(), name, img: preview };
    onAdd(categoryId, newOutfit);

    // reset after save
    setName("");
    setPreview(null);
    setShowForm(false);
  };

  return (
    <div>
      <button
        onClick={() => setShowForm(!showForm)}
        className="text-sm font-medium border border-[#00b67f] text-[#00b67f] px-4 py-1.5 rounded-full hover:bg-[#00b67f] hover:text-white transition"
      >
        {showForm ? "Cancel" : "Add Outfit"}
      </button>

      {showForm && (
        <div className="mt-4 flex flex-col md:flex-row gap-3 items-start">
          <input
            type="text"
            placeholder="Outfit name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded-lg w-full md:w-1/3"
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="border border-gray-300 px-3 py-2 rounded-lg w-full md:w-1/3 cursor-pointer"
          />

          <button
            onClick={handleSubmit}
            className="bg-black text-white px-6 py-2 rounded-lg hover:bg-[#00b67f] transition"
          >
            Save
          </button>

          {preview && (
            <div className="mt-3 md:mt-0 w-20 h-20 rounded-lg overflow-hidden border border-gray-200">
              <Image
                src={preview}
                alt="Preview"
                width={80}
                height={80}
                className="object-cover w-full h-full"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
