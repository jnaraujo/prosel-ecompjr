import { Link } from "react-router-dom"
import Marquee from "react-fast-marquee"
import Wave from "../../../assets/wave.svg?react"
import { images } from "./constants"
import Button from "../../button"

export default function Hero() {
  return (
    <section className="relative flex min-h-[90vh] flex-1 flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 md:min-h-[95vh] md:gap-16">
      <div className="flex min-h-[400px] max-w-[550px] flex-col items-center justify-center gap-4 px-4 text-center">
        <h1 className="font-poppins text-3xl font-bold text-zinc-800 md:text-5xl md:leading-[1.1]">
          Conquiste o <span className="text-brand-blue">Mundo Digital</span> com
          Soluções Sob Medida
        </h1>
        <p className="text-lg text-zinc-600">
          Crie uma presença digital única com nossas soluções personalizadas. Do
          design à implementação, estamos aqui para atender às suas demandas.
        </p>

        <Button asChild>
          <Link to="/#contato">Entre em contato</Link>
        </Button>
      </div>

      <div className="h-48 w-full overflow-hidden">
        <Marquee speed={20} className="px-6" gradient={false} autoFill={true}>
          {images.map((item) => (
            <div
              key={item}
              className="mx-4 h-36 overflow-hidden rounded-md shadow-md transition duration-300 ease-in-out hover:shadow-xl md:h-48"
            >
              <img
                src={item}
                alt="logo"
                className="aspect-video h-full object-cover object-center"
                height={192}
                width={341}
              />
            </div>
          ))}
        </Marquee>
      </div>

      <Wave className="pointer-events-none absolute -bottom-1 left-0 right-0 h-auto w-full" />
    </section>
  )
}
