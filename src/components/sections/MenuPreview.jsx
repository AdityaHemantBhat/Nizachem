import { useId, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { site } from '@/content/site'
import { Lines } from '@/components/ui/Lines'
import { MenuItem } from '@/components/ui/MenuItem'
import { Button } from '@/components/ui/Button'
import { TileBorder } from '@/components/svg/TileBorder'
import { HeritageBadge } from '@/components/ui/HeritageBadge'

export function MenuPreview({ limit = 4 }) {
  const [active, setActive] = useState(0)
  const tabs = useRef([])
  const uid = useId()

  const onKeyDown = (event) => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return
    event.preventDefault()
    const count = site.menu.length
    const next = event.key === 'ArrowRight' ? (active + 1) % count : (active - 1 + count) % count
    setActive(next)
    tabs.current[next]?.focus()
  }

  const category = site.menu[active]
  const items = category.items.slice(0, limit)
  const remaining = site.menu.reduce((sum, c) => sum + c.items.length, 0)

  return (
    <section id="menu" aria-labelledby="menu-preview-heading" className="relative pt-10 pb-14 sm:pt-14 sm:pb-18 lg:pt-16 lg:pb-20 bg-cream">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <HeritageBadge kok="जेवण" label="Our Menu" />
            <Lines as="h2" id="menu-preview-heading" className="mt-5 text-display-2 display-wonk text-ink">
              What&rsquo;s cooking tonight.
            </Lines>
          </div>
          <Button to="/menu" variant="outline" showArrow className="hidden lg:inline-flex">
            Explore full menu ({remaining})
          </Button>
        </div>

        {/* Menu Card Container */}
        <div className="relative mt-8 sm:mt-10 overflow-hidden rounded-[28px] sm:rounded-[32px] border border-ink/15 bg-ivory shadow-xs">
          <TileBorder height={18} />

          <div className="px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
            {/* Category Pills Tablist */}
            <div
              role="tablist"
              aria-label="Menu categories"
              onKeyDown={onKeyDown}
              className="flex flex-wrap gap-2 pb-6 border-b border-ink/10"
            >
              {site.menu.map((c, i) => (
                <button
                  key={c.category}
                  ref={(el) => (tabs.current[i] = el)}
                  type="button"
                  role="tab"
                  id={`${uid}-tab-${i}`}
                  aria-selected={i === active}
                  aria-controls={`${uid}-panel-${i}`}
                  tabIndex={i === active ? 0 : -1}
                  onClick={() => setActive(i)}
                  className={`relative rounded-full px-5 py-2.5 text-[0.78rem] font-medium tracking-[0.14em] uppercase transition-all duration-300 ${
                    i === active ? 'text-cream shadow-xs' : 'text-ink-soft hoverable:hover:text-ink hoverable:hover:bg-cream-deep/60'
                  }`}
                >
                  {i === active && (
                    <motion.span
                      layoutId="menu-pill-tab"
                      className="absolute inset-0 rounded-full bg-chilli"
                      transition={{ type: 'spring', stiffness: 440, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{c.category}</span>
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active}
                role="tabpanel"
                id={`${uid}-panel-${active}`}
                aria-labelledby={`${uid}-tab-${active}`}
                tabIndex={0}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="mt-8 grid gap-x-16 lg:grid-cols-2"
              >
                {items.map((item) => (
                  <MenuItem key={item.name} {...item} className="border-b border-ink/10 last:border-0" />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <TileBorder height={18} />
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-5">
          <p className="text-[0.88rem] text-ink-soft">
            {remaining} dishes on the full menu · All curries ground fresh on granite · Tell us your preferred spice level.
          </p>
          <Button to="/menu" variant="outline" showArrow className="lg:hidden">
            See the full menu
          </Button>
        </div>
      </div>
    </section>
  )
}

export default MenuPreview

