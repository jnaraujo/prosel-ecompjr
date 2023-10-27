import Button from "../button"
import toast from "react-hot-toast"

export default function Contact() {
  function submitMessage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    toast.success("Mensagem enviada com sucesso!")
  }

  return (
    <section
      className="container grid w-full grid-cols-1 items-center gap-8 py-12 md:grid-cols-[4fr_3fr] md:gap-20"
      id="contato"
    >
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-brand-blue">Entre em contato</h2>
        <p className="max-w-[400px] text-brand-blue md:text-lg">
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

      <div>
        <form onSubmit={submitMessage} className="flex flex-col space-y-2">
          <div className="space-y-1">
            <label htmlFor="name" className="text-sm text-zinc-600">
              Nome: <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              name="name"
              className="w-full rounded-md border border-gray-300 p-2 placeholder-gray-400 outline-none focus:border-brand-blue"
              type="text"
              placeholder="João da Silva"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="text-sm text-zinc-600">
              Email: <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              name="email"
              className="w-full rounded-md border border-gray-300 p-2 placeholder-gray-400 outline-none focus:border-brand-blue"
              type="email"
              placeholder="Ex: john@exemplo.com"
              required
            />
          </div>

          <div>
            <label htmlFor="message" className="text-sm text-zinc-600">
              Mensagem: <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              className="w-full resize-none rounded-md border border-gray-300 p-2 placeholder-gray-400 outline-none focus:border-brand-blue"
              cols={30}
              rows={7}
              placeholder="Ex: Olá, gostaria de um orçamento para..."
              required
            ></textarea>
          </div>
          <Button type="submit">Enviar mensagem</Button>
        </form>
      </div>
    </section>
  )
}
