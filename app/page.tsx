"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const images = ["/hero5.webp","/hero2.webp", "/hero3.webp", "/hero4.webp"];

// "/hero_image.png", 

export default function Home() {
  const [current, setCurrent] = useState(0);

  // Auto-change hero image every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-linear-to-b from-white to-[#f9f7f4] text-black flex flex-col font-inter">
      {/* Navbar */}
      <header className="flex justify-between items-center px-8 py-6">
        <h1 className="text-3xl font-playfair font-bold tracking-tight">
          SEWNA
        </h1>
        <nav className="hidden md:flex space-x-8 text-sm font-medium">
          {["Home", "Designers", "Blog", "About"].map((item) => (
            <Link
              key={item}
              href="#"
              className="hover:text-[#00b67f] transition-colors"
            >
              {item}
            </Link>
          ))}
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-8 md:px-20 py-10 md:py-10">
        {/* Text Content */}
        <div className="max-w-xl space-y-6">
          <h2 className="text-4xl md:text-5xl font-playfair font-extrabold leading-tight">
            Discover your style with{" "}
            <span className="text-[#00b67f]">professional designers.</span>
          </h2>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed">
            Where creativity meets culture. Connect with independent designers
            to craft styles that reflect your true identity — elegant,
            confident, and authentically you.
          </p>

          <div className="flex space-x-4 pt-2">
            <Link
              href="/designer"
              className="px-6 py-3 border border-black rounded-full text-sm font-semibold hover:bg-black hover:text-white transition-all duration-300"
            >
              I am a Designer
            </Link>
            <Link
              href="/client"
              className="px-6 py-3 bg-[#00b67f] text-white rounded-full text-sm font-semibold hover:bg-[#009e6f] transition-all duration-300"
            >
              I need a Designer
            </Link>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="relative mt-10 md:mt-0 w-full md:w-[45%] aspect-4/5 rounded-3xl overflow-hidden shadow-xl">
          {images.map((src, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === current ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={src}
                alt={`Fashion inspiration ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-xs text-gray-500 py-6 border-t">
        © {new Date().getFullYear()} SEWNA. All rights reserved.
      </footer>
    </main>
  );
}
