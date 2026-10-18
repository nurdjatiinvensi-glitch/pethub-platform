import type { ContributorType as ContributorTypeValue } from "../lib/feedcare-checkout";
import ContributorType from "./ContributorType";

type Props = {
  contributorType: ContributorTypeValue;
  onContributorTypeChange: (value: ContributorTypeValue) => void;
  fullName: string;
  onFullNameChange: (value: string) => void;
  email: string;
  onEmailChange: (value: string) => void;
  phone: string;
  onPhoneChange: (value: string) => void;
};

const inputClass =
  "min-h-11 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#2F7D4A] focus:ring-2 focus:ring-[#2F7D4A]/15";

export default function CheckoutForm({
  contributorType,
  onContributorTypeChange,
  fullName,
  onFullNameChange,
  email,
  onEmailChange,
  phone,
  onPhoneChange,
}: Props) {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-7">
        <h2 className="text-lg font-bold text-gray-900">
          Informasi Kontributor
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Pilih cara berkontribusi melalui FeedCare.
        </p>

        <div className="mt-5">
          <ContributorType
            value={contributorType}
            onChange={onContributorTypeChange}
          />
        </div>

        <div className="mt-6 space-y-5">
          <div>
            <label
              htmlFor="fullName"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Nama lengkap
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              autoComplete="name"
              required
              maxLength={100}
              value={fullName}
              onChange={(event) => onFullNameChange(event.target.value)}
              placeholder="Masukkan nama lengkap"
              className={inputClass}
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              maxLength={254}
              value={email}
              onChange={(event) => onEmailChange(event.target.value)}
              placeholder="nama@email.com"
              className={inputClass}
            />
            <p className="mt-2 text-xs leading-5 text-gray-500">
              Gunakan email yang bisa diakses untuk menerima informasi pesanan
              dan laporan.
            </p>
          </div>

          <div>
            <label
              htmlFor="phone"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Nomor telepon
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              required
              minLength={8}
              maxLength={20}
              value={phone}
              onChange={(event) => onPhoneChange(event.target.value)}
              placeholder="Contoh: 081234567890"
              className={inputClass}
            />
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-7">
        <h2 className="text-base font-bold text-gray-900">
          Informasi pembayaran
        </h2>
        <p className="mt-2 text-sm leading-6 text-gray-500">
          Pembayaran belum diproses pada tahap simulasi ini. Pilihan metode akan
          ditampilkan sesuai integrasi pembayaran yang tersedia.
        </p>
      </section>
    </div>
  );
}
