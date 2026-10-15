import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, SplitText } from '@/lib/animations/setup'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { useIntro } from '@/lib/intro'

/**
 * Masked line-by-line text reveal using GSAP SplitText.
 * mode="scroll" plays once on entry.
 * mode="scrub"   ties each line to the scroll position (story paragraphs).
 * whenIntro      waits for the preloader to lift before playing.
 */
export function Lines({
  as: Tag = 'div',
  children,
  className = '',
  mode = 'scroll',
  scrub = 0.6,
  delay = 0,
  stagger = 0.085,
  start = 'top 86%',
  whenIntro = false,
  ...rest
}) {
  const ref = useRef(null)
  const played = useRef(false)
  const reduced = usePrefersReducedMotion()
  const { done } = useIntro()

  useGSAP(
    () => {
      if (reduced || !ref.current) return
      if (whenIntro && !done) return

      let split
      let cancelled = false

      const build = () => {
        if (cancelled || !ref.current) return

        split = SplitText.create(ref.current, {
          type: 'lines',
          mask: 'lines',
          autoSplit: true,
          onSplit(self) {
            if (mode === 'scrub') {
              return gsap.fromTo(
                self.lines,
                { yPercent: 55, opacity: 0.12 },
                {
                  yPercent: 0,
                  opacity: 1,
                  ease: 'none',
                  stagger: 0.12,
                  scrollTrigger: {
                    trigger: ref.current,
                    start: 'top 82%',
                    end: 'bottom 60%',
                    scrub,
                  },
                },
              )
            }
            if (played.current) {
              gsap.set(self.lines, { yPercent: 0, opacity: 1 })
              return
            }
            played.current = true
            return gsap.from(self.lines, {
              yPercent: 110,
              opacity: 0,
              duration: 1.05,
              delay,
              ease: 'expo.out',
              stagger,
              scrollTrigger: { trigger: ref.current, start, once: true },
            })
          },
        })
      }

      document.fonts.ready.then(build)

      return () => {
        cancelled = true
        split?.revert()
      }
    },
    { scope: ref, dependencies: [reduced, mode, done, whenIntro] },
  )

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  )
}

export default Lines
