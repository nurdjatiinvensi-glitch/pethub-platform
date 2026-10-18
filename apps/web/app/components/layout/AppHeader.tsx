"use client";

import Link from "next/link";
import { useState } from "react";
import AppIcon from "../ui/AppIcon";
import PetHubLogo from "../ui/PetHubLogo";

export default function AppHeader() {
  const [isQrOpen, setIsQrOpen] = useState(false);

  return (
    <header className="relative z-40 shrink-0 bg-white shadow-[0_2px_10px_rgba(15,23,42,0.05)]">
      {/* BARIS 1: DOWNLOAD APLIKASI DAN TAUTAN */}
      <div className="relative z-20 flex h-9 items-center justify-between bg-[#F3F4F6] pr-4 sm:pr-6">
        <div
          className="relative h-full shrink-0"
          onMouseEnter={() => setIsQrOpen(true)}
          onMouseLeave={() => setIsQrOpen(false)}
        >
          <button
            type="button"
            aria-expanded={isQrOpen}
            aria-controls="pethub-app-download"
            onClick={() => setIsQrOpen((open) => !open)}
            className="flex h-full items-center gap-2 rounded-r-full bg-[#2F7D4A] px-3.5 text-xs font-semibold text-white transition-colors hover:bg-[#276A3F] sm:text-[13px]"
          >
            <AppIcon name="smartphone" size={16} />
            <span>Download aplikasi PetHub.id</span>
            <AppIcon name="chevron-right" size={14} />
          </button>

          {isQrOpen && (
            <div
              id="pethub-app-download"
              className="absolute left-0 top-full z-50 mt-2 w-[280px] max-w-[calc(100vw-24px)] rounded-2xl bg-white p-4 shadow-[0_8px_32px_rgba(0,0,0,0.14)]"
            >
              <div className="text-center">
                <h3 className="text-sm font-semibold text-gray-900">
                  Aplikasi PetHub.id
                </h3>
                <p className="mt-1.5 text-xs leading-5 text-gray-500">
                  Scan QR untuk mengakses aplikasi PetHub.id.
                </p>
              </div>

              <div className="mx-auto mt-3 flex aspect-square w-36 flex-col items-center justify-center rounded-xl bg-[#F8FAF9] text-center">
                <AppIcon name="smartphone" size={28} />
                <span className="mt-2 text-xs font-semibold text-[#2F7D4A]">
                  QR Code
                </span>
                <span className="mt-1 text-[11px] text-gray-500">
                  Segera tersedia
                </span>
              </div>

              <p className="mt-3 text-center text-[11px] leading-4 text-gray-400">
                Tautan unduhan tersedia setelah aplikasi diluncurkan.
              </p>
            </div>
          )}
        </div>

        <nav
          aria-label="Informasi PetHub"
          className="hidden items-center gap-5 text-xs text-gray-600 sm:flex"
        >
          <Link
            href="#tentang"
            className="transition-colors hover:text-[#2F7D4A]"
          >
            Tentang PetHub
          </Link>
          <Link
            href="/feedcare"
            className="transition-colors hover:text-[#2F7D4A]"
          >
            FeedCare
          </Link>
          <Link
            href="#bantuan"
            className="transition-colors hover:text-[#2F7D4A]"
          >
            Bantuan
          </Link>
        </nav>
      </div>

      {/* BARIS 2: LOGO, SEARCH, KERANJANG, NOTIFIKASI, AKUN */}
      <div className="flex min-h-[64px] items-center gap-3 px-4 sm:gap-4 sm:px-6">
        <div className="flex w-[150px] shrink-0 items-center lg:w-[202px]">
          <PetHubLogo href="/" iconSize={24} textSize="lg" />
        </div>

        <div className="min-w-0 flex-1">
          <label htmlFor="global-search" className="sr-only">
            Cari produk, layanan, atau artikel
          </label>

          <div className="flex h-10 items-center gap-3 rounded-full bg-gray-100/90 px-4 transition-colors focus-within:bg-white focus-within:ring-1 focus-within:ring-[#2F7D4A]/40 sm:px-5">
            <AppIcon name="search" size={18} />

            <input
              id="global-search"
              type="search"
              placeholder="Cari produk, layanan, atau artikel..."
              className="w-full min-w-0 bg-transparent text-[13px] text-gray-800 outline-none placeholder:text-gray-400"
            />
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <Link
            href="#keranjang"
            aria-label="Keranjang belanja"
            className="flex h-9 w-9 items-center justify-center rounded-full text-gray-600 transition-colors hover:bg-[#EEF7F1] hover:text-[#2F7D4A]"
          >
            <AppIcon name="shopping-cart" size={19} />
          </Link>

          <Link
            href="#notifikasi"
            aria-label="Notifikasi"
            className="relative flex h-9 w-9 items-center justify-center rounded-full text-gray-600 transition-colors hover:bg-[#EEF7F1] hover:text-[#2F7D4A]"
          >
            <AppIcon name="bell" size={19} />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full border-2 border-white bg-[#F28C28]" />
          </Link>

          <div className="mx-1 hidden h-7 w-px bg-gray-200 sm:block" />

          <Link
            href="/akun"
            className="flex items-center gap-2 rounded-full p-1 transition-colors hover:bg-gray-50"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#EEF7F1] text-[#2F7D4A]">
              <AppIcon name="user" size={18} />
            </span>

            <span className="hidden text-left xl:block">
              <span className="block text-[13px] font-semibold text-gray-800">
                Akun Saya
              </span>
              <span className="mt-0.5 block text-[11px] text-gray-400">
                Login / Daftar
              </span>
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
