import type { FeedCarePackage } from "../lib/feedcare-checkout";
import { formatRupiah } from "../lib/feedcare-checkout";

type Props = {
  selectedPackage: FeedCarePackage;
};

export default function CheckoutSummary({ selectedPackage }: Props) {
  return (
    <aside className="h-fit rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 lg:sticky lg:top-6">
      <h2 className="text-lg font-bold text-gray-900">Ringkasan Pesanan</h2>

      <div className="mt-5 rounded-xl bg-[#F4F8F5] p-4">
        <p className="text-xs font-medium text-gray-500">Paket FeedCare</p>
        <h3 className="mt-2 text-lg font-bold text-[#245F3B]">
          {selectedPackage.name}
        </h3>
        <p className="mt-2 text-sm leading-5 text-gray-600">
          {selectedPackage.description}
        </p>

        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="text-sm text-gray-500">Jumlah makanan</span>
          <span className="text-sm font-semibold text-gray-900">
            {selectedPackage.meals} porsi
          </span>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        <div className="flex justify-between gap-3 text-sm">
          <span className="text-gray-500">Harga paket</span>
          <span className="font-medium text-gray-800">
            {formatRupiah(selectedPackage.price)}
          </span>
        </div>

        <div className="border-t border-dashed border-gray-200 pt-4">
          <div className="flex items-center justify-between gap-3">
            <span className="font-semibold text-gray-900">Total</span>
            <span className="text-xl font-bold text-[#2F7D4A]">
              {formatRupiah(selectedPackage.price)}
            </span>
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 min-h-12 w-full rounded-xl bg-[#2F7D4A] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#276A3F]"
      >
        Simulasikan Checkout
      </button>

      <p className="mt-3 text-center text-xs leading-5 text-gray-400">
        Mode demo. Belum ada pesanan atau pembayaran nyata yang dibuat.
      </p>

      <div className="mt-5 border-t border-gray-100 pt-4">
        <p className="text-xs leading-5 text-gray-500">
          Dengan melanjutkan, kamu menyatakan bahwa informasi yang dimasukkan
          sesuai dengan data yang ingin digunakan untuk simulasi checkout.
        </p>
      </div>
    </aside>
  );
}
