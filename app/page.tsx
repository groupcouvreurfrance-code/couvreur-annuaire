import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { DepartmentsPreview } from "@/components/departments-preview"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <DepartmentsPreview />
      </main>
      <Footer />
    </div>
  )
}
