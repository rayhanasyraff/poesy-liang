const fs = require('fs');
const path = require('path');

function copyWorker() {
  try {
    const pkgJsonPath = require.resolve('pdfjs-dist/package.json');
    const pkgDir = path.dirname(pkgJsonPath);
    const candidates = [
      path.join(pkgDir, 'build', 'pdf.worker.min.mjs'),
      path.join(pkgDir, 'build', 'pdf.worker.min.js'),
      path.join(pkgDir, 'legacy', 'pdf.worker.min.js'),
      path.join(pkgDir, 'es', 'build', 'pdf.worker.min.mjs')
    ];
    let source;
    for (const p of candidates) {
      if (fs.existsSync(p)) { source = p; break; }
    }
    if (!source) {
      console.error('pdf.worker file not found in pdfjs-dist; checked:', candidates.join(', '));
      return;
    }
    const destDir = path.join(process.cwd(), 'public');
    if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
    const dest = path.join(destDir, 'pdf.worker.min.mjs');
    const data = fs.readFileSync(source);
    fs.writeFileSync(dest, data);
    console.log('Copied', source, 'to', dest);
  } catch (e) {
    console.error('Error copying pdf.worker:', e && e.message ? e.message : e);
  }
}

copyWorker();
