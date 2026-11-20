import Link from "next/link";

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3002"
).replace(/\/$/, "");

type Item = {
  id: string;
  itemCode: string;
  name: string;
  itemType: string;
  categoryId: string;
  subcategoryId?: string | null;
  ownerType: string;
  ownerId?: string | null;
  price: number;
  description?: string | null;
  imageUrl?: string | null;
  isActive: boolean;
  specifications?: {
    name: string;
    value: string;
  }[];
};

export default async function ItemDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let item: Item | null = null;
  let error = "";

  try {
    const response = await fetch(`${API_URL}/catalog/items/${id}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Item tidak ditemukan.");
    }

    item = await response.json();
  } catch {
    error = "Gagal mengambil detail item. Silakan coba kembali.";
  }

  if (!item) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h1 className="text-xl font-bold text-gray-900">Item Not Found</h1>
        <p className="mt-2 text-sm text-gray-500">{error}</p>
        <Link
          href="/admin/items"
          className="mt-5 inline-block text-sm font-semibold text-green-700"
        >
          ← Back to Items
        </Link>
      </div>
    );
  }

  const formatPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(item.price);

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/admin/items"
          className="text-sm font-medium text-gray-500 hover:text-green-700"
        >
          ← Back to Items
        </Link>

        <h1 className="mt-3 text-2xl font-bold text-gray-900">Item Details</h1>
        <p className="mt-1 text-sm text-gray-500">
          View marketplace catalog item information.
        </p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <div className="flex items-center justify-between border-b border-gray-100 pb-5">
          <div>
            <h2 className="text-lg font-bold text-gray-900">{item.name}</h2>
            <p className="mt-1 text-sm text-gray-500">{item.itemCode}</p>
          </div>

          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              item.isActive
                ? "bg-green-50 text-green-700"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            {item.isActive ? "Active" : "Inactive"}
          </span>
        </div>

        <div className="grid gap-6 py-6 md:grid-cols-2">
          <Detail label="Item Code" value={item.itemCode} />
          <Detail label="Item Name" value={item.name} />
          <Detail label="Item Type" value={item.itemType} />
          <Detail label="Category ID" value={item.categoryId} />
          <Detail label="Subcategory ID" value={item.subcategoryId || "-"} />
          <Detail label="Owner Type" value={item.ownerType} />
          <Detail label="Owner ID" value={item.ownerId || "-"} />
          <Detail label="Price" value={formatPrice} />
        </div>

        <div className="border-t border-gray-100 pt-5">
          <Detail label="Description" value={item.description || "-"} />
        </div>

        {item.specifications && item.specifications.length > 0 && (
          <div className="mt-6 border-t border-gray-100 pt-5">
            <h3 className="mb-4 font-semibold text-gray-900">Specifications</h3>

            <div className="grid gap-4 md:grid-cols-2">
              {item.specifications.map((spec, index) => (
                <Detail key={index} label={spec.name} value={spec.value} />
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 border-t border-gray-100 pt-5">
          <a
            href={`/admin/items/${item.id}/edit`}
            className="inline-flex rounded-lg bg-green-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-800"
          >
            Edit Item
          </a>
        </div>
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
        {label}
      </p>
      <p className="mt-1 text-sm font-medium text-gray-800">{value}</p>
    </div>
  );
}
