import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const publicDir = path.join(root, 'public');
const distDir = path.join(root, 'dist');
const docsDir = path.join(root, 'docs');
const imageExtensions = new Set(['.avif', '.gif', '.jpeg', '.jpg', '.png', '.svg', '.webp']);
const outputSuffix = process.argv[2] ? `-${process.argv[2].replace(/[^a-z0-9-]/gi, '')}` : '';

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(file) : [file];
  });
}

function publicUrl(file) { return `/${path.relative(publicDir, file).split(path.sep).join('/')}`; }
function pageUrl(file) {
  const relative = path.relative(distDir, file).split(path.sep).join('/');
  if (relative === 'index.html') return '/';
  if (relative.endsWith('/index.html')) return `/${relative.slice(0, -'index.html'.length)}`;
  return `/${relative}`;
}

function imageSize(file) {
  const ext = path.extname(file).toLowerCase();
  const buf = fs.readFileSync(file);
  if (ext === '.png' && buf.length >= 24) return `${buf.readUInt32BE(16)} x ${buf.readUInt32BE(20)}`;
  if (ext === '.gif' && buf.length >= 10) return `${buf.readUInt16LE(6)} x ${buf.readUInt16LE(8)}`;
  if (ext === '.jpg' || ext === '.jpeg') {
    let offset = 2;
    while (offset + 9 < buf.length && buf[offset] === 0xff) {
      const marker = buf[offset + 1]; const length = buf.readUInt16BE(offset + 2);
      if ([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf].includes(marker)) return `${buf.readUInt16BE(offset + 5)} x ${buf.readUInt16BE(offset + 7)}`;
      offset += 2 + length;
    }
  }
  if (ext === '.webp' && buf.toString('ascii', 0, 4) === 'RIFF') {
    let offset = 12;
    while (offset + 8 <= buf.length) {
      const fourcc = buf.toString('ascii', offset, offset + 4); const length = buf.readUInt32LE(offset + 4); const data = offset + 8;
      if (fourcc === 'VP8X' && data + 10 <= buf.length) return `${1 + buf.readUIntLE(data + 4, 3)} x ${1 + buf.readUIntLE(data + 7, 3)}`;
      if (fourcc === 'VP8 ' && data + 10 <= buf.length && buf[data + 3] === 0x9d && buf[data + 4] === 0x01 && buf[data + 5] === 0x2a) return `${buf.readUInt16LE(data + 6) & 0x3fff} x ${buf.readUInt16LE(data + 8) & 0x3fff}`;
      if (fourcc === 'VP8L' && data + 5 <= buf.length && buf[data] === 0x2f) { const bits = buf.readUInt32LE(data + 1); return `${(bits & 0x3fff) + 1} x ${((bits >> 14) & 0x3fff) + 1}`; }
      offset = data + length + (length % 2);
    }
  }
  if (ext === '.svg') {
    const viewBox = buf.toString('utf8').match(/viewBox=["']\s*[-\d.]+\s+[-\d.]+\s+([\d.]+)\s+([\d.]+)\s*["']/i);
    return viewBox ? `${viewBox[1]} x ${viewBox[2]} (SVG)` : 'SVG (vector)';
  }
  return 'Unknown';
}

function csv(value) { return `"${String(value).replaceAll('"', '""')}"`; }
const usage = new Map();
for (const file of walk(distDir)) {
  if (path.extname(file).toLowerCase() !== '.html') continue;
  const html = fs.readFileSync(file, 'utf8'); const page = pageUrl(file);
  for (const match of html.matchAll(/(?:src|href|poster|data-src)=["']([^"']+)|url\(\s*["']?([^\s"')]+)["']?\s*\)/gi)) {
    const raw = (match[1] || match[2] || '').split(/[?#]/)[0];
    if (!raw.startsWith('/')) continue;
    const local = raw.replace(/^\//, '');
    if (!imageExtensions.has(path.extname(local).toLowerCase())) continue;
    if (!usage.has(`/${local}`)) usage.set(`/${local}`, new Set());
    usage.get(`/${local}`).add(page);
  }
}

const rows = walk(publicDir).filter((file) => imageExtensions.has(path.extname(file).toLowerCase())).map((file) => {
  const url = publicUrl(file); const pages = [...(usage.get(url) || [])].sort();
  return { url, size: imageSize(file), bytes: fs.statSync(file).size, usage: pages.length ? pages.join(' | ') : 'Not directly referenced in generated HTML' };
}).sort((a, b) => a.url.localeCompare(b.url));

fs.mkdirSync(docsDir, { recursive: true });
const csvLines = ['Image URL,Pixel dimensions,File size (KB),Web page locations', ...rows.map((row) => [row.url, row.size, (row.bytes / 1024).toFixed(1), row.usage].map(csv).join(','))];
fs.writeFileSync(path.join(docsDir, `image-assets-inventory${outputSuffix}.csv`), `${csvLines.join('\n')}\n`);
const md = ['# Website image asset inventory', '', `Generated: ${new Date().toISOString()}`, '', 'This list covers every image file under `public/`. Page locations are taken from generated HTML; unreferenced files are retained assets or CSS-only candidates.', '', `Total image assets: ${rows.length}`, '', '| Image file location / deployed URL | Pixel dimensions | File size | Web page locations |', '| --- | --- | ---: | --- |', ...rows.map((row) => `| \`${row.url}\` | ${row.size} | ${(row.bytes / 1024).toFixed(1)} KB | ${row.usage} |`), ''].join('\n');
fs.writeFileSync(path.join(docsDir, `image-assets-inventory${outputSuffix}.md`), md);
console.log(`Exported ${rows.length} image assets.`);
