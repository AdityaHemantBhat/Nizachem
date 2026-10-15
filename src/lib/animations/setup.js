import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'

gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin)

gsap.defaults({ ease: 'expo.out', duration: 0.9 })

export const EASE = 'expo.out'
export const DUR = { fast: 0.45, base: 0.9, slow: 1.2 }

export const scrollReveal = {
  start: 'top 86%',
  toggleActions: 'play none none none',
}

export { gsap, ScrollTrigger, SplitText, DrawSVGPlugin }
