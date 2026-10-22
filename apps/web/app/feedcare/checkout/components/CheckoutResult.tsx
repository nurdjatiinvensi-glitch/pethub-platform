import Image from "next/image";
import Link from "next/link";

import type {
  ContributorType,
  FeedCareOrder,
  FeedCarePackage,
} from "../lib/feedcare-checkout";
import { formatRupiah } from "../lib/feedcare-checkout";

type Props = {
  selectedPackage: FeedCarePackage;
  fullName: string;
  contributorType: ContributorType;
  order: FeedCareOrder;
};

export default function CheckoutResult({
  selectedPackage,
  fullName,
  contributorType,
  order,
}: Props) {
  return (
    <div className="min-h-full bg-[#F8FAF9] px-5 py-10 sm:px-8 lg:py-14">
      <div className="mx-auto max-w-3xl space-y-6">
        <section className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-9">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-50 text-[#2F7D4A]">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-7 w-7"
            >
              <path
                d="m5 12 4 4L19 6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <p className="mt-5 text-center text-xs font-bold uppercase tracking-wider text-[#2F7D4A]">
            Pesanan berhasil dibuat
          </p>
          <h1 className="mt-2 text-center text-2xl font-bold text-gray-900">
            Selesaikan Pembayaran
          </h1>
          <p className="mt-3 text-center text-sm leading-6 text-gray-500">
            Pindai QRIS PetHub.id menggunakan aplikasi pembayaran yang mendukung
            QRIS, lalu bayar sesuai nominal tagihan di bawah.
          </p>

          <div className="mt-7 rounded-xl border border-gray-200 p-5">
            <p className="text-sm text-gray-500">Nomor pesanan</p>
            <p className="mt-1 break-words text-lg font-bold text-gray-900">
              {order.orderNumber}
            </p>

            <div className="mt-4 flex items-center justify-between gap-4 border-t border-gray-100 pt-4">
              <span className="text-sm text-gray-500">Total tagihan</span>
              <span className="text-xl font-bold text-[#2F7D4A]">
                {formatRupiah(order.totalAmount)}
              </span>
            </div>

            <p className="mt-3 text-xs leading-5 text-gray-500">
              Status pesanan: {order.status}
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-9">
          <h2 className="text-lg font-bold text-gray-900">Pembayaran QRIS</h2>

          <div className="mx-auto mt-5 max-w-sm rounded-2xl border border-gray-200 bg-white p-4">
            <Image
              src="/images/qris/qris-pethub.id.jpeg"
              alt="QRIS resmi PetHub.id untuk pembayaran FeedCare"
              width={480}
              height={480}
              className="h-auto w-full rounded-lg object-contain"
              priority
            />
          </div>

          <ol className="mt-5 list-decimal space-y-2 pl-5 text-sm leading-6 text-gray-600">
            <li>
              Buka aplikasi mobile banking atau dompet digital yang mendukung
              QRIS.
            </li>
            <li>Pindai kode QRIS PetHub.id di atas.</li>
            <li>Masukkan nominal pembayaran persis sesuai total tagihan.</li>
            <li>Selesaikan pembayaran dan simpan bukti transaksi.</li>
          </ol>

          <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
            <strong>Penting:</strong> QRIS ini digunakan bersama dan tidak
            otomatis mengonfirmasi pembayaran ke PetHub. Simpan bukti
            pembayaran. Pesanan belum dianggap lunas sampai pembayaran
            diverifikasi.
          </div>
        </section>

        <section className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="text-lg font-bold text-gray-900">Ringkasan pesanan</h2>

          <div className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between gap-4">
              <span className="text-gray-500">Paket</span>
              <span className="text-right font-medium text-gray-800">
                {selectedPackage.name}
              </span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-gray-500">Jumlah makanan</span>
              <span className="font-medium text-gray-800">
                {order.mealsPurchased} porsi
              </span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-gray-500">Kontributor</span>
              <span className="text-right font-medium text-gray-800">
                {fullName}
              </span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-gray-500">Tipe kontributor</span>
              <span className="font-medium text-gray-800">
                {contributorType === "guest" ? "Guest" : "Member"}
              </span>
            </div>
          </div>

          <Link
            href="/feedcare"
            className="mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-xl border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            Kembali ke FeedCare
          </Link>
        </section>
      </div>
    </div>
  );
}
