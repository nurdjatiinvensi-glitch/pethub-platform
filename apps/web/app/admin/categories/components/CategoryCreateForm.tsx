"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3002"
).replace(/\/$/, "");

export default function CategoryCreateForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(`${API_URL}/catalog/categories`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          description: description.trim() || null,
        }),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        const message = result?.message;
        throw new Error(
          Array.isArray(message)
            ? message.join(", ")
            : message || "Gagal membuat kategori.",
        );
      }

      setName("");
      setDescription("");
      setSuccess("Kategori berhasil ditambahkan.");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-2xl border border-gray-200 bg-white p-5"
    >
      <div>
        <h2 className="font-semibold text-gray-900">Add New Category</h2>
        <p className="mt-1 text-sm text-gray-500">
          Create a new marketplace category.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Category Name *
          </label>
          <input
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Enter category name"
            className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-green-600"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Description
          </label>
          <input
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Enter category description"
            className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-green-600"
          />
        </div>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      {success && <p className="text-sm text-green-700">{success}</p>}

      <button
        type="submit"
        disabled={loading || !name.trim()}
        className="rounded-xl bg-[#2F7D4A] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-800 disabled:opacity-50"
      >
        {loading ? "Processing..." : "Add Category"}
      </button>
    </form>
  );
}
