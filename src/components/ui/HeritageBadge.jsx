import { memo } from 'react'

/**
 * Artisanal Goan Heritage Badge & Section Eyebrow
 * Replaces generic AI SaaS rounded-pill capsules with authentic
 * Portuguese Azulejo tile plaques and editorial letterpress labels.
 */
export const HeritageBadge = memo(function HeritageBadge({
  kok,
  label,
  children,
  variant = 'tile',
  color = 'chilli',
  className = '',
}) {
  // Theme color palettes
  const colorMap = {
    chilli: {
      border: 'border-chilli/40',
      inlay: 'shadow-[inset_0_0_0_1.5px_#FBF7EE,inset_0_0_0_2.5px_rgba(155,35,24,0.22)]',
      textKok: 'text-chilli',
      textLabel: 'text-ink/85',
      ornament: 'text-chilli/75',
      line: 'bg-chilli/25',
      bg: 'bg-ivory/95',
    },
    sea: {
      border: 'border-sea/40',
      inlay: 'shadow-[inset_0_0_0_1.5px_#FBF7EE,inset_0_0_0_2.5px_rgba(42,109,104,0.22)]',
      textKok: 'text-sea',
      textLabel: 'text-ink/85',
      ornament: 'text-sea/75',
      line: 'bg-sea/25',
      bg: 'bg-ivory/95',
    },
    turmeric: {
      border: 'border-turmeric/60',
      inlay: 'shadow-[inset_0_0_0_1.5px_#FBF7EE,inset_0_0_0_2.5px_rgba(217,143,36,0.3)]',
      textKok: 'text-ink',
      textLabel: 'text-ink/90',
      ornament: 'text-turmeric',
      line: 'bg-turmeric/40',
      bg: 'bg-ivory/95',
    },
    ink: {
      border: 'border-ink/25',
      inlay: 'shadow-[inset_0_0_0_1.5px_#FBF7EE,inset_0_0_0_2.5px_rgba(30,24,18,0.15)]',
      textKok: 'text-ink',
      textLabel: 'text-ink-soft',
      ornament: 'text-ink/50',
      line: 'bg-ink/20',
      bg: 'bg-ivory/95',
    },
  }

  const theme = colorMap[color] || colorMap.chilli

  // Variant 1: Portuguese Azulejo Ceramic Tile Plaque (Authentic Inset Double-Hairline)
  if (variant === 'tile') {
    return (
      <div
        className={`inline-flex items-center gap-2.5 rounded-[3px] border ${theme.border} ${theme.bg} ${theme.inlay} px-3.5 py-1.5 shadow-[0_2px_8px_-2px_rgba(30,24,18,0.06)] select-none ${className}`}
      >
        {/* Left Portuguese Azulejo Tile Diamond Ornament */}
        <svg
          viewBox="0 0 12 12"
          className={`size-2.5 shrink-0 fill-current ${theme.ornament}`}
          aria-hidden="true"
        >
          <path d="M6 0 L12 6 L6 12 L0 6 Z M6 2.5 L9.5 6 L6 9.5 L2.5 6 Z" />
        </svg>

        {/* Konkani Devanagari Script */}
        {kok && (
          <span
            lang="kok"
            className={`font-kok text-[0.88rem] sm:text-[0.92rem] font-medium leading-none inline-flex items-center translate-y-[2px] ${theme.textKok}`}
          >
            {kok}
          </span>
        )}

        {/* Delicate Center Separator */}
        {kok && (label || children) && (
          <span className="text-ink/30 text-[0.75rem] leading-none select-none">
            ·
          </span>
        )}

        {/* English Kicker / Subtitle */}
        {label && (
          <span
            className={`font-sans text-[0.68rem] sm:text-[0.72rem] font-semibold tracking-[0.18em] uppercase leading-none inline-flex items-center ${theme.textLabel}`}
          >
            {label}
          </span>
        )}

        {children}

        {/* Right Portuguese Azulejo Tile Diamond Ornament */}
        <svg
          viewBox="0 0 12 12"
          className={`size-2.5 shrink-0 fill-current ${theme.ornament}`}
          aria-hidden="true"
        >
          <path d="M6 0 L12 6 L6 12 L0 6 Z M6 2.5 L9.5 6 L6 9.5 L2.5 6 Z" />
        </svg>
      </div>
    )
  }

  // Variant 2: Editorial Letterpress Rule (Classic book/magazine opening)
  if (variant === 'editorial') {
    return (
      <div
        className={`inline-flex items-center gap-3 select-none ${className}`}
      >
        <span className={`h-px w-6 sm:w-10 shrink-0 ${theme.line}`} aria-hidden="true" />
        <svg
          viewBox="0 0 12 12"
          className={`size-2 shrink-0 fill-current ${theme.ornament}`}
          aria-hidden="true"
        >
          <path d="M6 0 L12 6 L6 12 L0 6 Z" />
        </svg>

        <div className="inline-flex items-center gap-2">
          {kok && (
            <span
              lang="kok"
              className={`font-kok text-[0.9rem] sm:text-[0.96rem] font-medium leading-none inline-flex items-center translate-y-[2px] ${theme.textKok}`}
            >
              {kok}
            </span>
          )}

          {kok && (label || children) && (
            <span className="text-ink/35 text-[0.8rem] leading-none select-none">
              ·
            </span>
          )}

          {label && (
            <span
              className={`font-sans text-[0.7rem] sm:text-[0.74rem] font-semibold tracking-[0.2em] uppercase leading-none inline-flex items-center ${theme.textLabel}`}
            >
              {label}
            </span>
          )}

          {children}
        </div>

        <svg
          viewBox="0 0 12 12"
          className={`size-2 shrink-0 fill-current ${theme.ornament}`}
          aria-hidden="true"
        >
          <path d="M6 0 L12 6 L6 12 L0 6 Z" />
        </svg>
        <span className={`h-px w-6 sm:w-10 shrink-0 ${theme.line}`} aria-hidden="true" />
      </div>
    )
  }

  // Variant 3: Hand-Pressed Stamp Plaque (Authentic Curtorim tavern postmark)
  return (
    <div
      className={`inline-flex items-center gap-2 rounded-xs border-b border-t border-chilli/35 bg-ivory/60 px-3 py-1 select-none ${className}`}
    >
      {kok && (
        <span
          lang="kok"
          className={`font-kok text-[0.85rem] font-medium leading-none translate-y-[1.5px] ${theme.textKok}`}
        >
          {kok}
        </span>
      )}
      {kok && label && <span className="text-ink/30 text-xs">·</span>}
      {label && (
        <span
          className={`font-sans text-[0.68rem] font-semibold tracking-[0.16em] uppercase ${theme.textLabel}`}
        >
          {label}
        </span>
      )}
      {children}
    </div>
  )
})

export default HeritageBadge
