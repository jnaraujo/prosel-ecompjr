// code from https://ncoughlin.com/posts/react-router-v6-hash-links/
import { useMemo, useEffect } from "react"
import { useLocation } from "react-router-dom"

export default function ScrollToHashElement() {
  const location = useLocation()

  const hashElement = useMemo(() => {
    const hash = location.hash
    const removeHashCharacter = (str: string) => {
      const result = str.slice(1)
      return result
    }

    if (hash) {
      const element = document.getElementById(removeHashCharacter(hash))
      return element
    } else {
      return null
    }
  }, [location])

  useEffect(() => {
    if (hashElement) {
      hashElement.scrollIntoView({
        behavior: "smooth",
        inline: "nearest",
      })
    }
  }, [hashElement])

  return null
}
