import AboutUs from "../components/layouts/about-us"
import Contact from "../components/layouts/contact"
import Hero from "../components/layouts/hero"
import MissionVisionValues from "../components/layouts/mission-vision-values"
import OurServices from "../components/layouts/our-services"

export default function Home() {
  return (
    <>
      <Hero />
      <MissionVisionValues />
      <OurServices />
      <AboutUs />
      <Contact />
    </>
  )
}
