"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Category = {
  id: string;
  name: string;
  isActive: boolean;
};

type Subcategory = {
  id: string;
  name: string;
  categoryId: string;
  isActive: boolean;
};

type Specification = {
  name: string;
  value: string;
};

type Item = {
  id: string;
  itemCode: string;
  name: string;
  itemType: string;
  isFeedCareEligible: boolean;
  description?: string | null;
  price: string | number;
  imageUrl?: string | null;
  categoryId: string;
  subcategoryId?: string | null;
  ownerType: string;
  ownerId?: string | null;
  specifications?: Specification[];
};

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3002"
).replace(/\/$/, "");

function normalizeList<T>(data: unknown): T[] {
  if (Array.isArray(data)) return data as T[];

  if (
    data &&
    typeof data === "object" &&
    Array.isArray((data as { value?: unknown }).value)
  ) {
    return (data as { value: T[] }).value;
  }

  if (data && typeof data === "object" && "id" in data) {
    return [data as T];
  }

  return [];
}

// Format angka lokal: 1050,95 menjadi 1.050,95
function formatPriceInput(value: string): string {
  const cleaned = value.replace(/[^\d,]/g, "");
  const commaIndex = cleaned.indexOf(",");

  let integerPart = commaIndex >= 0 ? cleaned.slice(0, commaIndex) : cleaned;

  const decimalPart =
    commaIndex >= 0
      ? cleaned
          .slice(commaIndex + 1)
          .replace(/,/g, "")
          .slice(0, 5)
      : "";

  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return commaIndex >= 0 ? `${integerPart},${decimalPart}` : integerPart;
}

// Format decimal dari database ke tampilan Indonesia
// 1050.95 menjadi 1.050,95
function apiPriceToInput(value: string | number): string {
  const normalized = String(value);
  const [integerPart, decimalPart] = normalized.split(".");

  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return decimalPart !== undefined
    ? `${formattedInteger},${decimalPart.slice(0, 5)}`
    : formattedInteger;
}

// Konversi format Indonesia ke decimal string API
// 1.050,95 menjadi 1050.95
function priceToApi(value: string): string {
  return value.replace(/\./g, "").replace(",", ".");
}

