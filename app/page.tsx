import { Header } from "@/components/header"
import { DepartmentsPreview } from "@/components/departments-preview"
import { Footer } from "@/components/footer"
import {CouvreurServicesSection} from "@/components/couvreur-services-section";
import {CouvreurAdvantagesSection} from "@/components/couvreur-avantages-section";
import {CouvreurHeroSection} from "@/components/hero-section";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
          <CouvreurHeroSection />
          <DepartmentsPreview />
          <CouvreurAdvantagesSection />
          <CouvreurServicesSection />

      </main>
      <Footer />
    </div>
  )
}
