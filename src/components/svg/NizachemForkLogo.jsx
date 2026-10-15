/**
 * The official Nizachem Fork & Coastal Hand Emblem.
 * Faithfully vectorized from the restaurant's hand-painted signboard in Curtorim:
 * - Slanted fork handle with solid organic palm
 * - 5 curved coastal tines (resembling fingers, palm roots & sea tentacles)
 * - The sketched "गोंय" (Goa) oval ring swoosh
 */

export function NizachemForkLogo({ className = '', size = 38, color = 'currentColor' }) {
  // Natural aspect ratio: 80 x 80
  return (
    <svg
      viewBox="0 0 84 84"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 select-none overflow-visible ${className}`}
      aria-hidden="true"
    >
      {/* =========================================================
          THE FORK & HAND SILHOUETTE
         ========================================================= */}
      {/* 1. Diagonal Fork Handle */}
      <path
        d="M 72 4 C 64 14, 52 24, 43 33"
        stroke={color}
        strokeWidth="3.4"
        strokeLinecap="round"
      />

      {/* 2. Solid Fork Base / Palm */}
      <path
        d="M 42 30 C 46 31, 50 35, 47 41 C 41 49, 34 53, 31 56 C 28 50, 31 41, 37 34 Z"
        fill={color}
      />

      {/* 3. Five Coastal Tines / Fingers */}
      {/* Tine 1 (Outer left thumb curve) */}
      <path
        d="M 37 38 C 30 46, 20 56, 10 63"
        stroke={color}
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      {/* Tine 2 (Long down-left sweep) */}
      <path
        d="M 39 41 C 34 50, 26 62, 19 72"
        stroke={color}
        strokeWidth="2.8"
        strokeLinecap="round"
      />
      {/* Tine 3 (Center prong with drop curve) */}
      <path
        d="M 41 43 C 38 53, 33 65, 29 76 C 28 78, 25 77, 26 74 C 28 66, 33 55, 37 45"
        fill={color}
      />
      {/* Tine 4 (Down-right taper) */}
      <path
        d="M 43 43 C 44 51, 42 61, 40 71"
        stroke={color}
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      {/* Tine 5 (Rightmost prong) */}
      <path
        d="M 45 42 C 49 49, 52 56, 53 64"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      {/* =========================================================
          THE OVAL CARTOUCHE WITH "गोंय" (GOA)
         ========================================================= */}
      <g className="seal-ring">
        {/* Dynamic Sketched Oval Swoosh wrapping from underneath tines */}
        <path
          d="M 28 69 C 34 76, 52 81, 65 74 C 77 67, 78 52, 68 46 C 58 40, 44 45, 41 53"
          stroke={color}
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        {/* Secondary inner contour sketch line */}
        <path
          d="M 34 72 C 40 77, 56 80, 66 73"
          stroke={color}
          strokeWidth="1"
          strokeOpacity="0.65"
          strokeLinecap="round"
        />

        {/* Konkani Calligraphy "गोंय" inside the ring */}
        <text
          x="57"
          y="61"
          textAnchor="middle"
          fontFamily="'Noto Serif Devanagari', Georgia, serif"
          fontSize="14"
          fontWeight="800"
          fill={color}
          letterSpacing="0.02em"
        >
          गोंय
        </text>

        {/* Small subtitle under "गोंय" */}
        <text
          x="57"
          y="69"
          textAnchor="middle"
          fontFamily="monospace"
          fontSize="5.2"
          fontWeight="bold"
          letterSpacing="0.1em"
          fill={color}
          opacity="0.8"
        >
          CURTORIM
        </text>
      </g>
    </svg>
  )
}

export default NizachemForkLogo
