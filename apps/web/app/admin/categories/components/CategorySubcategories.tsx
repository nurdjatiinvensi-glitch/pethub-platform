"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3002"
).replace(/\/+$/, "");

type Subcategory = {
  id: string;
  name: string;
  categoryId: string;
  isActive: boolean;
};

export default function CategorySubcategories({
  categoryId,
  categoryActive,
  subcategories,
}: {
  categoryId: string;
  categoryActive: boolean;
  subcategories: Subcategory[];
}) {
  const router = useRouter();

  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const activeCount = subcategories.filter((item) => item.isActive).length;

  async function request(url: string, method: string, body: unknown) {
    const response = await fetch(`${API_URL}${url}`, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const result = await response.json().catch(() => null);

    if (!response.ok) {
      const message = result?.message;
      throw new Error(
        Array.isArray(message)
          ? message.join(", ")
          : message || "Permintaan gagal diproses.",
      );
    }

    return result;
  }

  async function handleAdd(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name.trim()) {
      setError("Nama subcategory wajib diisi.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await request("/catalog/subcategories", "POST", {
        categoryId,
        name: name.trim(),
      });

      setName("");
      setSuccess("Subcategory berhasil ditambahkan.");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Gagal menambahkan subcategory.",
      );
    } finally {
      setLoading(false);
    }
  }

  function startEdit(item: Subcategory) {
    setEditingId(item.id);
    setEditName(item.name);
    setError("");
    setSuccess("");
  }

  function cancelEdit() {
    setEditingId(null);
    setEditName("");
  }

  async function handleEdit(id: string) {
    if (!editName.trim()) {
      setError("Nama subcategory wajib diisi.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await request(`/catalog/subcategories/${id}`, "PUT", {
        name: editName.trim(),
      });

      setEditingId(null);
      setSuccess("Subcategory berhasil diperbarui.");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Gagal memperbarui subcategory.",
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleStatusChange(item: Subcategory) {
    const nextStatus = !item.isActive;
    const action = nextStatus ? "mengaktifkan" : "menonaktifkan";

    if (!window.confirm(`Yakin ingin ${action} subcategory ini?`)) return;

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await request(`/catalog/subcategories/${item.id}/status`, "PATCH", {
        isActive: nextStatus,
      });

      setSuccess(
        `Subcategory berhasil ${nextStatus ? "diaktifkan" : "dinonaktifkan"}.`,
      );
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Gagal mengubah status subcategory.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-semibold text-gray-900">Subcategories</h3>
        <p className="mt-1 text-xs text-gray-500">
          {activeCount} active of {subcategories.length} total
        </p>
      </div>

      {categoryActive && (
        <form
          onSubmit={handleAdd}
          className="rounded-xl border border-gray-200 bg-gray-50 p-5"
        >
          <h4 className="mb-4 font-semibold text-gray-800">
            Add New Subcategory
          </h4>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Subcategory Name *
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter subcategory name"
              disabled={loading}
              required
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-green-600"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !name.trim()}
            className="mt-4 rounded-lg bg-green-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Processing..." : "Add Subcategory"}
          </button>
        </form>
      )}

      {!categoryActive && (
        <p className="rounded-lg bg-gray-50 px-4 py-3 text-sm text-gray-500">
          Category is inactive. Add Subcategory is unavailable.
        </p>
      )}

      {error && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      {success && (
        <p className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          {success}
        </p>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
            <tr>
              <th className="px-4 py-3">Subcategory Name</th>
              <th className="px-4 py-3 text-center">Status</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {subcategories.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-4 py-8 text-center text-gray-400">
                  No subcategories available.
                </td>
              </tr>
            ) : (
              subcategories.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 font-medium text-gray-900">
                    {editingId === item.id ? (
                      <input
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        disabled={loading}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-green-600"
                      />
                    ) : (
                      item.name
                    )}
                  </td>

                  <td className="px-4 py-4 text-center">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                        item.isActive
                          ? "bg-green-50 text-green-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {item.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex flex-wrap items-center justify-center gap-2">
                      {editingId === item.id ? (
                        <>
                          <button
                            type="button"
                            onClick={() => handleEdit(item.id)}
                            disabled={loading}
                            className="rounded-lg border border-green-200 px-3 py-1.5 text-xs font-semibold text-green-700 hover:bg-green-50 disabled:opacity-50"
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            onClick={cancelEdit}
                            disabled={loading}
                            className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-100"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            type="button"
                            onClick={() => startEdit(item)}
                            disabled={loading}
                            className="rounded-lg border border-green-200 px-3 py-1.5 text-xs font-semibold text-green-700 hover:bg-green-50 disabled:opacity-50"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleStatusChange(item)}
                            disabled={loading}
                            className={`rounded-lg border px-3 py-1.5 text-xs font-semibold disabled:opacity-50 ${
                              item.isActive
                                ? "border-red-200 text-red-600 hover:bg-red-50"
                                : "border-green-200 text-green-700 hover:bg-green-50"
                            }`}
                          >
                            {loading
                              ? "Processing..."
                              : item.isActive
                                ? "Deactivate"
                                : "Activate"}
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
