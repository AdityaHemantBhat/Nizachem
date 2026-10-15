import { chromium } from 'playwright';
import fs from 'fs';

async function main() {
  console.log('Launching browser...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });
  const page = await context.newPage();

  console.log('Navigating to maps url...');
  await page.goto('https://maps.app.goo.gl/MfU9o8sQMLR79Eva6', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(3000);

  const title = await page.title();
  console.log('Page title:', title);

  // Take screenshot
  await page.screenshot({ path: 'scratch_maps.png', fullPage: false });

  // Get all images
  const images = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll('img, button[aria-label*="Photo"], div[style*="background-image"]'));
    const results = [];
    imgs.forEach(el => {
      const src = el.src || el.getAttribute('src');
      const bg = el.style?.backgroundImage;
      const aria = el.getAttribute('aria-label');
      if (src && (src.includes('googleusercontent') || src.includes('ggpht'))) {
        results.push({ type: 'img', src, aria });
      }
      if (bg && (bg.includes('googleusercontent') || bg.includes('ggpht'))) {
        results.push({ type: 'bg', bg, aria });
      }
    });
    return results;
  });

  // Extract review text and headings
  const textInfo = await page.evaluate(() => {
    const heading = document.querySelector('h1')?.innerText || '';
    const rating = document.querySelector('div[aria-label*="stars"], span[aria-label*="stars"]')?.getAttribute('aria-label') || '';
    const address = document.querySelector('button[data-item-id*="address"]')?.innerText || '';
    const reviews = Array.from(document.querySelectorAll('div[data-review-id], div.jJJaX')).map(r => r.innerText);
    return { heading, rating, address, reviews: reviews.slice(0, 10) };
  });

  console.log('Extracted Text:', JSON.stringify(textInfo, null, 2));
  console.log(`Found ${images.length} images:`, JSON.stringify(images, null, 2));

  fs.writeFileSync('scratch_maps_data.json', JSON.stringify({ title, textInfo, images }, null, 2));

  await browser.close();
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