export default function ItemEditForm({
  item,
  categories,
}: {
  item: Item;
  categories: Category[];
}) {
  const router = useRouter();

  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [loadingSubcategories, setLoadingSubcategories] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    itemCode: item.itemCode,
    name: item.name,
    itemType: item.itemType,
    isFeedCareEligible: item.isFeedCareEligible,
    description: item.description ?? "",
    price: apiPriceToInput(item.price),
    imageUrl: item.imageUrl ?? "",
    categoryId: item.categoryId,
    subcategoryId: item.subcategoryId ?? "",
    ownerType: item.ownerType,
    ownerId: item.ownerId ?? "",
  });

  const [specifications, setSpecifications] = useState<Specification[]>(
    item.specifications ?? [],
  );

  useEffect(() => {
    if (!form.categoryId) return;

    const controller = new AbortController();

    async function loadSubcategories() {
      setLoadingSubcategories(true);

      try {
        const response = await fetch(
          `${API_URL}/catalog/subcategories?categoryId=${encodeURIComponent(form.categoryId)}`,
          {
            cache: "no-store",
            signal: controller.signal,
          },
        );

        if (!response.ok) {
          throw new Error("Gagal mengambil data subkategori.");
        }

        const data = await response.json();

        setSubcategories(
          normalizeList<Subcategory>(data).filter(
            (subcategory) =>
              subcategory.isActive &&
              subcategory.categoryId === form.categoryId,
          ),
        );
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(
            err instanceof Error ? err.message : "Gagal mengambil subkategori.",
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoadingSubcategories(false);
        }
      }
    }

    loadSubcategories();

    return () => controller.abort();
  }, [form.categoryId]);

  function updateField(field: string, value: string) {
    setForm((current) => ({
      ...current,
      [field]: value,
      ...(field === "categoryId" ? { subcategoryId: "" } : {}),
    }));
  }

  function updateSpecification(
    index: number,
    field: keyof Specification,
    value: string,
  ) {
    setSpecifications((current) =>
      current.map((item, i) =>
        i === index ? { ...item, [field]: value } : item,
      ),
    );
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSuccess("");

    const apiPrice = priceToApi(form.price);

    if (!/^\d+(?:\.\d{1,5})?$/.test(apiPrice)) {
      setError(
        "Harga harus berupa angka nol atau lebih dengan maksimal 5 angka desimal.",
      );
      return;
    }

    setSaving(true);

    try {
      const payload = {
        name: form.name,
        itemType: form.itemType,
        isFeedCareEligible: form.isFeedCareEligible,
        description: form.description,
        price: apiPrice,
        imageUrl: form.imageUrl.trim() || undefined,
        categoryId: form.categoryId,
        subcategoryId: form.subcategoryId,
        ownerType: form.ownerType,
        ownerId: form.ownerId.trim() || undefined,
        specifications: specifications.filter(
          (item) => item.name.trim() && item.value.trim(),
        ),
      };

      const response = await fetch(`${API_URL}/catalog/items/${item.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        const message = result?.message;

        throw new Error(
          Array.isArray(message)
            ? message.join(", ")
            : message || "Gagal memperbarui item.",
        );
      }

      setSuccess("Item berhasil diperbarui.");

      router.push(`/admin/items/${item.id}`);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <div className="mb-6 border-b border-gray-100 pb-5">
        <h2 className="text-lg font-semibold text-gray-900">
          Edit Item Information
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Update marketplace catalog item information.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="rounded-lg bg-green-50 p-3 text-sm text-green-700">
            {success}
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium">Item Code</label>
            <input
              value={form.itemCode}
              readOnly
              className="w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-500"
            />
            <p className="mt-1 text-xs text-gray-400">
              Item Code dibuat otomatis oleh sistem dan tidak dapat diubah.
            </p>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Item Name *
            </label>
            <input
              required
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Item Type</label>
            <select
              value={form.itemType}
              onChange={(e) =>
                setForm((current) => ({
                  ...current,
                  itemType: e.target.value,
                  isFeedCareEligible:
                    e.target.value === "PRODUCT" && current.isFeedCareEligible,
                }))
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            >
              <option value="PRODUCT">Product</option>
              <option value="SERVICE">Service</option>
            </select>
          </div>

            <label className="flex items-center gap-2 self-center text-sm text-gray-700">
              <input
                type="checkbox"
                checked={form.isFeedCareEligible}
                disabled={form.itemType !== "PRODUCT"}
                onChange={(e) =>
                  setForm((current) => ({ ...current, isFeedCareEligible: e.target.checked }))
                }
                className="h-4 w-4 rounded border-gray-300 text-green-700"
              />
              Tampilkan di FeedCare
            </label>

          <div>
            <label className="mb-1 block text-sm font-medium">Price *</label>
            <input
              required
              type="text"
              inputMode="decimal"
              value={form.price}
              onChange={(e) =>
                updateField("price", formatPriceInput(e.target.value))
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
              placeholder="1.050,95"
            />
            <p className="mt-1 text-xs text-gray-500">
              Gunakan koma untuk desimal. Maksimal 5 angka desimal.
            </p>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Category *</label>
            <select
              required
              value={form.categoryId}
              onChange={(e) => updateField("categoryId", e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            >
              <option value="">Select Category</option>
              {categories
                .filter((category) => category.isActive)
                .map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Subcategory *
            </label>
            <select
              required
              value={form.subcategoryId}
              onChange={(e) => updateField("subcategoryId", e.target.value)}
              disabled={!form.categoryId || loadingSubcategories}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm disabled:bg-gray-100"
            >
              <option value="">
                {loadingSubcategories ? "Loading..." : "Select Subcategory"}
              </option>

              {subcategories.map((subcategory) => (
                <option key={subcategory.id} value={subcategory.id}>
                  {subcategory.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Pemilik Item</label>
            <select
              value={form.ownerType}
              onChange={(e) => updateField("ownerType", e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            >
              <option value="PETHUB">PetHub</option>
              <option value="MERCHANT">Toko</option>
            </select>
          </div>

          {form.ownerType === "MERCHANT" && (
            <div>
              <label className="mb-1 block text-sm font-medium">ID Akun Toko (juga Owner ID)</label>
              <input
                value={form.ownerId}
                onChange={(e) => updateField("ownerId", e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                placeholder="Masukkan ID akun toko"
                required
              />
              <p className="mt-1 text-xs text-gray-500">
                Isi dengan ID akun toko; ID ini juga disimpan sebagai Owner ID Item. Jangan gunakan ID akun pembeli.
              </p>
            </div>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Image URL</label>
          <input
            type="url"
            value={form.imageUrl}
            onChange={(e) => updateField("imageUrl", e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            placeholder="https://example.com/image.jpg"
          />
          <p className="mt-1 text-xs text-gray-500">
            Masukkan alamat URL gambar item.
          </p>

          {form.imageUrl.trim() && (
            <div className="mt-3">
              <p className="mb-2 text-xs text-gray-500">Image Preview</p>
              <Image
                src={form.imageUrl}
                alt="Item preview"
                width={128}
                height={128}
                unoptimized
                className="h-32 w-32 rounded-lg border border-gray-200 object-cover"
              />
            </div>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Description</label>
          <textarea
            rows={3}
            value={form.description}
            onChange={(e) => updateField("description", e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            placeholder="Describe this item..."
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-900">
              Specifications
            </h3>

            <button
              type="button"
              onClick={() =>
                setSpecifications((current) => [
                  ...current,
                  { name: "", value: "" },
                ])
              }
              className="text-sm font-semibold text-green-700 hover:text-green-800"
            >
              + Add Specification
            </button>
          </div>

          {specifications.map((specification, index) => (
            <div key={index} className="flex flex-col gap-2 sm:flex-row">
              <input
                value={specification.name}
                onChange={(e) =>
                  updateSpecification(index, "name", e.target.value)
                }
                placeholder="Name (e.g. Weight)"
                className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm"
              />

              <input
                value={specification.value}
                onChange={(e) =>
                  updateSpecification(index, "value", e.target.value)
                }
                placeholder="Value (e.g. 2 KG)"
                className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm"
              />

              <button
                type="button"
                onClick={() =>
                  setSpecifications((current) =>
                    current.filter((_, i) => i !== index),
                  )
                }
                className="rounded-lg border border-red-200 px-3 py-2 text-sm text-red-600"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-3 border-t border-gray-100 pt-5">
          <button
            type="button"
            onClick={() => router.push(`/admin/items/${item.id}`)}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving || loadingSubcategories}
            className="rounded-lg bg-green-700 px-5 py-2 text-sm font-semibold text-white hover:bg-green-800 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
