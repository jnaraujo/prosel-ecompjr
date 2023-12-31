import image from "../../assets/aboutus.webp"
import Wave2 from "@/assets/wave2.svg?react"

export default function AboutUs() {
  return (
    <>
      <Wave2 className="abs pointer-events-none -mb-[1px] h-auto w-full bg-gradient-to-t from-blue-100 to-transparent" />
      <section className="z-10 bg-brand-blue">
        <div className="container grid w-full grid-cols-1 items-center gap-8 py-12 md:grid-cols-[3fr_2fr] md:gap-20">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-zinc-50">Quem somos</h2>
            <p className="max-w-[450px] text-zinc-100 md:text-lg">
              Empresa Júnior de Engenharia de Computação, composta por alunos do
              curso da Universidade Estadual de Feira de Santana, que promove
              impactos positivos em micro e pequenas empresas por meio de
              soluções tecnológicas.
              <br />
              Fundada em 2007, a EcompJr atualmente participa ativamente do
              propósito que envolve ser Movimento Empresa Júnior. A empresa
              promove uma vivência empresarial estratégica para estudantes
              interessados em liderar a mudança no atual cenário brasileiro.
            </p>
          </div>

          <img
            className="w-full justify-self-end rounded-xl md:h-[350px] md:w-fit"
            src={image}
            alt="EcompJr"
            width={500}
            height={500}
          />
        </div>
      </section>
      <Wave2 className="pointer-events-none -mt-[1px] h-auto w-full rotate-180 bg-gradient-to-t from-blue-100 to-transparent" />
    </>
  )
}
