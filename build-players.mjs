// Writes players/<slug>/index.html for every entry in players.js.
//
// The roster in players.js is the single source of truth: add a player
// there, drop their photo in players/, then run
//
//   node build-players.mjs
//
// It rewrites every page and removes folders for players who are gone.
import fs from 'node:fs';
import path from 'node:path';

const root = path.dirname(new URL(import.meta.url).pathname);
const src = fs.readFileSync(path.join(root, 'players.js'), 'utf8');

// players.js is a plain script, not a module, so lift the array out by hand
const body = src.match(/var PLAYERS = (\[[\s\S]*?\n\]);/);
if (!body) throw new Error('could not find the PLAYERS array in players.js');
const PLAYERS = new Function('return ' + body[1])();

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// clips and stills live beside the page, so their paths need no prefix
function evidence(p) {
  const clips = (p.clips || []).map((c) => {
    const poster = typeof c === 'string' ? '' : ` poster="${esc(c.poster)}"`;
    const src = typeof c === 'string' ? c : c.src;
    return `      <video class="clip" controls playsinline preload="metadata"${poster}>
        <source src="${esc(src)}">
      </video>`;
  });
  const stills = (p.stills || []).map(
    (s) => `      <img class="clip" src="${esc(s)}" alt="" loading="lazy">`
  );
  const items = clips.concat(stills);
  if (!items.length) return '';
  return `  <section class="evidence">
    <h2>Evidence</h2>
    <div class="evidence-reel">
${items.join('\n')}
    </div>
  </section>
`;
}

function page(p) {
  const traitor = p.role === 'traitor';
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<link rel="icon" href="../../logo.svg" type="image/svg+xml">
<title>${esc(p.name)} &middot; Traitors</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700;900&family=IM+Fell+English:ital@0;1&family=Spectral:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../../style.css">
</head>
<body>
<nav class="topnav" aria-label="Sections">
  <a class="nav-brand" href="../../" aria-label="Traitors"><img class="nav-logo" src="../../logo.svg" alt=""></a>
  <div class="nav-links">
    <a class="tab" href="../../#players">Back to the board</a>
  </div>
</nav>
<main class="brief dossier">
  <img class="dossier-shot" src="../${esc(path.basename(p.src))}" alt="${esc(p.name)}">
  <h1>${esc(p.name)}</h1>
  <p class="verdict-badge ${traitor ? 'is-traitor' : 'is-faithful'}">${traitor ? 'Traitor' : 'Faithful'}</p>
${p.death ? `  <p class="dossier-death"><span>Cause of death</span>${esc(p.death)}</p>\n` : ''}\
  <p class="dossier-line">${traitor
    ? 'Sat at the table every night and lied through all of it.'
    : 'Played it straight the whole weekend.'}</p>
${evidence(p)}\
  <img class="dagger" src="../../dagger.svg" alt="">
  <p class="signoff"><a href="../../#players">Back to the board</a></p>
</main>
</body>
</html>
`;
}

const dir = path.join(root, 'players');
const wanted = new Set(PLAYERS.map((p) => p.slug));

for (const p of PLAYERS) {
  const out = path.join(dir, p.slug);
  fs.mkdirSync(out, { recursive: true });
  fs.writeFileSync(path.join(out, 'index.html'), page(p));
}

// a player dropped from the roster should not leave a live page behind
for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
  const isPage = entry.isDirectory() && fs.existsSync(path.join(dir, entry.name, 'index.html'));
  if (isPage && !wanted.has(entry.name)) {
    fs.rmSync(path.join(dir, entry.name), { recursive: true });
    console.log('removed', entry.name);
  }
}

console.log('wrote', PLAYERS.length, 'player pages');
