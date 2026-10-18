"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState, type FormEvent } from "react";

import CheckoutForm from "./components/CheckoutForm";
import CheckoutResult from "./components/CheckoutResult";
import CheckoutSummary from "./components/CheckoutSummary";
import {
  getFeedCarePackages,
  type ContributorType,
  type FeedCarePackage,
} from "./lib/feedcare-checkout";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const packageId = searchParams.get("packageId");

  const [packages, setPackages] = useState<FeedCarePackage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [contributorType, setContributorType] =
    useState<ContributorType>("guest");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    let cancelled = false;

    getFeedCarePackages()
      .then((data) => {
        if (!cancelled) setPackages(data);
      })
      .catch(() => {
        if (!cancelled) {
          setLoadError(
            "Paket gagal dimuat. Pastikan API berjalan, lalu coba kembali.",
          );
        }
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const selectedPackage = useMemo(
    () => packages.find((item) => item.id === packageId),
    [packages, packageId],
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (selectedPackage) setIsSubmitted(true);
  }

  if (isLoading) {
    return <PageMessage message="Memuat detail paket FeedCare..." />;
  }

  if (loadError || !selectedPackage) {
    return (
      <div className="min-h-full bg-[#F8FAF9] px-5 py-12">
        <div className="mx-auto max-w-2xl rounded-2xl border border-gray-200 bg-white p-7 sm:p-9">
          <h1 className="text-xl font-bold text-gray-900">
            Paket tidak dapat ditampilkan
          </h1>
          <p className="mt-3 text-sm leading-6 text-gray-500">
            {loadError ||
              "Paket tidak ditemukan, sudah tidak aktif, atau tautan pilihan paket tidak valid."}
          </p>
          <Link
            href="/feedcare"
            className="mt-6 inline-flex min-h-11 items-center justify-center rounded-xl bg-[#2F7D4A] px-5 py-3 text-sm font-semibold text-white hover:bg-[#276A3F]"
          >
            Kembali ke FeedCare
          </Link>
        </div>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <CheckoutResult
        selectedPackage={selectedPackage}
        fullName={fullName}
        contributorType={contributorType}
        onBack={() => setIsSubmitted(false)}
      />
    );
  }

  return (
    <div className="min-h-full bg-[#F8FAF9] px-5 py-7 sm:px-8 lg:px-10 lg:py-10">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/feedcare"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#2F7D4A] hover:text-[#276A3F]"
        >
          <span aria-hidden="true">←</span>
          Kembali ke FeedCare
        </Link>

        <header className="mt-5">
          <p className="text-sm font-semibold text-[#2F7D4A]">FEEDCARE</p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Checkout
          </h1>
          <p className="mt-2 text-sm leading-6 text-gray-500">
            Periksa paket pilihanmu dan lengkapi informasi kontributor.
          </p>
        </header>

        <form
          id="checkout-form"
          onSubmit={handleSubmit}
          className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]"
        >
          <CheckoutForm
            contributorType={contributorType}
            onContributorTypeChange={setContributorType}
            fullName={fullName}
            onFullNameChange={setFullName}
            email={email}
            onEmailChange={setEmail}
            phone={phone}
            onPhoneChange={setPhone}
          />

          <CheckoutSummary selectedPackage={selectedPackage} />
        </form>
      </div>
    </div>
  );
}

function PageMessage({ message }: { message: string }) {
  return (
    <div className="min-h-full bg-[#F8FAF9] px-5 py-12">
      <div className="mx-auto max-w-3xl rounded-2xl border border-gray-200 bg-white p-8 text-center">
        <p className="text-sm text-gray-500">{message}</p>
      </div>
    </div>
  );
}

export default function FeedCareCheckoutPage() {
  return (
    <Suspense fallback={<PageMessage message="Memuat halaman checkout..." />}>
      <CheckoutContent />
    </Suspense>
  );
}
