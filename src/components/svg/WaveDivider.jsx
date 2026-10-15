/**
 * Organic coastal wave cutouts for flowing section transitions.
 * Features smooth, high-amplitude, undulating curves reflecting the Goan shoreline.
 */
export function WaveDivider({
  fill = 'var(--color-cream)',
  bg = 'transparent',
  flip = false,
  inverted = false,
  height = 80,
  className = '',
  curvy = false,
  strokeColor,
  strokeOpacity,
}) {
  const viewBox = curvy ? '0 0 1440 120' : '0 0 1440 90'

  // Multi-crest, organic high-amplitude curve with rhythmic coastal swell
  const fillPath = curvy
    ? 'M0,52 C80,52 95,16 175,16 C270,16 295,104 395,104 C495,104 520,18 625,18 C730,18 755,102 865,102 C975,102 1000,20 1105,20 C1195,20 1215,100 1305,100 C1370,100 1385,54 1440,54 L1440,120 L0,120 Z'
    : 'M0,32 C280,72 520,12 840,48 C1120,78 1320,24 1440,38 L1440,90 L0,90 Z'

  const strokePath = curvy
    ? 'M0,52 C80,52 95,16 175,16 C270,16 295,104 395,104 C495,104 520,18 625,18 C730,18 755,102 865,102 C975,102 1000,20 1105,20 C1195,20 1215,100 1305,100 C1370,100 1385,54 1440,54'
    : 'M0,32 C280,72 520,12 840,48 C1120,78 1320,24 1440,38'

  const actualStrokeColor = strokeColor || (curvy ? 'var(--color-chilli)' : 'currentColor')
  const actualStrokeOpacity = strokeOpacity !== undefined ? strokeOpacity : (curvy ? 0.45 : 0.2)

  return (
    <div
      aria-hidden="true"
      role="presentation"
      className={`relative w-full overflow-hidden leading-none select-none ${className}`}
      style={{
        backgroundColor: bg,
        transform: `${flip ? 'scaleX(-1)' : ''} ${inverted ? 'scaleY(-1)' : ''}`.trim() || undefined,
      }}
    >
      <svg
        viewBox={viewBox}
        preserveAspectRatio="none"
        className="block w-full"
        style={{ height }}
      >
        <path d={fillPath} fill={fill} />
        {/* Primary organic coastal tide contour */}
        <path
          d={strokePath}
          fill="none"
          stroke={actualStrokeColor}
          strokeWidth={curvy ? '2.2' : '1.4'}
          strokeOpacity={actualStrokeOpacity}
        />
        {/* Delicate harmonic secondary ripple when curvy */}
        {curvy && (
          <path
            d={strokePath}
            transform="translate(0, -5)"
            fill="none"
            stroke="var(--color-turmeric)"
            strokeWidth="1.2"
            strokeOpacity="0.25"
          />
        )}
      </svg>
    </div>
  )
}

export default WaveDivider

