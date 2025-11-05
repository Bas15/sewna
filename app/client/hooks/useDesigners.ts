import { useState, useEffect } from "react";
import { Designer } from "../types/designer";

export const useDesigners = () => {
  const [designers, setDesigners] = useState<Designer[]>([]);

  useEffect(() => {
    // Mock designer data
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDesigners([
      {
        id: 1,
        name: "Amara Designs",
        specialty: "Bridal & Luxury Couture",
        location: "New york, USA",
        rating: 4.8,
        image:
          "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=500&q=80",
        categories: ["Bridal", "Evening", "Haute Couture"],
      },
      {
        id: 2,
        name: "Kweku Styles",
        specialty: "Men’s Traditional & Urban Fashion",
        location: "Accra, Ghana",
        rating: 4.6,
        image:
          "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=500&q=80",
        categories: ["Menswear", "Urban", "Casual"],
      },
      {
        id: 3,
        name: "Sade Atelier",
        specialty: "Casual & Streetwear",
        location: "Abuja, Nigeria",
        rating: 4.9,
        image:
          "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=500&q=80",
        categories: ["Streetwear", "Contemporary"],
      },
    ]);
  }, []);

  return { designers };
};
