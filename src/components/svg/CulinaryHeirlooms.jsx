/**
 * Handcrafted heritage culinary illustrations for Nizachem's four sacred ingredients.
 * Replaces generic AI emojis with authentic Goan artisanal linework etchings.
 */

export function KokumIllustration({ className = '', size = 56 }) {
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      className={`shrink-0 ${className}`}
      aria-hidden="true"
    >
      {/* Botanical Stem */}
      <path
        d="M32 6 C32 18, 30 22, 24 28"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M30 14 C36 12, 44 14, 48 20 C42 22, 34 20, 30 14 Z"
        fill="currentColor"
        fillOpacity="0.15"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      {/* Kokum Leaf Vein */}
      <path d="M32 15 C38 17, 44 18, 46 20" strokeWidth="1" strokeOpacity="0.7" />

      {/* Second Leaf */}
      <path
        d="M26 24 C18 20, 10 24, 8 32 C14 32, 22 30, 26 24 Z"
        fill="currentColor"
        fillOpacity="0.12"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />

      {/* Main Kokum Fruit (Whole Berry) */}
      <circle
        cx="34"
        cy="38"
        r="16"
        fill="currentColor"
        fillOpacity="0.18"
        strokeWidth="2.2"
      />

      {/* Kokum Crown / Calyx */}
      <path
        d="M28 24 C31 22, 37 22, 40 24 C38 27, 30 27, 28 24 Z"
        fill="currentColor"
        fillOpacity="0.6"
        strokeWidth="1.4"
      />
      <circle cx="34" cy="24" r="1.5" fill="currentColor" />

      {/* Sun-dried Rind Flutes / Natural Segments */}
      <path
        d="M26 30 C22 35, 22 43, 26 48"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeOpacity="0.6"
      />
      <path
        d="M34 26 C34 33, 34 45, 34 54"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeOpacity="0.7"
      />
      <path
        d="M42 30 C46 35, 46 43, 42 48"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeOpacity="0.6"
      />

      {/* Curled Sun-Dried Rind Petal */}
      <path
        d="M48 38 C56 40, 58 50, 50 56 C46 54, 46 46, 48 38 Z"
        fill="currentColor"
        fillOpacity="0.25"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />

      {/* Tang / Sol Kadi Droplet */}
      <path
        d="M16 48 C16 44, 18 41, 18 41 C18 41, 20 44, 20 48 C20 50, 18 52, 16 48 Z"
        fill="currentColor"
        fillOpacity="0.7"
        strokeWidth="1"
      />
    </svg>
  )
}

