const fs = require('fs');
let css = fs.readFileSync('app/globals.css', 'utf8');

// 1. Root variables
css = css.replace(/:root\s*\{[\s\S]*?\}/, `:root {
  --bg-primary: #0d0d0d;
  --bg-secondary: #1a1a1a;
  --bg-card: rgba(26, 26, 26, 0.6);
  --bg-glass: rgba(26, 26, 26, 0.88);
  --border: rgba(255, 255, 255, 0.08);
  --border-hover: rgba(255, 255, 255, 0.18);
  --accent-indigo: #818cf8;
  --accent-violet: #a78bfa;
  --accent-cyan: #2dd4bf;
  --accent-emerald: #34d399;
  --text-primary: #e0e0e0;
  --text-secondary: #9ca3af;
  --text-muted: #6b7280;
  --gradient-hero: linear-gradient(135deg, #a78bfa 0%, #818cf8 55%, #2dd4bf 100%);
  --gradient-card: linear-gradient(180deg, rgba(30, 30, 30, 0.96) 0%, rgba(20, 20, 20, 0.96) 100%);
  --shadow-glow: 0 10px 30px rgba(255, 255, 255, 0.05);
  --shadow-card: 0 18px 40px rgba(0, 0, 0, 0.6);
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 20px;
  --radius-xl: 28px;
}`);

// 2. Body styles
css = css.replace(/body\s*\{[\s\S]*?\}/, `body {
  background: radial-gradient(circle at center, #1a1a1a 0%, #0d0d0d 100%);
  background-attachment: fixed;
  color: var(--text-primary);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 500;
  line-height: 1.7;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}`);

// 3. Project card hover scale and shadow
css = css.replace(/(\.project-card:hover\s*\{[\s\S]*?transform:\s*)translateY\([^)]+\)(;[\s\S]*?\})/, '$1scale(1.02)$2');
// Add box-shadow explicitly to hover if not present or replace existing
css = css.replace(/\.project-card:hover\s*\{[\s\S]*?\}/, match => {
  return match.replace(/box-shadow:[^;]+;/, 'box-shadow: var(--shadow-glow);');
});

// 4. White backgrounds -> Dark backgrounds
css = css.replace(/rgba\(255,\s*255,\s*255,\s*(0\.\d+)\)/g, (fullMatch, alpha) => {
  return `rgba(35, 35, 35, ${alpha})`;
});
css = css.replace(/#ffffff/gi, '#222222');
css = css.replace(/rgba\(248,\s*247,\s*244,\s*(0\.\d+)\)/g, (fullMatch, alpha) => {
  return `rgba(20, 20, 20, ${alpha})`;
});
css = css.replace(/#f4f6fa/gi, '#1e1e1e');
css = css.replace(/#fcfbf8/gi, '#1a1a1a');
css = css.replace(/#f8f7f4/gi, '#0d0d0d');
css = css.replace(/#f3f4f6/gi, '#1f1f1f');

// 5. Scrollbar and noise
css = css.replace(/rgba\(17,\s*24,\s*39/g, 'rgba(255, 255, 255');
// Wait, the noise uses rgba(17,24,39,0.018), we want rgba(255,255,255,0.018) so turning 17,24,39 into 255,255,255 works!

// 6. Global entry animation and universal hover
css += `\n
@keyframes fadeSlideUpGlobal {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

body > * {
  animation: fadeSlideUpGlobal 0.8s ease-out forwards;
}

a:hover, button:hover {
  opacity: 0.85;
}
`;

fs.writeFileSync('app/globals.css', css);
console.log('Patched globals.css');
