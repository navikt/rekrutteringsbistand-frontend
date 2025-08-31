#!/usr/bin/env node
/*
  Rask heuristisk skanner for ubrukte filer og exports i ./app (ekskluderer ./app/rekrutteringstreff).
  Den prøver å finne:
    1. Filer som ikke ser ut til å være importert fra andre filer (utenom Next.js konvensjonsfiler)
    2. Navngitte exports i brukte filer som ikke ser ut til å være referert noe sted

  Begrensninger / false positives:
    - Dynamiske imports med variable path fanges ikke.
    - Bruk via string keys (f.eks. komponentnavn i et map) oppdages ikke.
    - Side-filer (page.tsx, layout.tsx, route.ts etc.) markeres aldri som ubrukte.
    - Re-exports (export * from ...) følges ikke i dybden.
    - Regex-basert parsing kan bomme på kompliserte TypeScript konstruksjoner.

  Kjør:
    node scripts/find-unused-app.cjs

  (Evt. via npm script dersom du legger til i package.json.)
*/
// eslint-disable-next-line @typescript-eslint/no-require-imports
const fs = require('fs');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require('path');

const projectRoot = process.cwd();
const appDir = path.join(projectRoot, 'app');

// Mapper med kildekode vi søker i for referanser
const SEARCH_DIRS = ['app', 'components', 'hooks', 'lib', 'providers', 'util'];
// Next konvensjonsfiler vi ignorerer
const NEXT_ROUTE_FILENAMES = new Set([
  'page.tsx',
  'page.ts',
  'layout.tsx',
  'layout.ts',
  'loading.tsx',
  'loading.ts',
  'error.tsx',
  'error.ts',
  'route.ts',
  'route.tsx',
  'not-found.tsx',
  'not-found.ts',
  'template.tsx',
  'template.ts',
  'head.tsx',
  'head.ts',
]);

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((e) => {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) return walk(p);
    return [p];
  });
}

function isCodeFile(f) {
  return /(\.tsx?|\.js)$/.test(f) && !f.endsWith('.d.ts');
}

function rel(p) {
  return path.relative(projectRoot, p);
}

// 1. Samle alle app-filer (ekskluder rekrutteringstreff)
const allAppFiles = walk(appDir)
  .filter(isCodeFile)
  .filter(
    (f) =>
      !rel(f).startsWith('app' + path.sep + 'rekrutteringstreff' + path.sep),
  );

// 2. Bygg innholds-cache for søk
const searchFiles = SEARCH_DIRS.flatMap((dir) => {
  const full = path.join(projectRoot, dir);
  if (!fs.existsSync(full)) return [];
  return walk(full).filter(isCodeFile);
});

const contentCache = new Map();
for (const f of searchFiles) {
  try {
    const c = fs.readFileSync(f, 'utf8');
    contentCache.set(f, c);
  } catch {
    /* empty */
  }
}

// 3. Finn ubrukte filer (ingen import referanse)
function fileImported(file) {
  const relPath = rel(file); // ex: app/kandidat/Foo.tsx
  const noExt = relPath.replace(/\.[tj]sx?$/, '');
  const base = path.basename(noExt); // Foo
  // Mønstre vi søker etter (basename alene, full relativ path, eller hvilken som helst path som ender med /basename)
  const patterns = [
    // Direkte basename
    new RegExp(`from ['\"](?:\.?\.\/)*${base}['\"]`),
    new RegExp(`require\(['\"](?:\.?\.\/)*${base}['\"]\)`),
    // Full relativ (uten ext)
    new RegExp(`from ['\"](?:\.?\.\/)*${noExt}['\"]`),
    new RegExp(`require\(['\"](?:\.?\.\/)*${noExt}['\"]\)`),
    // Sluttsegment matcher basename
    new RegExp(`from ['\"][^'\"]*/${base}['\"]`),
    new RegExp(`require\(['\"][^'\"]*/${base}['\"]\)`),
  ];
  for (const [f, c] of contentCache) {
    if (f === file) continue;
    if (patterns.some((r) => r.test(c))) return true;
  }
  return false;
}

// 4. Ekstraher navngitte exports og sjekk om de brukes
function parseNamedExports(code) {
  const names = new Set();
  // export const Name = / export function Name / export class Name
  const regexes = [
    /export\s+const\s+([A-Za-z0-9_]+)/g,
    /export\s+function\s+([A-Za-z0-9_]+)/g,
    /export\s+class\s+([A-Za-z0-9_]+)/g,
    /export\s+interface\s+([A-Za-z0-9_]+)/g,
    /export\s+type\s+([A-Za-z0-9_]+)/g,
    /export\s+enum\s+([A-Za-z0-9_]+)/g,
  ];
  for (const r of regexes) {
    let m;
    while ((m = r.exec(code))) names.add(m[1]);
  }
  // export { A, B as C }
  const reExportList = /export\s+\{([^}]+)\}/g;
  let m;
  while ((m = reExportList.exec(code))) {
    const seg = m[1];
    seg
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
      .forEach((part) => {
        const name = part.split(/\s+as\s+/i)[0].trim();
        if (name && name !== 'default') names.add(name);
      });
  }
  return [...names];
}

function identifierUsed(name, ownerFile) {
  const r = new RegExp(`\b${name}\b`);
  for (const [f, c] of contentCache) {
    if (f === ownerFile) continue; // bruk i egen fil teller ikke
    if (r.test(c)) return true;
  }
  return false;
}

const unusedFiles = [];
const unusedExports = [];

for (const file of allAppFiles) {
  const bn = path.basename(file);
  if (NEXT_ROUTE_FILENAMES.has(bn)) continue;
  const imported = fileImported(file);
  if (!imported) {
    unusedFiles.push(rel(file));
  } else {
    // Sjekk exports
    const code = fs.readFileSync(file, 'utf8');
    const names = parseNamedExports(code);
    for (const n of names) {
      if (!identifierUsed(n, file)) {
        unusedExports.push({ file: rel(file), export: n });
      }
    }
  }
}

// eslint-disable-next-line no-console
console.log('\n=== Ubrukte filer (heuristikk) ===');
// eslint-disable-next-line no-console
if (unusedFiles.length === 0) console.log('Ingen funnet');
// eslint-disable-next-line no-console
else unusedFiles.sort().forEach((f) => console.log(f));

// eslint-disable-next-line no-console
console.log('\n=== Ubrukte navngitte exports (heuristikk) ===');
// eslint-disable-next-line no-console
if (unusedExports.length === 0) console.log('Ingen funnet');
else
  unusedExports
    .sort(
      (a, b) =>
        a.file.localeCompare(b.file) || a.export.localeCompare(b.export),
    )
    // eslint-disable-next-line no-console
    .forEach((e) => console.log(e.file + ' :: ' + e.export));

// eslint-disable-next-line no-console
console.log(
  '\n(OBS: Heuristikk kan gi false positives. Verifiser før sletting.)',
);
