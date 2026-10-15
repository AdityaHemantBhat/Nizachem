import https from 'https';
import fs from 'fs';

async function resolve(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        console.log('Redirect to:', res.headers.location);
        resolve(res.headers.location);
      } else {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => resolve({ url, data }));
      }
    }).on('error', reject);
  });
}

async function run() {
  const target = 'https://maps.app.goo.gl/MfU9o8sQMLR79Eva6';
  let curr = target;
  for (let i = 0; i < 5; i++) {
    const res = await resolve(curr);
    if (typeof res === 'string') {
      curr = res;
    } else {
      console.log('Final URL:', res.url);
      fs.writeFileSync('maps_html.txt', res.data);
      console.log('Saved maps_html.txt, length:', res.data.length);
      
      // Regex find googleusercontent images
      const matches = res.data.match(/https:\/\/[^"'\\]+googleusercontent\.com\/p\/[^"'\\]+/g) || [];
      const unique = [...new Set(matches)];
      console.log(`Found ${unique.length} googleusercontent photos:`, unique);
      fs.writeFileSync('maps_photos.json', JSON.stringify(unique, null, 2));

      // Also search for any reviews or text
      const reviewMatches = res.data.match(/"([^"]{10,120})",null,null,null,null,\[\d+,\d+\]/g) || [];
      console.log('Some review matches:', reviewMatches.slice(0, 10));
      break;
    }
  }
}

run().catch(console.error);