export function TeppalIllustration({ className = '', size = 56 }) {
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      className={`shrink-0 ${className}`}
      aria-hidden="true"
    >
      {/* Woody Thorny Konkan Twig */}
      <path
        d="M10 52 C22 44, 34 32, 54 14"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      {/* Small Bark Thorn */}
      <path d="M22 43 L26 40 L24 45 Z" fill="currentColor" />
      <path d="M38 28 L42 25 L40 30 Z" fill="currentColor" />

      {/* Wild Teppal Berry 1 (Open Husk revealing peppercorn) */}
      <g transform="translate(18, 18)">
        {/* Star split husk */}
        <path
          d="M10 2 C14 6, 16 12, 14 16 C10 16, 6 12, 10 2 Z"
          fill="currentColor"
          fillOpacity="0.25"
          strokeWidth="1.6"
        />
        <path
          d="M10 2 C6 6, 4 12, 6 16 C10 16, 14 12, 10 2 Z"
          fill="currentColor"
          fillOpacity="0.25"
          strokeWidth="1.6"
        />
        {/* Shiny Black Seed inside */}
        <circle cx="10" cy="11" r="4.5" fill="currentColor" fillOpacity="0.85" strokeWidth="1" />
        <circle cx="8.5" cy="9.5" r="1.2" fill="#FAF7F2" stroke="none" />
      </g>

      {/* Berry 2 */}
      <g transform="translate(32, 28)">
        <path
          d="M8 2 C12 5, 14 10, 12 14 C8 14, 5 10, 8 2 Z"
          fill="currentColor"
          fillOpacity="0.2"
          strokeWidth="1.5"
        />
        <circle cx="8" cy="9" r="4" fill="currentColor" fillOpacity="0.75" />
      </g>

      {/* Berry 3 */}
      <g transform="translate(42, 16)">
        <circle cx="6" cy="6" r="4" fill="currentColor" fillOpacity="0.4" strokeWidth="1.6" />
        <path d="M6 2 L6 6 L9 8" strokeWidth="1.2" strokeLinecap="round" />
      </g>

      {/* Fragrance / Tingling Aura Whispers */}
      <path
        d="M12 14 C16 10, 20 8, 24 8"
        strokeWidth="1.2"
        strokeDasharray="2 3"
        strokeOpacity="0.6"
      />
      <path
        d="M48 6 C52 8, 56 12, 56 16"
        strokeWidth="1.2"
        strokeDasharray="2 3"
        strokeOpacity="0.6"
      />
      <path
        d="M28 48 C32 46, 36 44, 40 44"
        strokeWidth="1.2"
        strokeDasharray="2 3"
        strokeOpacity="0.4"
      />

      {/* Coastal Leaf */}
      <path
        d="M44 24 C52 26, 58 34, 54 40 C46 40, 42 32, 44 24 Z"
        fill="currentColor"
        fillOpacity="0.18"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ToddyVinegarIllustration({ className = '', size = 56 }) {
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      className={`shrink-0 ${className}`}
      aria-hidden="true"
    >
      {/* Traditional Goan Martaban Clay Jar */}
      {/* Cork / Wooden Stopper */}
      <path
        d="M28 8 L36 8 L35 13 L29 13 Z"
        fill="currentColor"
        fillOpacity="0.4"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />

      {/* Jar Lip & Neck Rim */}
      <rect
        x="24"
        y="13"
        width="16"
        height="5"
        rx="2.5"
        fill="currentColor"
        fillOpacity="0.25"
        strokeWidth="1.8"
      />

      {/* Tied Jute Twine Cord around the neck */}
      <line x1="24" y1="18" x2="40" y2="18" strokeWidth="2.2" strokeLinecap="round" />
      <path
        d="M36 18 C39 20, 42 24, 40 27"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeDasharray="1.5 2"
      />
      <circle cx="36" cy="18" r="1.5" fill="currentColor" />

      {/* Broad Earthen Bellied Clay Body */}
      <path
        d="M25 18 C20 22, 13 28, 13 39 C13 51, 21 56, 32 56 C43 56, 51 51, 51 39 C51 28, 44 22, 39 18 Z"
        fill="currentColor"
        fillOpacity="0.15"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />

      {/* Traditional Glaze Dip Horizon (upper half glazed, bottom raw terracotta) */}
      <path
        d="M14 36 C22 39, 42 33, 50 36"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeOpacity="0.7"
      />
      <path
        d="M17 42 C26 44, 38 40, 47 43"
        strokeWidth="1.2"
        strokeOpacity="0.4"
      />

      {/* Subtle Coconut Palm Frond Emblem stamped on clay */}
      <path
        d="M32 26 V33 M29 28 L32 30 L35 28 M28 31 L32 33 L36 31"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeOpacity="0.65"
      />

      {/* Fermenting Toddy Bubbles Rising */}
      <circle cx="23" cy="27" r="1.5" fill="currentColor" fillOpacity="0.5" />
      <circle cx="27" cy="23" r="1.2" fill="currentColor" fillOpacity="0.4" />
      <circle cx="38" cy="25" r="1.8" fill="currentColor" fillOpacity="0.6" />
    </svg>
  )
}

export function RogddoIllustration({ className = '', size = 56 }) {
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      className={`shrink-0 ${className}`}
      aria-hidden="true"
    >
      {/* Ancient Goan Black Granite Base (Rogddo Trough) */}
      <path
        d="M8 38 C8 32, 16 28, 32 28 C48 28, 56 32, 56 38 C56 47, 46 54, 32 54 C18 54, 8 47, 8 38 Z"
        fill="currentColor"
        fillOpacity="0.22"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />

      {/* Inner Hollow / Grinding Basin */}
      <ellipse
        cx="32"
        cy="38"
        rx="20"
        ry="8"
        fill="currentColor"
        fillOpacity="0.12"
        strokeWidth="1.4"
        strokeDasharray="3 2"
      />

      {/* Ground Spices (Red Chilli & Fresh Coconut Swirl) */}
      <path
        d="M24 38 C28 36, 36 39, 40 37"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeOpacity="0.6"
      />
      <circle cx="26" cy="40" r="1.5" fill="currentColor" fillOpacity="0.7" />
      <circle cx="38" cy="39" r="1.8" fill="currentColor" fillOpacity="0.7" />
      <circle cx="32" cy="36" r="1.2" fill="currentColor" fillOpacity="0.5" />

      {/* Cylindrical Granite Pestle / Roller Stone (Foll) tilted over trough */}
      <g transform="rotate(-18 32 24)">
        <rect
          x="18"
          y="18"
          width="28"
          height="11"
          rx="5.5"
          fill="currentColor"
          fillOpacity="0.4"
          strokeWidth="2"
        />
        {/* Hand grip indentations on stone roller */}
        <line x1="24" y1="20" x2="24" y2="27" strokeWidth="1.4" strokeOpacity="0.6" />
        <line x1="40" y1="20" x2="40" y2="27" strokeWidth="1.4" strokeOpacity="0.6" />
        <circle cx="32" cy="23.5" r="1.5" fill="currentColor" fillOpacity="0.6" />
      </g>

      {/* Granite Chipped Texture Flecks */}
      <path d="M14 44 H16 M48 45 H50 M20 48 H22 M42 49 H44" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5" />
    </svg>
  )
}
