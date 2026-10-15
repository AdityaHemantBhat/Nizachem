/**
 * Bespoke tactile editorial SVG artifacts for Nizachem's Story Page.
 * Hand-drawn aesthetics, postal cancellations, wax seals, and architectural cutaways.
 */

export function PostalCancellationStamp({ className = '', city = 'CURTORIM · GOA', date = 'OCT 2026' }) {
  return (
    <svg
      viewBox="0 0 160 80"
      width="160"
      height="80"
      fill="none"
      stroke="currentColor"
      className={`shrink-0 select-none ${className}`}
      aria-hidden="true"
    >
      {/* Circular Postmark */}
      <circle cx="40" cy="40" r="34" strokeWidth="2" strokeDasharray="3 1.5" />
      <circle cx="40" cy="40" r="28" strokeWidth="1" />
      <text
        x="40"
        y="25"
        textAnchor="middle"
        fontSize="7"
        fontWeight="bold"
        letterSpacing="0.15em"
        fill="currentColor"
        stroke="none"
        fontFamily="monospace"
      >
        {city}
      </text>
      <text
        x="40"
        y="43"
        textAnchor="middle"
        fontSize="8"
        fontWeight="800"
        letterSpacing="0.1em"
        fill="currentColor"
        stroke="none"
        fontFamily="monospace"
      >
        {date}
      </text>
      <text
        x="40"
        y="56"
        textAnchor="middle"
        fontSize="6.5"
        fontWeight="bold"
        letterSpacing="0.2em"
        fill="currentColor"
        stroke="none"
        fontFamily="monospace"
      >
        403 701
      </text>

      {/* Wavy Cancellation Lines */}
      <path
        d="M 80 24 Q 92 16, 104 24 T 128 24 T 152 24"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M 78 35 Q 90 27, 102 35 T 126 35 T 150 35"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M 82 46 Q 94 38, 106 46 T 130 46 T 154 46"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M 80 57 Q 92 49, 104 57 T 128 57 T 152 57"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function WaxSeal({ className = '', size = 64 }) {
  return (
    <svg
      viewBox="0 0 80 80"
      width={size}
      height={size}
      fill="none"
      className={`shrink-0 select-none drop-shadow-md ${className}`}
      aria-hidden="true"
    >
      {/* Irregular Melting Wax Edge */}
      <path
        d="M40 4 C48 3, 56 7, 63 13 C70 19, 76 27, 77 36 C78 45, 74 55, 68 62 C62 69, 53 75, 43 76 C33 77, 23 74, 15 67 C7 60, 3 50, 4 40 C5 30, 9 21, 16 14 C23 7, 31 5, 40 4 Z"
        fill="#852648"
        stroke="#5a152e"
        strokeWidth="1.5"
      />
      {/* Wax Rim Highlight */}
      <ellipse
        cx="40"
        cy="40"
        rx="28"
        ry="28"
        fill="#721f3d"
        stroke="#9e3559"
        strokeWidth="2"
      />
      {/* Embossed Ring */}
      <circle cx="40" cy="40" r="23" stroke="#5a152e" strokeWidth="1.2" strokeDasharray="2 1" />
      {/* Konkani Monogram or N */}
      <text
        x="40"
        y="47"
        textAnchor="middle"
        fontSize="22"
        fontFamily="'Noto Serif Devanagari', Georgia, serif"
        fontWeight="bold"
        fill="#f8d7da"
        stroke="#5a152e"
        strokeWidth="0.5"
      >
        नि
      </text>
    </svg>
  )
}

export function WashiTape({ className = '', width = 90, height = 24, tone = 'turmeric' }) {
  const bgStyles = {
    turmeric: 'bg-[#E5A93C]/40 border-[#C88A22]/40',
    chilli: 'bg-[#B23B2A]/30 border-[#8A2416]/40',
    sea: 'bg-[#2E5E4E]/30 border-[#1F4438]/40',
    paper: 'bg-[#EAE4D7]/70 border-[#D2C8B5]/60',
  }

  return (
    <div
      style={{ width: `${width}px`, height: `${height}px` }}
      className={`relative backdrop-blur-[1px] border-y shadow-xs select-none pointer-events-none ${bgStyles[tone] || bgStyles.turmeric} ${className}`}
    >
      {/* Jagged Left Tear */}
      <div className="absolute -left-[5px] top-0 bottom-0 w-[5px] overflow-hidden">
        <svg viewBox="0 0 10 40" preserveAspectRatio="none" className="h-full w-full fill-current text-cream">
          <path d="M10,0 L0,5 L8,10 L0,17 L9,25 L1,32 L10,40 Z" />
        </svg>
      </div>
      {/* Jagged Right Tear */}
      <div className="absolute -right-[5px] top-0 bottom-0 w-[5px] overflow-hidden">
        <svg viewBox="0 0 10 40" preserveAspectRatio="none" className="h-full w-full fill-current text-cream">
          <path d="M0,0 L10,6 L2,12 L10,20 L1,27 L9,34 L0,40 Z" />
        </svg>
      </div>
    </div>
  )
}

export function HandDrawnArrow({ className = '', width = 70, height = 40, flip = false }) {
  return (
    <svg
      viewBox="0 0 80 50"
      width={width}
      height={height}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 pointer-events-none ${flip ? 'scale-x-[-1]' : ''} ${className}`}
      aria-hidden="true"
    >
      <path
        d="M 10 15 C 30 5, 55 12, 68 35"
        strokeWidth="1.8"
        strokeDasharray="2 0.5"
      />
      {/* Arrowhead */}
      <path d="M 52 35 L 68 35 L 66 20" strokeWidth="2" />
    </svg>
  )
}

export function HandDrawnUnderline({ className = '' }) {
  return (
    <svg
      viewBox="0 0 240 16"
      preserveAspectRatio="none"
      fill="none"
      stroke="currentColor"
      className={`w-full h-3 select-none pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <path
        d="M 3 11 C 60 4, 150 14, 237 7"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M 20 13 C 85 8, 175 12, 225 10"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeOpacity="0.6"
      />
    </svg>
  )
}

export function BrassPaperclip({ className = '' }) {
  return (
    <svg
      viewBox="0 0 28 64"
      width="24"
      height="54"
      fill="none"
      stroke="#B89748"
      className={`shrink-0 select-none drop-shadow-sm ${className}`}
      aria-hidden="true"
    >
      <path
        d="M 8 16 V 48 C 8 55, 20 55, 20 48 V 10 C 20 3, 3 3, 3 12 V 52 C 3 61, 25 61, 25 50 V 20"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function ChalkCheckmark({ className = '', size = 20 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      className={`shrink-0 ${className}`}
      aria-hidden="true"
    >
      <path
        d="M 4 12 L 9 17 L 20 6"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function PushPin({ className = '', size = 52, tone = 'red' }) {
  const isRed = tone === 'red'
  const uid = `pin-${tone}`

  return (
    <svg
      viewBox="0 0 60 64"
      width={size}
      height={(size * 64) / 60}
      fill="none"
      className={`shrink-0 select-none pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <defs>
        {/* Soft shadow blur filter */}
        <filter id={`${uid}-blur`} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="2.5" />
        </filter>

        {/* Pin head 3D radial gradient */}
        <radialGradient id={`${uid}-head`} cx="30%" cy="26%" r="72%">
          {isRed ? (
            <>
              <stop offset="0%" stopColor="#FFA694" />
              <stop offset="22%" stopColor="#E53920" />
              <stop offset="65%" stopColor="#9C1A0C" />
              <stop offset="92%" stopColor="#5E0D05" />
              <stop offset="100%" stopColor="#350602" />
            </>
          ) : (
            <>
              <stop offset="0%" stopColor="#FFF3B0" />
              <stop offset="22%" stopColor="#E6B800" />
              <stop offset="65%" stopColor="#A67C00" />
              <stop offset="92%" stopColor="#5E4300" />
              <stop offset="100%" stopColor="#332400" />
            </>
          )}
        </radialGradient>

        {/* Needle steel metallic gradient */}
        <linearGradient id={`${uid}-steel`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#7A7E82" />
          <stop offset="35%" stopColor="#FFFFFF" />
          <stop offset="65%" stopColor="#ADB2B7" />
          <stop offset="100%" stopColor="#4A4E52" />
        </linearGradient>

        {/* Collar gradient */}
        <linearGradient id={`${uid}-collar`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={isRed ? "#C8321E" : "#C89600"} />
          <stop offset="100%" stopColor={isRed ? "#6E1408" : "#6E5000"} />
        </linearGradient>
      </defs>

      {/* 1. Diagonal cast shadow of pin head & body onto paper (light from top-left) */}
      <g filter={`url(#${uid}-blur)`} opacity="0.45">
        <ellipse cx="38" cy="46" rx="12" ry="6" fill="#18120C" transform="rotate(22 38 46)" />
        <path d="M26 33 L38 46 L31 49 L22 35 Z" fill="#18120C" />
        <ellipse cx="25" cy="50" rx="6.5" ry="2.6" fill="#18120C" />
      </g>

      {/* 2. Paper depression & puncture hole */}
      <ellipse cx="24" cy="51" rx="4.5" ry="1.8" fill="#120A05" opacity="0.88" />
      <ellipse cx="24" cy="51.6" rx="4" ry="0.75" fill="#FFFFFF" opacity="0.32" />

      {/* 3. Steel needle shaft entering the paper */}
      <path d="M22 30 L23.5 50 L24.5 50 L26 30 Z" fill={`url(#${uid}-steel)`} />
      <line x1="23.8" y1="30" x2="23.8" y2="49" stroke="#FFFFFF" strokeWidth="0.6" opacity="0.8" />

      {/* 4. Lower collar flange */}
      <ellipse cx="24" cy="30" rx="9.5" ry="3.5" fill={isRed ? "#5A0E05" : "#4A3600"} />
      <ellipse cx="24" cy="29" rx="9" ry="3.2" fill={`url(#${uid}-collar)`} />
      <ellipse cx="24" cy="28.5" rx="8" ry="2.2" fill="none" stroke="#FFA694" strokeWidth="0.6" opacity="0.55" />

      {/* 5. Tapered grip neck */}
      <path
        d="M17.5 17 C17.5 25 30.5 25 30.5 17 L29.5 14 C29.5 12 18.5 12 18.5 14 Z"
        fill={isRed ? "#8A170A" : "#7A5800"}
      />

      {/* 6. Spherical head */}
      <circle cx="24" cy="14" r="10.5" fill={`url(#${uid}-head)`} />

      {/* 7. Bottom bounce light rim */}
      <path
        d="M15 17 A 10.5 10.5 0 0 0 33 17"
        fill="none"
        stroke={isRed ? "#FF755A" : "#FFDF6D"}
        strokeWidth="1.2"
        opacity="0.35"
      />

      {/* 8. Specular high-gloss highlights */}
      <ellipse cx="20.5" cy="10" rx="4" ry="2" fill="#FFFFFF" opacity="0.9" transform="rotate(-28 20.5 10)" />
      <circle cx="26" cy="16" r="1.3" fill="#FFFFFF" opacity="0.45" />
    </svg>
  )
}

/**
 * Photorealistic Wire Paperclip Component
 * Hand-clipped tactile artifact matching classic stationery clips.
 * Supports colorful vinyl-coated metallic tones: gold, chilli, blue, green, purple, orange, etc.
 */
export function PaperClip({
  className = '',
  width = 28,
  height = 58,
  tone = 'gold',
  layer = 'both', // 'both' | 'back' | 'front'
  color = null,
}) {
  const toneColors = {
    gold: { main: '#D97706', dark: '#92400E', light: '#FDE68A' },
    chilli: { main: '#DC2626', dark: '#991B1B', light: '#FECACA' },
    blue: { main: '#2563EB', dark: '#1E40AF', light: '#BFDBFE' },
    green: { main: '#059669', dark: '#065F46', light: '#A7F3D0' },
    purple: { main: '#9333EA', dark: '#6B21A8', light: '#E9D5FF' },
    orange: { main: '#EA580C', dark: '#9A3412', light: '#FED7AA' },
    coral: { main: '#F43F5E', dark: '#9F1239', light: '#FECDD3' },
    teal: { main: '#0D9488', dark: '#115E59', light: '#99F6E4' },
    amber: { main: '#F59E0B', dark: '#B45309', light: '#FDE68A' },
    rose: { main: '#E11D48', dark: '#881337', light: '#FFE4E6' },
    lime: { main: '#65A30D', dark: '#3F6212', light: '#D9F99D' },
    cyan: { main: '#0284C7', dark: '#075985', light: '#BAE6FD' },
  }

  const palette = toneColors[tone] || (color ? { main: color, dark: '#18120C', light: '#FFFFFF' } : toneColors.gold)

  const showBack = layer === 'both' || layer === 'back'
  const showFront = layer === 'both' || layer === 'front'

  return (
    <svg
      viewBox="0 0 32 68"
      width={width}
      height={height}
      fill="none"
      className={`shrink-0 select-none pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {/* =========================================================================
          1. BACK WIRE LAYER (Sits behind the card edge; top arch arches in the air)
         ========================================================================= */}
      {showBack && (
        <g id="paperclip-back">
          {/* Ambient cast shadow behind the air loop */}
          <path
            d="M 12,17 L 12,46 A 3.5 3.5 0 0 0 19,46 L 19,14 A 6.5 6.5 0 0 0 6,14 L 6,24"
            stroke="#18120C"
            strokeWidth="3.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.14"
            transform="translate(0.8, 1.4)"
          />

          {/* Coated Wire Dark Underbelly */}
          <path
            d="M 12,17 L 12,46 A 3.5 3.5 0 0 0 19,46 L 19,14 A 6.5 6.5 0 0 0 6,14 L 6,24"
            stroke={palette.dark}
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.85"
            transform="translate(0.3, 0.3)"
          />

          {/* Main Vibrant Colored Wire Body */}
          <path
            d="M 12,17 L 12,46 A 3.5 3.5 0 0 0 19,46 L 19,14 A 6.5 6.5 0 0 0 6,14 L 6,24"
            stroke={palette.main}
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Cylindrical Highlight Shimmer */}
          <path
            d="M 12,17 L 12,24 M 19,14 A 6.5 6.5 0 0 0 6,14"
            stroke={palette.light}
            strokeWidth="0.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.85"
          />
        </g>
      )}

      {/* =========================================================================
          2. FRONT WIRE LAYER (Clamps firmly over the card edge and front photo)
         ========================================================================= */}
      {showFront && (
        <g id="paperclip-front">
          {/* Realistic Wire Contact Drop Shadow directly onto paper surface */}
          <path
            d="M 6,24 L 6,56 A 9.5 9.5 0 0 0 25,56 L 25,20"
            stroke="#18120C"
            strokeWidth="3.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.25"
            transform="translate(1.2, 2.2)"
          />

          {/* Coated Wire Dark Underbelly */}
          <path
            d="M 6,24 L 6,56 A 9.5 9.5 0 0 0 25,56 L 25,20"
            stroke={palette.dark}
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.85"
            transform="translate(0.3, 0.3)"
          />

          {/* Main Vibrant Colored Wire Body */}
          <path
            d="M 6,24 L 6,56 A 9.5 9.5 0 0 0 25,56 L 25,20"
            stroke={palette.main}
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Cylindrical Metallic Wire Highlight Shimmer */}
          <path
            d="M 6.4,24 L 6.4,55.6 A 9.1 9.1 0 0 0 24.6,55.6 L 24.6,20"
            stroke={palette.light}
            strokeWidth="0.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.85"
          />

          {/* Paper Pinch Contact Crease at the card edge entry points (Y = 24) */}
          <ellipse cx="6" cy="24" rx="2.8" ry="1.1" fill="#18120C" opacity="0.26" />
          <ellipse cx="25" cy="24" rx="2.8" ry="1.1" fill="#18120C" opacity="0.26" />
        </g>
      )}
    </svg>
  )
}



