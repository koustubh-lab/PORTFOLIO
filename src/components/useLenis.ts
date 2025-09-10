import Lenis from "@studio-freight/lenis"
import gsap from "gsap"
import { useEffect } from "react"

export default function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      lerp: 0.05,
      smoothWheel: true,
    })

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000) // GSAP drives Lenis
    })

    return () => {
      gsap.ticker.remove(lenis.raf)
      lenis.destroy()
    }
  }, [])
}
