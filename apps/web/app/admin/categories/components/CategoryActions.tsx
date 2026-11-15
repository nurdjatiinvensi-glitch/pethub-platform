"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3002"
).replace(/\/$/, "");

export default function CategoryActions({
  categoryId,
  isActive,
}: {
  categoryId: string;
  isActive: boolean;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleStatusChange() {
    const nextStatus = !isActive;
    const action = nextStatus ? "mengaktifkan" : "menonaktifkan";

    if (!window.confirm(`Yakin ingin ${action} kategori ini?`)) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${API_URL}/catalog/categories/${categoryId}/status`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isActive: nextStatus }),
        },
      );

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        const message = result?.message;
        throw new Error(
          Array.isArray(message)
            ? message.join(", ")
            : message || "Gagal mengubah status kategori.",
        );
      }

      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex items-center justify-center gap-2">
        <Link
          href={`/admin/categories/${categoryId}`}
          className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-100"
        >
          View
        </Link>

        <Link
          href={`/admin/categories/${categoryId}/edit`}
          className="rounded-lg border border-green-200 px-3 py-1.5 text-xs font-semibold text-green-700 hover:bg-green-50"
        >
          Edit
        </Link>

        <button
          type="button"
          onClick={handleStatusChange}
          disabled={loading}
          className={`rounded-lg border px-3 py-1.5 text-xs font-semibold disabled:opacity-50 ${
            isActive
              ? "border-red-200 text-red-600 hover:bg-red-50"
              : "border-green-200 text-green-700 hover:bg-green-50"
          }`}
        >
          {loading ? "Processing..." : isActive ? "Deactivate" : "Activate"}
        </button>
      </div>

      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
