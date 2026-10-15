import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const SVG_CONTENT = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
  <defs>
    <!-- Rich Goan Chilli Red to Deep Laterite Terracotta Gradient -->
    <linearGradient id="chilliGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#EA580C" />
      <stop offset="35%" stop-color="#C2410C" />
      <stop offset="85%" stop-color="#9A3412" />
      <stop offset="100%" stop-color="#7C2D12" />
    </linearGradient>

    <!-- Warm Curtorim Sunset Turmeric Gold Gradient -->
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FEF08A" />
      <stop offset="45%" stop-color="#F59E0B" />
      <stop offset="100%" stop-color="#D97706" />
    </linearGradient>

    <!-- Warm Heritage Ivory / Cream Gradient -->
    <linearGradient id="creamGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="100%" stop-color="#FFF8EC" />
    </linearGradient>

    <!-- Drop Shadow for tactile crest depth -->
    <filter id="crestShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="1.4" stdDeviation="1.1" flood-color="#000000" flood-opacity="0.38" />
    </filter>
  </defs>

  <!-- 1. Rich Chilli Red Squircle Medallion Base (Rounded corners rx=15 for modern app/tab luxury) -->
  <rect x="2" y="2" width="60" height="60" rx="15" fill="url(#chilliGrad)" />

  <!-- 2. Delicate Artisanal Turmeric Gold Inner Hairline -->
  <rect x="4.5" y="4.5" width="55" height="55" rx="12.5" stroke="url(#goldGrad)" stroke-width="1.1" stroke-opacity="0.65" fill="none" />

  <!-- 3. Central Brand Crest Group -->
  <g transform="translate(0, -0.5)">
    <!-- A. Culinary Cloche Dome with Brass Finial -->
    <path
      d="M 22 19 C 22 10.5, 42 10.5, 42 19"
      fill="none"
      stroke="url(#goldGrad)"
      stroke-width="1.8"
      stroke-linecap="round"
    />
    <!-- Brass Finial Knob -->
    <circle cx="32" cy="11.2" r="2.2" fill="url(#goldGrad)" />

    <!-- Rising Aromatic Steam Wisps (subtle culinary aroma) -->
    <path d="M 32 8 C 31 6.5, 33 5.2, 32 3.8" stroke="url(#goldGrad)" stroke-width="1.1" stroke-linecap="round" stroke-opacity="0.9" />
    <path d="M 27.5 9 C 26.6 7.6, 28 6.5, 27.2 5.2" stroke="url(#goldGrad)" stroke-width="0.9" stroke-linecap="round" stroke-opacity="0.65" />
    <path d="M 36.5 9 C 37.4 7.6, 36 6.5, 36.8 5.2" stroke="url(#goldGrad)" stroke-width="0.9" stroke-linecap="round" stroke-opacity="0.65" />

    <!-- B. Master Fraunces Serif Monogram 'N' (Pure, unified, authentic calligraphic typography) -->
    <g filter="url(#crestShadow)">
      <path
        d="
          M 16.5 20.5 
          H 23.5 
          L 41.5 44 
          V 23 
          H 38.5 
          V 20.5 
          H 47.5 
          V 23 
          H 44.5 
          V 46.5 
          H 47.5 
          V 49 
          H 40 
          L 22.5 25.5 
          V 46.5 
          H 25.8 
          V 49 
          H 16.5 
          V 46.5 
          H 19.5 
          V 23 
          H 16.5 
          Z
        "
        fill="url(#creamGrad)"
      />
    </g>

    <!-- C. Fine Dining Charger Platter Base Rim -->
    <path
      d="M 15 51.5 C 23.5 54.2, 40.5 54.2, 49 51.5"
      fill="none"
      stroke="url(#goldGrad)"
      stroke-width="1.6"
      stroke-linecap="round"
    />
    <!-- Center Platter Gold Pearl Accent -->
    <circle cx="32" cy="53" r="1.2" fill="url(#goldGrad)" />
  </g>
</svg>
`

async function generateAll() {
  const publicDir = path.resolve('public')
  
  // 1. Write the vector SVG favicon
  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), SVG_CONTENT.trim())
  console.log('✓ Wrote public/favicon.svg')

  const svgBuffer = Buffer.from(SVG_CONTENT)

  // 2. Generate PNG derivatives
  const targets = [
    { name: 'favicon-16x16.png', size: 16 },
    { name: 'favicon-32x32.png', size: 32 },
    { name: 'apple-touch-icon.png', size: 180 },
    { name: 'icon-192.png', size: 192 },
    { name: 'icon-512.png', size: 512 }
  ]

  for (const t of targets) {
    await sharp(svgBuffer)
      .resize(t.size, t.size)
      .png({ compressionLevel: 9 })
      .toFile(path.join(publicDir, t.name))
    console.log(`✓ Generated public/${t.name} (${t.size}x${t.size})`)
  }

  // Generate standard ICO file using 32x32 PNG structure
  // Simple valid ICO header containing a single 32x32 PNG image
  const png32 = await sharp(svgBuffer).resize(32, 32).png().toBuffer()
  const icoHeader = Buffer.alloc(6)
  icoHeader.writeUInt16LE(0, 0) // Reserved
  icoHeader.writeUInt16LE(1, 2) // Type 1 = ICO
  icoHeader.writeUInt16LE(1, 4) // Number of images = 1

  const icoDirEntry = Buffer.alloc(16)
  icoDirEntry.writeUInt8(32, 0) // Width 32
  icoDirEntry.writeUInt8(32, 1) // Height 32
  icoDirEntry.writeUInt8(0, 2)  // Color palette = 0
  icoDirEntry.writeUInt8(0, 3)  // Reserved = 0
  icoDirEntry.writeUInt16LE(1, 4) // Color planes = 1
  icoDirEntry.writeUInt16LE(32, 6) // Bits per pixel = 32
  icoDirEntry.writeUInt32LE(png32.length, 8) // Size of image data
  icoDirEntry.writeUInt32LE(22, 12) // Offset of image data (6 + 16 = 22)

  const icoBuffer = Buffer.concat([icoHeader, icoDirEntry, png32])
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer)
  console.log('✓ Generated public/favicon.ico (standard 32x32 ICO format)')
}

generateAll().catch(err => {
  console.error(err)
  process.exit(1)
})
