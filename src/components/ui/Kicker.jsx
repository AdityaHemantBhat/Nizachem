export function Kicker({ en, kok, tone = 'soft', rule = true, className = '' }) {
  const toneClass =
    tone === 'cream' ? 'text-cream/70' : tone === 'chilli' ? 'text-chilli' : 'text-ink-soft'

  return (
    <p className={`kicker flex flex-wrap items-center gap-x-2.5 gap-y-1 ${toneClass} ${className}`}>
      {rule && <span aria-hidden className="block h-px w-6 bg-turmeric" />}
      {kok && (
        <span lang="kok" className="text-[0.95em] tracking-normal">
          {kok}
        </span>
      )}
      {kok && (
        <span aria-hidden className="opacity-50">
          ·
        </span>
      )}
      <span>{en}</span>
    </p>
  )
}

export default Kicker
