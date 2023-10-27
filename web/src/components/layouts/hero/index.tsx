import { Link } from "react-router-dom"
import Marquee from "react-fast-marquee"
import wave from "../../../assets/wave.svg"
import { images } from "./constants"

export default function Hero() {
  return (
    <section className="relative flex min-h-[95vh] flex-1 flex-col items-center justify-center md:gap-16">
      <div className="flex min-h-[400px] max-w-[530px] flex-col items-center justify-center gap-4 px-4 text-center">
        <h1 className="text-3xl font-bold text-zinc-800 md:text-5xl">
          Conquiste o <span className="text-brand-blue">Mundo Digital</span> com
          Soluções Sob Medida
        </h1>
        <p className="text-zinc-600 md:text-xl">
          Crie uma presença digital única com nossas soluções personalizadas. Do
          design à implementação, estamos aqui para atender às suas demandas.
        </p>

        <Link
          className="bg-brand-blue block w-full rounded-md px-4 py-2 text-white transition duration-300 ease-in-out hover:bg-sky-700 hover:shadow-md md:text-lg"
          to="/#contato"
        >
          Entre em contato
        </Link>
      </div>

      <Marquee
        speed={20}
        className="h-48 px-6"
        gradient={false}
        autoFill={true}
        pauseOnHover={true}
      >
        {images.map((item) => (
          <div
            key={item}
            className="mx-4 h-48 overflow-hidden rounded-md shadow-md transition duration-300 ease-in-out hover:shadow-xl"
          >
            <img src={item} alt="logo" className="aspect-video h-full" />
          </div>
        ))}
      </Marquee>

      <img
        src={wave}
        alt="wave"
        className="absolute -bottom-[1px] left-0 right-0 h-auto w-full"
      />
    </section>
  )
}
