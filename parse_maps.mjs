import fs from 'fs';

const html = fs.readFileSync('maps_html.txt', 'utf8');

// Find all URLs
const urls = html.match(/https?:\/\/[^\s"'<>\\]+/g) || [];
console.log('Total URLs found:', urls.length);

const imgUrls = urls.filter(u => u.includes('image') || u.includes('photo') || u.includes('ggpht') || u.includes('googleusercontent') || u.includes('.jpg') || u.includes('.png'));
console.log('Image-like URLs:', [...new Set(imgUrls)]);

// Look for place details
const textSegments = html.match(/"([^"]{10,200})"/g) || [];
const interesting = textSegments
  .map(s => s.replace(/"/g, ''))
  .filter(s => s.toLowerCase().includes('nizachem') || s.toLowerCase().includes('curtorim') || s.toLowerCase().includes('restaurant') || s.toLowerCase().includes('opened'));

console.log('Interesting text segments:', interesting.slice(0, 30));
