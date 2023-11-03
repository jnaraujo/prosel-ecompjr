import AboutUs from "../../components/layouts/about-us"
import Contact from "../../components/layouts/contact"
import Hero from "../../components/layouts/hero"
import MissionVisionValues from "../../components/layouts/mission-vision-values"
import OurServices from "../../components/layouts/our-services"

export default function Home() {
  return (
    <>
      <main className="flex flex-1 flex-col">
        <Hero />
        <MissionVisionValues />
        <OurServices />
        <AboutUs />
        <Contact />
      </main>
    </>
  )
}
