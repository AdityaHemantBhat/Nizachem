import { useId } from 'react'

/**
 * Awwwards-style rotating circular typography stamp with authentic Goan heritage motif.
 */
export function RotatingBadge({
  text = '★ NIZACHEM RESTAURANT & BAR ★ CURTORIM · SOUTH GOA ',
  size = 128,
  className = '',
  tone = 'terracotta',
  hasBackground = false,
}) {
  const rawId = useId()
  // Clean ID for valid SVG id reference without colons
  const pathId = `circlePath-${rawId.replace(/[^a-zA-Z0-9_-]/g, '')}`

  const colorMap = {
    terracotta: {
      text: 'text-chilli',
      stroke: 'stroke-chilli',
      fill: 'fill-chilli',
    },
    sea: {
      text: 'text-sea',
      stroke: 'stroke-sea',
      fill: 'fill-sea',
    },
    cream: {
      text: 'text-cream',
      stroke: 'stroke-cream',
      fill: 'fill-cream',
    },
    turmeric: {
      text: 'text-turmeric',
      stroke: 'stroke-turmeric',
      fill: 'fill-turmeric',
    },
    ink: {
      text: 'text-ink',
      stroke: 'stroke-ink',
      fill: 'fill-ink',
    },
  }

  const colors = colorMap[tone] ?? colorMap.terracotta

  return (
    <div
      aria-hidden="true"
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Outer rotating circular text and heritage rings */}
      <svg
        viewBox="0 0 100 100"
        className={`size-full animate-[spin_24s_linear_infinite] will-change-transform ${colors.text}`}
      >
        <defs>
          <path
            id={pathId}
            d="M 50, 50 m -38.5, 0 a 38.5,38.5 0 1,1 77,0 a 38.5,38.5 0 1,1 -77,0"
            fill="none"
          />
        </defs>

        {/* Solid Circular Heritage Plate Background (prevents bleeding when floating over imagery) */}
        {hasBackground && (
          <circle
            cx="50"
            cy="50"
            r="48.5"
            fill="var(--color-ivory, #FCF9F2)"
          />
        )}

        {/* Outer concentric heritage guide rings */}
        <circle
          cx="50"
          cy="50"
          r="48"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.85"
          className="opacity-40"
        />
        <circle
          cx="50"
          cy="50"
          r="46"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          strokeDasharray="1.5 1.5"
          className="opacity-25"
        />

        {/* Inner text boundary rings */}
        <circle
          cx="50"
          cy="50"
          r="30.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.85"
          className="opacity-40"
        />
        <circle
          cx="50"
          cy="50"
          r="28.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          strokeDasharray="1.5 1.5"
          className="opacity-25"
        />

        {/* Perfectly calibrated circular text with zero overlap */}
        <text
          className="font-body text-[6.5px] font-bold tracking-[0.18em] uppercase fill-current"
        >
          <textPath href={`#${pathId}`} textLength="236" lengthAdjust="spacing">
            {text}
          </textPath>
        </text>

        {/* Center Medallion Plate */}
        <circle
          cx="50"
          cy="50"
          r="16"
          fill="var(--color-ivory, #FCF9F2)"
          stroke="currentColor"
          strokeWidth="0.85"
          className="opacity-95"
        />
        <circle
          cx="50"
          cy="50"
          r="13.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          strokeDasharray="1.2 1.2"
          className="opacity-35"
        />

        {/* Authentic Portuguese Azulejo 8-pointed Compass Star centered at (50, 50) */}
        <g className="fill-current">
          <path d="M50 40.5 L51.8 48 L59.5 50 L51.8 52 L50 59.5 L48.2 52 L40.5 50 L48.2 48 Z" />
          <circle cx="50" cy="50" r="1.8" fill="var(--color-ivory, #FCF9F2)" />
          <circle cx="50" cy="50" r="0.9" />
        </g>
      </svg>
    </div>
  )
}

export default RotatingBadge
