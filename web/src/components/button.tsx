import { Slot } from "@radix-ui/react-slot"

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  asChild?: boolean
}
export default function Button({ children, asChild, ...props }: Props) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      className="block w-full rounded-md bg-brand-blue px-4 py-2 text-white transition duration-300 ease-in-out hover:bg-sky-700 hover:shadow-md md:text-lg"
      {...props}
    >
      {children}
    </Comp>
  )
}
