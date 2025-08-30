import { Header } from "@/components/header"
import { DepartmentsPreview } from "@/components/departments-preview"
import { Footer } from "@/components/footer"
import {CouvreurServicesSection} from "@/components/couvreur-services-section";
import {CouvreurAdvantagesSection} from "@/components/couvreur-avantages-section";
import {CouvreurHeroSection} from "@/components/hero-section";
import FAQ from "@/components/faq-section";

export default  function HomePage() {

    return (
        <div className="min-h-screen">
            {/* Balisage JSON-LD généré par l'outil d'aide au balisage de données structurées de Google */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    "@context": "http://schema.org",
                    "@type": "LocalBusiness",
                    "name": "Couvreur france ",
                    "image": "https://www.couvreur-groupefrance.com/og-image.png",
                    "telephone": "07 56 83 09 51",
                    "email": "groupcouvreurfrance@gmail.com",
                    "openingHoursSpecification": {
                        "@type": "OpeningHoursSpecification",
                        "dayOfWeek": {
                            "@type": "DayOfWeek",
                            "name": "Devis sous 24h, urgences 7j/7"
                        }
                    }
                })
            }} />
            <Header />
            <main>
                <CouvreurHeroSection />
                <DepartmentsPreview/>
                <CouvreurAdvantagesSection />
                <CouvreurServicesSection />


            </main>
            <Footer />
        </div>
    )
}