import AppShell from "./components/layout/AppShell";

import ArticleSection from "./components/home/ArticleSection";
import CategorySection from "./components/home/CategorySection";
import CommunityBanner from "./components/home/CommunityBanner";
import FeaturedProducts from "./components/home/FeaturedProducts";
import FeedCareBanner from "./components/home/FeedCareBanner";
import HeroSection from "./components/home/HeroSection";
import ServicesSection from "./components/home/ServicesSection";
import SponsorPartnerSlot from "./components/home/SponsorPartnerSlot";

export default function HomePage() {
  return (
    <AppShell>
      <div className="mx-auto w-full max-w-[1600px] px-3 py-3 pb-24 sm:px-4 sm:py-4 lg:px-5 lg:py-5 lg:pb-8">
        <HeroSection />

        <CategorySection />

        <div className="grid grid-cols-1 items-start gap-4 xl:grid-cols-[minmax(0,2fr)_minmax(250px,0.82fr)] xl:gap-4">
          <div className="min-w-0">
            <FeedCareBanner />
            <FeaturedProducts />
            <ServicesSection />
            <ArticleSection />
            <CommunityBanner />
          </div>

          <aside className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 xl:sticky xl:top-4 xl:grid-cols-1">
            <SponsorPartnerSlot
              size="featured"
              title="Promosikan Brand Anda"
              description="Area promosi untuk brand dan perusahaan yang ingin menjangkau komunitas pecinta hewan di PetHub."
            />

            <SponsorPartnerSlot
              title="Sponsor Program PetHub"
              description="Tempat untuk program sponsor, kampanye sosial, atau dukungan kegiatan komunitas."
            />

            <SponsorPartnerSlot
              title="Kolaborasi Bersama"
              description="Ruang untuk klinik, penyedia layanan, komunitas, dan mitra bisnis."
            />
          </aside>
        </div>
      </div>
    </AppShell>
  );
}
