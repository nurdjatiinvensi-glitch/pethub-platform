import Link from "next/link";
import AppIcon from "../ui/AppIcon";

const services = [
  {
    title: "Klinik Hewan",
    description:
      "Temukan layanan kesehatan untuk menjaga sahabatmu tetap sehat.",
    icon: "stethoscope",
    href: "#layanan",
    color: "bg-[#EEF7F1] text-[#2F7D4A]",
  },
  {
    title: "Grooming",
    description: "Perawatan kebersihan dan penampilan agar hewanmu nyaman.",
    icon: "sparkles",
    href: "#layanan",
    color: "bg-orange-50 text-[#F28C28]",
  },
  {
    title: "Penitipan Hewan",
    description: "Pilihan tempat penitipan saat kamu memiliki kesibukan.",
    icon: "heart",
    href: "#layanan",
    color: "bg-blue-50 text-blue-600",
  },
  {
    title: "Adopsi",
    description: "Buka kesempatan bagi hewan untuk menemukan keluarga baru.",
    icon: "paw",
    href: "#komunitas",
    color: "bg-purple-50 text-purple-600",
  },
] as const;

export default function ServicesSection() {
  return (
    <section
      id="layanan"
      aria-labelledby="services-heading"
      className="py-4 sm:py-5"
    >
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#2F7D4A]">
          Layanan untuk sahabatmu
        </p>

        <h2
          id="services-heading"
          className="mt-1 text-lg font-semibold tracking-tight text-gray-900 sm:text-xl"
        >
          Temukan layanan terbaik
        </h2>

        <p className="mt-1 max-w-xl text-xs leading-5 text-gray-500 sm:text-sm">
          Dari perawatan kesehatan hingga kebutuhan sehari-hari, temukan layanan
          yang sesuai untuk hewan kesayanganmu.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3 xl:grid-cols-4">
        {services.map((service) => (
          <article
            key={service.title}
            className="group rounded-xl border border-gray-100 bg-white p-3 transition-all hover:border-[#2F7D4A]/25 hover:shadow-sm sm:p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${service.color}`}
              >
                <AppIcon name={service.icon} size={20} />
              </span>

              <span className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-colors group-hover:bg-[#EEF7F1] group-hover:text-[#2F7D4A]">
                <AppIcon name="arrow-right" size={17} />
              </span>
            </div>

            <h3 className="mt-3 text-sm font-semibold text-gray-900">
              {service.title}
            </h3>

            <p className="mt-1 text-xs leading-5 text-gray-500">
              {service.description}
            </p>

            <Link
              href={service.href}
              className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#2F7D4A] hover:text-[#276A3F]"
            >
              Jelajahi layanan
              <AppIcon name="chevron-right" size={16} />
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
