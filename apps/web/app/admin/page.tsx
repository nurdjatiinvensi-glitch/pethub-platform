import AppIcon from "../components/ui/AppIcon";

const stats = [
  {
    label: "Total Items",
    value: "1,250",
    note: "Marketplace catalog",
    icon: "package" as const,
  },
  {
    label: "Active Sellers",
    value: "128",
    note: "Registered business owners",
    icon: "users" as const,
  },
  {
    label: "Total Orders",
    value: "3,842",
    note: "Marketplace transactions",
    icon: "shopping-cart" as const,
  },
  {
    label: "Platform Events",
    value: "24",
    note: "Scheduled activities",
    icon: "calendar" as const,
  },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-7">
      <div>
        <p className="text-sm text-gray-500">Overview</p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-gray-900">
          Dashboard
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Welcome to PetHub Platform Administration.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">{stat.label}</p>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEF7F1] text-[#2F7D4A]">
                <AppIcon name={stat.icon} size={20} />
              </div>
            </div>

            <p className="mt-4 text-2xl font-bold text-gray-900">
              {stat.value}
            </p>
            <p className="mt-1 text-xs text-gray-400">{stat.note}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <section className="rounded-2xl border border-gray-100 bg-white p-6 xl:col-span-2">
          <h2 className="font-semibold text-gray-900">Platform Overview</h2>
          <p className="mt-1 text-sm text-gray-500">
            Your platform management workspace.
          </p>

          <div className="mt-6 flex min-h-[190px] flex-col items-center justify-center rounded-xl bg-[#F8FAF9] text-center">
            <AppIcon name="package" size={34} className="text-[#2F7D4A]" />
            <p className="mt-3 text-sm font-semibold text-gray-700">
              Marketplace Management
            </p>
            <p className="mt-1 text-xs text-gray-400">
              Manage catalog items and marketplace data.
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-gray-100 bg-white p-6">
          <h2 className="font-semibold text-gray-900">Quick Access</h2>
          <p className="mt-1 text-sm text-gray-500">
            Frequently used management menus.
          </p>

          <a
            href="/admin/items"
            className="mt-5 flex items-center gap-3 rounded-xl border border-gray-100 p-4 transition-colors hover:border-[#CFE5D5] hover:bg-[#F8FAF9]"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEF7F1] text-[#2F7D4A]">
              <AppIcon name="package" size={20} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-gray-800">
                Manage Items
              </p>
              <p className="mt-1 text-xs text-gray-400">Marketplace catalog</p>
            </div>
            <AppIcon name="chevron-right" size={18} className="text-gray-400" />
          </a>
        </section>
      </div>
    </div>
  );
}
