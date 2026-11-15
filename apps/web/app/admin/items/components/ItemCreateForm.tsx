"use client";

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

export default function ItemCreateForm({
  categories,
}: {
  categories: Category[];
}) {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [loadingSubcategories, setLoadingSubcategories] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    itemCode: "",
    name: "",
    itemType: "PRODUCT",
    description: "",
    price: "",
    categoryId: "",
    subcategoryId: "",
    ownerType: "PETHUB",
    ownerId: "",
  });

  const [specifications, setSpecifications] = useState<Specification[]>([]);

  useEffect(() => {
    if (!form.categoryId) {
      return;
    }

    const controller = new AbortController();

    async function loadSubcategories() {
      setLoadingSubcategories(true);
      setSubcategories([]);
      setForm((current) => ({ ...current, subcategoryId: "" }));

      try {
        const response = await fetch(
          `${API_URL}/catalog/subcategories?categoryId=${encodeURIComponent(form.categoryId)}`,
          { cache: "no-store", signal: controller.signal },
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
    setForm((current) => ({ ...current, [field]: value }));
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
    setSaving(true);

    try {
      const payload = {
        ...form,
        price: Number(form.price),
        ownerId: form.ownerId.trim() || undefined,
        specifications: specifications.filter(
          (item) => item.name.trim() && item.value.trim(),
        ),
      };

      const response = await fetch(`${API_URL}/catalog/items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        const message = result?.message;
        throw new Error(
          Array.isArray(message)
            ? message.join(", ")
            : message || "Gagal menyimpan item.",
        );
      }

      setSuccess("Item berhasil ditambahkan.");
      setForm({
        itemCode: "",
        name: "",
        itemType: "PRODUCT",
        description: "",
        price: "",
        categoryId: "",
        subcategoryId: "",
        ownerType: "PETHUB",
        ownerId: "",
      });
      setSpecifications([]);
      setSubcategories([]);

      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white">
      <div className="flex items-center justify-between gap-3 p-5">
        <div>
          <h2 className="font-semibold text-gray-900">Add New Item</h2>
          <p className="mt-1 text-sm text-gray-500">
            Add a new item to the marketplace catalog.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-lg bg-green-700 px-4 py-2 text-sm font-semibold text-white hover:bg-green-800"
        >
          {isOpen ? "Close Form" : "+ Add Item"}
        </button>
      </div>

      {isOpen && (
        <form
          onSubmit={handleSubmit}
          className="space-y-5 border-t border-gray-100 p-5"
        >
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
              <label className="mb-1 block text-sm font-medium">
                Item Code *
              </label>
              <input
                required
                value={form.itemCode}
                onChange={(e) => updateField("itemCode", e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                placeholder="PET-CAT-FOOD-001"
              />
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
                placeholder="Premium Cat Food"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                Item Type
              </label>
              <select
                value={form.itemType}
                onChange={(e) => updateField("itemType", e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
              >
                <option value="PRODUCT">Product</option>
                <option value="SERVICE">Service</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Price *</label>
              <input
                required
                type="number"
                min="0"
                step="1"
                value={form.price}
                onChange={(e) => updateField("price", e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                placeholder="175000"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                Category *
              </label>
              <select
                required
                value={form.categoryId}
                onChange={(e) => updateField("categoryId", e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
              >
                <option value="">Select Category</option>
                {categories
                  .filter((c) => c.isActive)
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
              <label className="mb-1 block text-sm font-medium">
                Owner Type
              </label>
              <select
                value={form.ownerType}
                onChange={(e) => updateField("ownerType", e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
              >
                <option value="PETHUB">PetHub</option>
                <option value="MERCHANT">Merchant</option>
              </select>
            </div>

            {form.ownerType === "MERCHANT" && (
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Owner ID
                </label>
                <input
                  value={form.ownerId}
                  onChange={(e) => updateField("ownerId", e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                  placeholder="Merchant ID"
                />
              </div>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Description
            </label>
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

          <div className="flex justify-end gap-3 border-t border-gray-100 pt-4">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-green-700 px-5 py-2 text-sm font-semibold text-white hover:bg-green-800 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Item"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
