import type {
  ContributorType,
  FeedCarePackage,
} from "../lib/feedcare-checkout";
import { formatRupiah } from "../lib/feedcare-checkout";

type Props = {
  selectedPackage: FeedCarePackage;
  fullName: string;
  contributorType: ContributorType;
  onBack: () => void;
};

export default function CheckoutResult({
  selectedPackage,
  fullName,
  contributorType,
  onBack,
}: Props) {
  return (
    <div className="min-h-full bg-[#F8FAF9] px-5 py-10 sm:px-8 lg:py-14">
      <div className="mx-auto max-w-2xl">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center sm:p-10">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-50 text-amber-600">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-7 w-7"
            >
              <path
                d="M12 8v4m0 4h.01M10.3 3.9 2.8 17a2 2 0 0 0 1.7 3h15a2 2 0 0 0 1.7-3l-7.5-13.1a2 2 0 0 0-3.4 0Z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <p className="mt-5 text-xs font-bold uppercase tracking-wider text-amber-700">
            Simulasi Checkout
          </p>
          <h1 className="mt-2 text-2xl font-bold text-gray-900">
            Formulir berhasil diuji
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500">
            Data formulir berhasil melewati validasi browser. Pesanan belum
            dibuat, belum disimpan ke server, dan pembayaran belum dilakukan.
          </p>

          <div className="mt-7 rounded-xl border border-gray-200 p-5 text-left">
            <p className="text-xs font-medium text-gray-500">
              Paket yang dipilih
            </p>
            <h2 className="mt-1 text-lg font-bold text-gray-900">
              {selectedPackage.name}
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              {selectedPackage.meals} porsi makanan
            </p>

            <div className="my-4 border-t border-gray-100" />

            <div className="flex justify-between gap-4 text-sm">
              <span className="text-gray-500">Kontributor</span>
              <span className="text-right font-medium text-gray-800">
                {fullName}
              </span>
            </div>

            <div className="mt-3 flex justify-between gap-4 text-sm">
              <span className="text-gray-500">Tipe</span>
              <span className="font-medium text-gray-800">
                {contributorType === "guest" ? "Guest" : "Member"}
              </span>
            </div>

            <div className="mt-3 flex justify-between gap-4 text-sm">
              <span className="text-gray-500">Total simulasi</span>
              <span className="font-bold text-[#2F7D4A]">
                {formatRupiah(selectedPackage.price)}
              </span>
            </div>
          </div>

          <div className="mt-5 rounded-xl bg-amber-50 p-4 text-left text-sm leading-6 text-amber-900">
            <strong>Belum ada transaksi.</strong> Checkout ini belum terhubung
            ke endpoint pembuatan pesanan atau pembayaran.
          </div>

          <button
            type="button"
            onClick={onBack}
            className="mt-6 inline-flex min-h-11 items-center justify-center rounded-xl border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            Kembali ke Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
