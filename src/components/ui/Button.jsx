import { Link } from 'react-router-dom'

const base =
  'group relative inline-flex min-h-12 items-center justify-center gap-3 overflow-hidden rounded-full px-7 py-3 text-center font-body text-[0.8rem] font-medium tracking-[0.16em] uppercase no-underline select-none transition-all duration-500 ease-out-expo active:scale-[0.97]'

const variants = {
  primary:
    'bg-chilli text-cream border border-chilli-deep/40 shadow-[0_4px_20px_-2px_rgba(194,65,12,0.35)] hoverable:hover:shadow-[0_8px_28px_-2px_rgba(194,65,12,0.48)]',
  outline:
    'border border-ink/25 text-ink bg-transparent hoverable:hover:border-ink',
  cream:
    'bg-cream text-ink border border-cream-deep/60 shadow-[0_4px_16px_rgba(0,0,0,0.06)] hoverable:hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)]',
  ghostOnDark:
    'border border-cream/35 text-cream bg-cream/5 backdrop-blur-sm hoverable:hover:border-cream',
  gold:
    'bg-turmeric text-ink border border-turmeric/60 shadow-[0_4px_18px_rgba(234,179,8,0.3)] hoverable:hover:shadow-[0_8px_24px_rgba(234,179,8,0.45)]',
}

const fills = {
  primary: 'bg-chilli-deep',
  outline: 'bg-ink',
  cream: 'bg-cream-deep',
  ghostOnDark: 'bg-cream',
  gold: 'bg-ink',
}

const fillText = {
  outline: 'hoverable:group-hover:text-cream',
  ghostOnDark: 'hoverable:group-hover:text-ink',
  gold: 'hoverable:group-hover:text-cream',
}

export function Button({
  children,
  to,
  href,
  onClick,
  type = 'button',
  variant = 'primary',
  className = '',
  ariaLabel,
  showArrow = false,
}) {
  const classes = `${base} ${variants[variant] ?? variants.primary} ${className}`

  const inner = (
    <>
      {/* Expanding background fill on hover */}
      <span
        aria-hidden
        className={`absolute inset-0 origin-bottom scale-y-0 rounded-full transition-transform duration-500 ease-out-expo hoverable:group-hover:scale-y-100 ${fills[variant] ?? fills.primary}`}
      />

      {/* Dual-layer rolling text (Awwwards editorial effect) */}
      <span
        className={`relative z-10 flex items-center gap-2.5 transition-colors duration-400 ${
          fillText[variant] ?? ''
        }`}
      >
        <span className="relative block h-[1.3em] overflow-hidden leading-[1.3em]">
          <span className="block transition-transform duration-500 ease-out-expo hoverable:group-hover:-translate-y-full">
            {children}
          </span>
          <span
            aria-hidden
            className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-out-expo hoverable:group-hover:translate-y-0"
          >
            {children}
          </span>
        </span>

        {showArrow && (
          <span
            aria-hidden
            className="inline-flex size-5 items-center justify-center rounded-full bg-current/15 text-[0.75em] transition-transform duration-500 ease-out-expo hoverable:group-hover:translate-x-1"
          >
            →
          </span>
        )}
      </span>
    </>
  )

  if (to) {
    return (
      <Link to={to} className={classes} aria-label={ariaLabel}>
        {inner}
      </Link>
    )
  }
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={classes}
        aria-label={ariaLabel}
      >
        {inner}
      </a>
    )
  }
  return (
    <button type={type} onClick={onClick} className={classes} aria-label={ariaLabel}>
      {inner}
    </button>
  )
}

export default Button

