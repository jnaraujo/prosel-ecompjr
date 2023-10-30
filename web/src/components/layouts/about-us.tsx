import image from "../../assets/aboutus.webp"

export default function AboutUs() {
  return (
    <section className="bg-brand-blue">
      <div className="container grid w-full grid-cols-1 items-center gap-8 py-12 md:grid-cols-[3fr_2fr] md:gap-20">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-zinc-50">Quem somos</h2>
          <p className="max-w-[450px] text-zinc-100 md:text-lg">
            Empresa Júnior de Engenharia de Computação, composta por alunos do
            curso da Universidade Estadual de Feira de Santana, que promove
            impactos positivos em micro e pequenas empresas por meio de soluções
            tecnológicas.
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
  )
}
