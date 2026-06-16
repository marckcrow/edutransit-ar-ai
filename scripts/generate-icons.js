const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function generateIcons() {
  const publicDir = path.join(__dirname, '..', 'public');

  // SVG source for 192x192
  const svg192 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192" width="192" height="192">
  <rect width="192" height="192" rx="40" fill="#0F172A"/>
  <rect x="88" y="60" width="16" height="90" rx="4" fill="#94A3B8"/>
  <rect x="40" y="60" width="112" height="16" rx="6" fill="#94A3B8"/>
  <circle cx="60" cy="68" r="18" fill="#EF4444"/>
  <circle cx="96" cy="68" r="18" fill="#1E293B" stroke="#64748B" stroke-width="2"/>
  <circle cx="132" cy="68" r="18" fill="#1E293B" stroke="#64748B" stroke-width="2"/>
  <path d="M145 130 L150 140 L160 135 L152 145 L158 155 L147 148 L138 155 L143 145 L132 140 L142 135 Z" fill="#FACC15"/>
  <rect x="60" y="148" width="72" height="8" rx="4" fill="#475569"/>
</svg>`;

  // SVG source for 512x512
  const svg512 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <rect width="512" height="512" rx="96" fill="#0F172A"/>
  <rect x="236" y="140" width="40" height="220" rx="10" fill="#94A3B8"/>
  <rect x="106" y="140" width="300" height="40" rx="14" fill="#94A3B8"/>
  <circle cx="156" cy="160" r="46" fill="#EF4444"/>
  <circle cx="256" cy="160" r="46" fill="#1E293B" stroke="#64748B" stroke-width="5"/>
  <circle cx="356" cy="160" r="46" fill="#1E293B" stroke="#64748B" stroke-width="5"/>
  <path d="M390 340 L400 370 L430 360 L405 380 L420 410 L392 385 L364 410 L378 380 L350 370 L382 340 Z" fill="#FACC15"/>
  <path d="M115 330 L120 348 L138 345 L124 358 L130 375 L114 362 L98 375 L104 358 L90 345 L108 348 Z" fill="#FACC15" opacity="0.7"/>
  <rect x="160" y="358" width="192" height="20" rx="10" fill="#475569"/>
</svg>`;

  // SVG source for favicon 32x32
  const svgFavicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
  <rect width="32" height="32" rx="6" fill="#0F172A"/>
  <rect x="14.5" y="8" width="3" height="15" rx="1" fill="#94A3B8"/>
  <rect x="6" y="8" width="20" height="3" rx="1" fill="#94A3B8"/>
  <circle cx="10" cy="9.5" r="3.2" fill="#EF4444"/>
  <circle cx="16" cy="9.5" r="3.2" fill="#1E293B" stroke="#64748B" stroke-width="0.5"/>
  <circle cx="22" cy="9.5" r="3.2" fill="#1E293B" stroke="#64748B" stroke-width="0.5"/>
  <rect x="9" y="23" width="14" height="2" rx="1" fill="#475569"/>
</svg>`;

  try {
    // Generate 192x192
    await sharp(Buffer.from(svg192)).png().toFile(path.join(publicDir, 'icon-192.png'));
    console.log('✅ Created icon-192.png');

    // Generate 512x512
    await sharp(Buffer.from(svg512)).png().toFile(path.join(publicDir, 'icon-512.png'));
    console.log('✅ Created icon-512.png');

    // Generate 32x32 favicon
    await sharp(Buffer.from(svgFavicon)).png().toFile(path.join(publicDir, 'favicon-32.png'));
    console.log('✅ Created favicon-32.png');

    // Generate 180x180 Apple touch icon
    await sharp(Buffer.from(svg192)).resize(180, 180).png().toFile(path.join(publicDir, 'apple-touch-icon.png'));
    console.log('✅ Created apple-touch-icon.png');

    // Generate OG image 1200x630
    const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
      <rect width="1200" height="630" fill="#0F172A"/>
      <rect x="80" y="80" width="1040" height="470" rx="32" fill="#1E293B"/>
      <rect x="560" y="200" width="80" height="280" rx="12" fill="#94A3B8"/>
      <rect x="200" y="200" width="800" height="60" rx="16" fill="#94A3B8"/>
      <circle cx="320" cy="230" r="72" fill="#EF4444"/>
      <circle cx="600" cy="230" r="72" fill="#1E293B" stroke="#64748B" stroke-width="6"/>
      <circle cx="880" cy="230" r="72" fill="#1E293B" stroke="#64748B" stroke-width="6"/>
      <path d="M920 430 L940 490 L1000 470 L950 510 L970 570 L920 535 L870 570 L888 510 L840 490 L870 430 Z" fill="#FACC15"/>
      <text x="600" y="520" font-family="Arial Black, sans-serif" font-size="52" font-weight="900" fill="white" text-anchor="middle">EduTransit AR AI</text>
    </svg>`;
    await sharp(Buffer.from(ogSvg)).png().toFile(path.join(publicDir, 'og-image.png'));
    console.log('✅ Created og-image.png (1200x630)');

    console.log('\n🎉 All icons generated successfully!');
  } catch (err) {
    console.error('Error generating icons:', err);
    process.exit(1);
  }
}

generateIcons();
