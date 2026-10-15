/**
 * A single, consistent thin-line azulejo motif used as a section divider
 * and as the frame detail around the printed menu card. Nothing else.
 */
export function TileBorder({ className = '', height = 16, tone = 'ink' }) {
  const toneClass = tone === 'cream' ? 'text-cream/40' : tone === 'chilli' ? 'text-chilli/50' : 'text-ink/25'

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      role="presentation"
      height={height}
      className={`block w-full ${toneClass} ${className}`}
    >
      <rect width="100%" height="100%" fill="url(#tile-pattern)" />
    </svg>
  )
}

export default TileBorder
