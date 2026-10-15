import { Sparkles } from 'lucide-react'

/**
 * One printed-menu row: dish name, dotted leader, tabular price, description.
 */
export function MenuItem({ name, desc, price, highlight = false, className = '' }) {
  return (
    <div className={`py-3.5 ${className}`}>
      <div className="flex items-baseline gap-3">
        <h3 className="font-display text-[1.12rem] leading-snug font-[500] display-quiet text-ink flex items-center">
          <span>{name}</span>
          {highlight && (
            <span aria-label="house favourite" className="ml-2 inline-flex items-center text-turmeric">
              <Sparkles className="size-3.5 fill-current" />
            </span>
          )}
        </h3>
        <span
          aria-hidden
          className="-translate-y-[0.32em] flex-1 border-b border-dotted border-ink/30 min-w-6"
        />
        <p className="font-body text-[0.98rem] font-medium tabular-nums text-ink whitespace-nowrap">
          ₹{price}
        </p>
      </div>
      {desc && <p className="mt-1 max-w-[52ch] text-[0.9rem] leading-relaxed text-ink-soft">{desc}</p>}
    </div>
  )
}

export default MenuItem
