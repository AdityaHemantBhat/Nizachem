/**
 * Shared SVG defs: Portuguese-Goan colonial arches, wave cutouts,
 * scalloped stamp badges, authentic azulejo patterns, and coastal vector motifs.
 */
export function SvgDefs() {
  return (
    <svg aria-hidden="true" focusable="false" width="0" height="0" className="absolute pointer-events-none">
      <defs>
        {/* Classical Portuguese-Goan window arch */}
        <clipPath id="arch-clip" clipPathUnits="objectBoundingBox">
          <path d="M0,1 V0.42 C0,0.18 0.22,0 0.5,0 C0.78,0 1,0.18 1,0.42 V1 Z" />
        </clipPath>

        {/* Tall Cathedral Arch */}
        <clipPath id="tall-arch-clip" clipPathUnits="objectBoundingBox">
          <path d="M0,1 V0.3 C0,0.12 0.22,0 0.5,0 C0.78,0 1,0.12 1,0.3 V1 Z" />
        </clipPath>

        {/* Coastal organic wave mask */}
        <clipPath id="wave-clip" clipPathUnits="objectBoundingBox">
          <path d="M 0,0 L 1,0 L 1,0.92 C 0.8,0.98 0.6,0.88 0.4,0.95 C 0.2,1.01 0.1,0.93 0,0.97 Z" />
        </clipPath>

        {/* Scalloped postage stamp badge */}
        <clipPath id="stamp-clip" clipPathUnits="objectBoundingBox">
          <path d="M0.05,0 C0.05,0.03 0.08,0.05 0.11,0.05 C0.14,0.05 0.17,0.03 0.17,0 H0.28 C0.28,0.03 0.31,0.05 0.34,0.05 C0.37,0.05 0.4,0.03 0.4,0 H0.51 C0.51,0.03 0.54,0.05 0.57,0.05 C0.6,0.05 0.63,0.03 0.63,0 H0.74 C0.74,0.03 0.77,0.05 0.8,0.05 C0.83,0.05 0.86,0.03 0.86,0 H0.95 V0.11 C0.92,0.11 0.9,0.14 0.9,0.17 C0.9,0.2 0.92,0.23 0.95,0.23 V0.34 C0.92,0.34 0.9,0.37 0.9,0.4 C0.9,0.43 0.92,0.46 0.95,0.46 V0.57 C0.92,0.57 0.9,0.6 0.9,0.63 C0.9,0.66 0.92,0.69 0.95,0.69 V0.8 C0.92,0.8 0.9,0.83 0.9,0.86 C0.9,0.89 0.92,0.92 0.95,0.92 V1 H0.86 C0.86,0.97 0.83,0.95 0.8,0.95 C0.77,0.95 0.74,0.97 0.74,1 H0.63 C0.63,0.97 0.6,0.95 0.57,0.95 C0.54,0.95 0.51,0.97 0.51,1 H0.4 C0.4,0.97 0.37,0.95 0.34,0.95 C0.31,0.95 0.28,0.97 0.28,1 H0.17 C0.17,0.97 0.14,0.95 0.11,0.95 C0.08,0.95 0.05,0.97 0.05,1 H0 V0.92 C0.03,0.92 0.05,0.89 0.05,0.86 C0.05,0.83 0.03,0.8 0,0.8 V0.69 C0.03,0.69 0.05,0.66 0.05,0.63 C0.05,0.6 0.03,0.57 0,0.57 V0.46 C0.03,0.46 0.05,0.43 0.05,0.4 C0.05,0.37 0.03,0.34 0,0.34 V0.23 C0.03,0.23 0.05,0.2 0.05,0.17 C0.05,0.14 0.03,0.11 0,0.11 V0 Z" />
        </clipPath>

        {/* Intricate Azulejo Tile pattern with Portuguese floral geometric star */}
        <pattern id="tile-pattern" width="28" height="28" patternUnits="userSpaceOnUse">
          <g fill="none" stroke="currentColor" strokeWidth="0.85" strokeLinecap="round" strokeLinejoin="round">
            {/* Outer Diamond */}
            <path d="M14 1.5 L26.5 14 L14 26.5 L1.5 14 Z" opacity="0.9" />
            {/* Inner Quatrefoil Petals */}
            <path d="M14 6 C16 9 19 12 22 14 C19 16 16 19 14 22 C12 19 9 16 6 14 C9 12 12 9 14 6 Z" opacity="0.65" />
            {/* Corner Accents */}
            <path d="M0 14 H3.5 M28 14 H24.5 M14 0 V3.5 M14 28 V24.5" opacity="0.8" />
            <path d="M0 0 L4 4 M28 0 L24 4 M0 28 L4 24 M28 28 L24 24" opacity="0.45" />
          </g>
          {/* Central and Corner Dots */}
          <g fill="currentColor">
            <circle cx="14" cy="14" r="1.6" />
            <circle cx="0" cy="0" r="1.1" />
            <circle cx="28" cy="0" r="1.1" />
            <circle cx="0" cy="28" r="1.1" />
            <circle cx="28" cy="28" r="1.1" />
          </g>
        </pattern>

        {/* Organic Portuguese Tile Watermark for Cards */}
        <pattern id="azulejo-watermark" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M30 5 L55 30 L30 55 L5 30 Z" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.12" />
          <path d="M30 15 L45 30 L30 45 L15 30 Z" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.08" />
          <circle cx="30" cy="30" r="3" fill="currentColor" opacity="0.15" />
        </pattern>
      </defs>
    </svg>
  )
}

export default SvgDefs
