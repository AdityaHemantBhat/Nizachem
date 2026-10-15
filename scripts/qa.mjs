import { spawn } from 'node:child_process'
import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import { chromium } from 'playwright'

const PORT = 4173
const BASE = `http://localhost:${PORT}`
const OUT = 'qa'
const ROUTES = ['/', '/menu', '/story', '/gallery', '/contact', '/book', '/nope']
const WIDTHS = [320, 375, 414, 768, 834, 1024, 1280, 1440, 1920]

const waitForServer = async (url, tries = 60) => {
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(url)
      if (res.ok) return true
    } catch {
      /* not up yet */
    }
    await new Promise((r) => setTimeout(r, 500))
  }
  throw new Error('preview server did not start')
}

const shotWidths = process.env.QA_ALL === '1' ? WIDTHS : [375, 768, 1440, 1920]

await mkdir(OUT, { recursive: true })

const preview = spawn('npx', ['vite', 'preview', '--port', String(PORT), '--strictPort'], {
  stdio: 'ignore',
  shell: true,
})

await waitForServer(`${BASE}/`)

const browser = await chromium.launch({ channel: 'msedge' })
const report = { overflow: [], errors: [], heights: [] }

for (const width of WIDTHS) {
  const context = await browser.newContext({
    viewport: { width, height: 900 },
    deviceScaleFactor: 1,
  })
  await context.addInitScript(() => {
    try {
      sessionStorage.setItem('nizachem:visited', '1')
    } catch {
      /* ignore */
    }
  })
  const page = await context.newPage()
  page.on('console', (msg) => {
    if (msg.type() === 'error') report.errors.push(`[${width}] ${msg.text().slice(0, 200)}`)
  })
  page.on('pageerror', (err) => report.errors.push(`[${width}] ${err.message.slice(0, 200)}`))

  for (const route of ROUTES) {
    await page.goto(`${BASE}${route}`, { waitUntil: 'networkidle' })
    await page.evaluate(() => document.fonts?.ready)
    await page.waitForTimeout(1400)

    const metrics = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
      scrollHeight: document.documentElement.scrollHeight,
    }))

    if (metrics.scrollWidth > metrics.innerWidth + 1) {
      const offenders = await page.evaluate(() => {
        const bad = []
        document.querySelectorAll('body *').forEach((el) => {
          const rect = el.getBoundingClientRect()
          if (rect.width > 0 && (rect.right > window.innerWidth + 1 || rect.left < -1)) {
            bad.push(`${el.tagName.toLowerCase()}.${String(el.className).slice(0, 60)}`)
          }
        })
        return bad.slice(0, 6)
      })
      report.overflow.push(
        `[${width}] ${route} scrollWidth=${metrics.scrollWidth} :: ${offenders.join(' | ')}`,
      )
    }

    report.heights.push(`[${width}] ${route} height=${metrics.scrollHeight}`)

    if (shotWidths.includes(width)) {
      const name = `${route === '/' ? 'home' : route.replace(/\//g, '')}-${width}.png`
      await page.screenshot({ path: path.join(OUT, name) })
    }
  }

  await context.close()
}

await browser.close()
preview.kill()

console.log('--- horizontal overflow ---')
console.log(report.overflow.length ? report.overflow.join('\n') : 'none')
console.log('--- console errors ---')
console.log(report.errors.length ? [...new Set(report.errors)].join('\n') : 'none')
console.log('--- page heights ---')
console.log(report.heights.join('\n'))
