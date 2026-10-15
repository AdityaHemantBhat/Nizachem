import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/animations/setup'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

const VARIANTS = {
  rise: { from: { y: 30, opacity: 0 }, to: { y: 0, opacity: 1 } },
  fade: { from: { opacity: 0 }, to: { opacity: 1 } },
  settle: { from: { yPercent: 9, scale: 1.07 }, to: { yPercent: 0, scale: 1 } },
}

/**
 * Scroll-in reveal. Nothing is hidden by CSS, so the content stays readable
 * without JS and for reduced-motion users.
 */
export function Reveal({
  as: Tag = 'div',
  variant = 'rise',
  delay = 0,
  stagger = 0,
  duration = 0.95,
  start = 'top 88%',
  className = '',
  children,
}) {
  const ref = useRef(null)
  const reduced = usePrefersReducedMotion()

  useGSAP(
    () => {
      if (reduced || !ref.current) return

      const targets =
        stagger > 0 && ref.current.children.length
          ? Array.from(ref.current.children)
          : ref.current

      const { from, to } = VARIANTS[variant] ?? VARIANTS.rise

      gsap.fromTo(targets, from, {
        ...to,
        duration,
        delay,
        stagger,
        ease: 'expo.out',
        immediateRender: true,
        scrollTrigger: { trigger: ref.current, start, once: true },
        onComplete: () => gsap.set(targets, { clearProps: 'transform,opacity' }),
      })
    },
    { scope: ref, dependencies: [reduced, variant] },
  )

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}

export default Reveal
