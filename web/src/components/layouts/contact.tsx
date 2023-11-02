import ContactForm from "../contact-form"

export default function Contact() {
  return (
    <section
      className="container grid w-full grid-cols-1 items-center gap-8 py-12 md:grid-cols-[4fr_3fr] md:gap-20"
      id="contato"
    >
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-brand-blue">Entre em contato</h2>
        <p className="max-w-[400px] text-sky-700 md:text-lg">
          Estamos ansiosos para ouvir você e ajudar a trazer sua visão para o
          mundo digital. Entre em contato conosco hoje e descubra como nossos
          especialistas podem criar soluções personalizadas que atendam às suas
          necessidades.
          <br />
          Seja para discutir um projeto existente ou iniciar uma nova parceria,
          nossa equipe está pronta para transformar suas ideias em realidade
          digital.
        </p>
      </div>

      <ContactForm />
    </section>
  )
}
