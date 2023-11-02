import {
  Building2,
  Layout,
  LayoutTemplate,
  Smartphone,
  type LucideProps,
  MonitorPlay,
} from "lucide-react"
import { type ForwardRefExoticComponent } from "react"

export default function OurServices() {
  return (
    <section className="container flex flex-col items-center gap-10 py-6 pt-12">
      <h2 className="text-3xl font-bold text-brand-blue">Nosso serviços</h2>

      <div className="grid w-full grid-cols-1 justify-items-center gap-8 md:grid-cols-2 md:gap-14">
        <Item
          title="Sites Estáticos"
          description="Oferecemos a criação de sites estáticos elegantes e funcionais. Com design cuidadosamente planejado, esses sites são ideais para apresentar informações de forma direta e profissional. Perfeitos para negócios que desejam uma presença online elegante e informativa."
          icon={Layout}
        />

        <Item
          title="Sites Dinâmicos"
          description="Nossos sites dinâmicos trazem vida à web. Eles são interativos, repletos de recursos e facilmente atualizáveis. Perfeitos para empresas que desejam um site que evolua junto com suas necessidades em constante mudança."
          icon={LayoutTemplate}
        />

        <Item
          title="Sistemas Web"
          description="Desenvolvemos sistemas web personalizados para atender às necessidades específicas do seu negócio. Desde gerenciamento de conteúdo até ferramentas avançadas de comércio eletrônico, nossos sistemas são a espinha dorsal da sua operação online."
          icon={Building2}
        />

        <Item
          title="Aplicativos Android e IOS"
          description="Transforme suas ideias em aplicativos móveis. Desenvolvemos aplicativos sob medida para iOS e Android que cativam os usuários e fornecem soluções práticas. Seja inovador no mercado de aplicativos."
          icon={Smartphone}
        />

        <Item
          title="Eventos Virtuais"
          description="Leve seus eventos para o mundo virtual. Oferecemos soluções completas para criar e hospedar eventos virtuais memoráveis. Desde conferências online até feiras comerciais virtuais, estamos aqui para garantir o sucesso do seu evento na web."
          icon={MonitorPlay}
        />
      </div>
    </section>
  )
}

interface ItemProps {
  title: string
  description: string
  icon: ForwardRefExoticComponent<LucideProps>
}
function Item({ title, description, icon: Icon }: ItemProps) {
  return (
    <div className="flex max-w-[300px] flex-col items-center space-y-2 text-center md:items-start md:text-start">
      <div className="flex items-center gap-2">
        <Icon className="text-brand-blue" size={48} />
        <h3 className="max-w-[150px] text-xl font-bold leading-6 text-brand-blue">
          {title}
        </h3>
      </div>
      <p className="text-brand-blue">{description}</p>
    </div>
  )
}
