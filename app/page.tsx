import Hero from "@/components/hero"
import Features from "@/components/features"
import Integration from "@/components/integration"
import Testimonials from "@/components/testimonials"
import Pricing from "@/components/pricing"
import Cta from "@/components/cta"
import HomeJsonLd from "@/components/seo/home-jsonld"

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <HomeJsonLd />
      <Hero />
      <Features />
      <Integration />
      <Testimonials />
      <Pricing />
      <Cta />
    </div>
  )
}
