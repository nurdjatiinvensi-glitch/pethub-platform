
export type FeedCarePackage = {
  id: string;
  name: string;
  description: string;
  meals: number;
  price: number;
  isActive: boolean;
};

export type ContributorType = "guest" | "member";

export type CreateDonorInput = {
  name: string;
  email: string;
  phone: string;
};

export type FeedCareOrder = {
  id: string;
  orderNumber: string;
  donorId?: string;
  packageId: string;
  quantity: number;
  mealsPurchased: number;
  totalAmount: number;
  status: string;
};

export type FeedCarePayment = {
  id: string;
  orderId: string;
  amount: number;
  method: string;
  status: string;
  paidAmount?: number | null;
  proofUrl?: string | null;
  rejectionReason?: string | null;
};

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3002"
).replace(/\/$/, "");

async function apiRequest<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });

  const result: unknown = await response.json().catch(() => null);

  if (!response.ok) {
    const body = result as
      | { message?: string | string[] }
      | null;

    const message = Array.isArray(body?.message)
      ? body.message.join(", ")
      : body?.message;

    throw new Error(
      message || `Permintaan gagal (${response.status}).`,
    );
  }

  return result as T;
}

export function formatRupiah(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price);
}

export async function getFeedCarePackages(): Promise<
  FeedCarePackage[]
> {
  const data = await apiRequest<FeedCarePackage[]>(
    "/feedcare/packages",
  );

  return data.filter((item) => item.isActive);
}

export async function createFeedCareDonor(
  input: CreateDonorInput,
) {
  return apiRequest("/feedcare/donors", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function createFeedCareOrder(input: {
  phone: string;
  packageId: string;
}) {
  return apiRequest<FeedCareOrder>("/feedcare/orders", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function getFeedCarePayment(orderId: string) {
  return apiRequest<FeedCarePayment>(
    `/feedcare/payments/order/${encodeURIComponent(orderId)}`,
  );
}
