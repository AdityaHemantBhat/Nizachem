/**
 * Portuguese-Goan decorative ironwork and azulejo corner flourish.
 * Frames photos, quotes, and cards with authentic Goan colonial elegance.
 */
export function AzulejoCorner({
  position = 'top-left',
  size = 40,
  className = 'text-chilli/40',
}) {
  const transforms = {
    'top-left': '',
    'top-right': 'rotate(90deg)',
    'bottom-right': 'rotate(180deg)',
    'bottom-left': 'rotate(270deg)',
  }

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 48 48"
      width={size}
      height={size}
      className={`pointer-events-none select-none ${className}`}
      style={{ transform: transforms[position] }}
    >
      <path
        d="M2 46 V14 C2 7.37 7.37 2 14 2 H46"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M8 46 V18 C8 12.48 12.48 8 18 8 H46"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.6"
        strokeDasharray="2 3"
      />
      {/* Decorative floral bud */}
      <circle cx="16" cy="16" r="3.5" fill="currentColor" fillOpacity="0.8" />
      <circle cx="2" cy="46" r="2" fill="currentColor" />
      <circle cx="46" cy="2" r="2" fill="currentColor" />
    </svg>
  )
}

export default AzulejoCorner
