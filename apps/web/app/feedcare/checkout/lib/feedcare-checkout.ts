
export type FeedCarePackage = {
  id: string;
  name: string;
  description: string;
  meals: number;
  price: number;
  isActive: boolean;
};

export type ContributorType = "guest" | "member";

export function formatRupiah(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price);
}

export async function getFeedCarePackages(): Promise<FeedCarePackage[]> {
  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3002";

  const response = await fetch(`${apiUrl}/feedcare/packages`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Paket tidak dapat dimuat dari server.");
  }

  const data: FeedCarePackage[] = await response.json();
  return data.filter((item) => item.isActive);
}
