/**
 * Elegant sweeping architectural and landscape curves for Story section transitions.
 * Distinct from repetitive ocean waves: broad, low-frequency, graceful single-sweep contours
 * that evoke Goan landscape terraces and heritage archways.
 */
export function StoryCurveDivider({
  variant = 'sweep-right',
  fill = 'var(--color-ivory)',
  bg = 'transparent',
  height = 56,
  className = '',
  strokeColor = 'var(--color-chilli)',
  strokeOpacity = 0.32,
  flip = false,
  inverted = false,
  showAccent = true,
}) {
  const curves = {
    // Smooth asymmetric sweep: low left, gentle rise right
    'sweep-right': {
      stroke: 'M0,38 C380,78 860,14 1440,54',
      fill: 'M0,38 C380,78 860,14 1440,54 L1440,90 L0,90 Z',
    },
    // Harmonious counter-sweep: gentle crest left, soft slope right
    'sweep-left': {
      stroke: 'M0,54 C480,14 960,78 1440,38',
      fill: 'M0,54 C480,14 960,78 1440,38 L1440,90 L0,90 Z',
    },
    // Wide architectural arch: expansive soft Goan archway
    arch: {
      stroke: 'M0,64 C420,18 1020,18 1440,64',
      fill: 'M0,64 C420,18 1020,18 1440,64 L1440,90 L0,90 Z',
    },
    // Gentle landscape terrace: subtle double-stage contour
    terrace: {
      stroke: 'M0,34 C300,60 560,26 840,62 C1100,92 1320,42 1440,48',
      fill: 'M0,34 C300,60 560,26 840,62 C1100,92 1320,42 1440,48 L1440,90 L0,90 Z',
    },
  }

  const selected = curves[variant] || curves['sweep-right']

  return (
    <div
      aria-hidden="true"
      role="presentation"
      className={`relative w-full overflow-hidden leading-none select-none pointer-events-none ${className}`}
      style={{
        backgroundColor: bg,
        transform: `${flip ? 'scaleX(-1)' : ''} ${inverted ? 'scaleY(-1)' : ''}`.trim() || undefined,
      }}
    >
      <svg
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        className="block w-full"
        style={{ height }}
      >
        {/* Curved section fill */}
        <path d={selected.fill} fill={fill} />

        {/* Primary hairline accent contour */}
        {showAccent && (
          <>
            <path
              d={selected.stroke}
              fill="none"
              stroke={strokeColor}
              strokeWidth="1.8"
              strokeOpacity={strokeOpacity}
            />
            {/* Subtle shadow hairline for physical paper/stone depth */}
            <path
              d={selected.stroke}
              transform="translate(0, 1.5)"
              fill="none"
              stroke="var(--color-ink)"
              strokeWidth="0.8"
              strokeOpacity="0.08"
            />
          </>
        )}
      </svg>
    </div>
  )
}
