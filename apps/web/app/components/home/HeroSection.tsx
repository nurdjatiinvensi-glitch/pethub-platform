"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import AppIcon from "../ui/AppIcon";

type Banner = {
  image: string;
  href: string;
  alt: string;
};

const banners: Banner[] = [
  {
    image: "/images/banners/FeedCare_ Hope in Every Meal.png",
    href: "/feedcare",
    alt: "Program FeedCare PetHub",
  },
  {
    image: "/images/banners/FeedCare_ Every Meal, Hope.png",
    href: "/#produk",
    alt: "Pilihan produk hewan peliharaan",
  },
  {
    image: "/images/banners/banner-3.jpg",
    href: "/#layanan",
    alt: "Layanan perawatan hewan",
  },
];

const AUTOPLAY_INTERVAL = 5000;

export default function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const showPrevious = useCallback(() => {
    setActiveIndex((current) =>
      current === 0 ? banners.length - 1 : current - 1,
    );
  }, []);

  const showNext = useCallback(() => {
    setActiveIndex((current) => (current + 1) % banners.length);
  }, []);

  useEffect(() => {
    if (isHovered || banners.length < 2) return;

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % banners.length);
    }, AUTOPLAY_INTERVAL);

    return () => window.clearInterval(interval);
  }, [isHovered]);

  return (
    <section
      aria-label="Banner promosi PetHub"
      className="group relative mb-6"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[2048/640] w-full overflow-hidden rounded-2xl bg-[#EEF7F1] shadow-[0_4px_18px_rgba(15,23,42,0.06)]">
        {banners.map((banner, index) => (
          <div
            key={banner.image}
            aria-hidden={index !== activeIndex}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === activeIndex ? "z-10 opacity-100" : "z-0 opacity-0"
            }`}
          >
            <Link
              href={banner.href}
              tabIndex={index === activeIndex ? 0 : -1}
              aria-label={banner.alt}
              className="absolute inset-0 block focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[#2F7D4A]"
            >
              <Image
                src={banner.image}
                alt={banner.alt}
                fill
                priority={index === 0}
                sizes="(max-width: 768px) 100vw, 90vw"
                className="object-cover"
              />
            </Link>
          </div>
        ))}

        {/* LAPISAN LEMBUT JIKA GAMBAR BELUM TERSEDIA */}
        <div className="pointer-events-none absolute inset-0 z-[5] bg-gradient-to-r from-[#173D2B]/10 via-transparent to-transparent" />

        {/* TOMBOL SEBELUMNYA */}
        {banners.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Banner sebelumnya"
              onClick={showPrevious}
              className="absolute left-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-gray-800 opacity-0 shadow-md transition-all duration-200 hover:scale-105 hover:bg-white focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-[#2F7D4A] group-hover:opacity-100 sm:left-4 sm:h-10 sm:w-10"
            >
              <AppIcon name="chevron-left" size={21} />
            </button>

            {/* TOMBOL BERIKUTNYA */}
            <button
              type="button"
              aria-label="Banner berikutnya"
              onClick={showNext}
              className="absolute right-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-gray-800 opacity-0 shadow-md transition-all duration-200 hover:scale-105 hover:bg-white focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-[#2F7D4A] group-hover:opacity-100 sm:right-4 sm:h-10 sm:w-10"
            >
              <AppIcon name="chevron-right" size={21} />
            </button>
          </>
        )}

        {/* DOT INDIKATOR */}
        {banners.length > 1 && (
          <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-black/10 px-2 py-1.5 backdrop-blur-sm sm:bottom-4">
            {banners.map((banner, index) => (
              <button
                key={banner.image}
                type="button"
                aria-label={`Tampilkan banner ${index + 1}`}
                aria-current={index === activeIndex ? "true" : undefined}
                onClick={() => setActiveIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? "w-6 bg-[#2F7D4A]"
                    : "w-2 bg-white shadow-sm hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
