// The Players tab: an evidence board.
//
// The board is rendered by players/index.html, so a card links to a
// sibling folder. Add a player by dropping the photo in players/ and
// appending here, then re-run build-players.mjs.
// Optional per player: `death` or `fate` (shown under the badge) and
// `timeline`, a list of beats. A beat takes any of `text`, `media`
// (an image) and `clip` (a video, with an optional `poster`); media
// paths are relative to that player's own folder, except `clip`,
// which is an absolute URL on the R2 bucket.
// The grid is 3 across on phones and 5 on desktop, and the red thread
// is redrawn from wherever the cards actually land.
var PLAYERS = [
  {
    name: "Alex", slug: "alex", role: "faithful", src: "player-1.jpg",
    death: "Murdered in Clue",
    timeline: [
      { clip: "https://pub-ffcac53264b949d8b21c3a4641010a8b.r2.dev/IMG_3573.mp4", poster: "still-1.jpg" },
      { clip: "https://pub-ffcac53264b949d8b21c3a4641010a8b.r2.dev/alex2.mp4", poster: "still-2.jpg" }
    ]
  },
  {
    name: "Joe", slug: "joe", role: "traitor", src: "player-2.jpg",
    death: "Friendly Fire",
    timeline: [
      { clip: "https://pub-ffcac53264b949d8b21c3a4641010a8b.r2.dev/IMG_7438.mp4", poster: "clip-1.jpg" },
      { text: "Becomes a traitor, recruited by the imposter card.", media: "imposter-card.webp" },
      { text: "Murdered by his fellow traitors." }
    ]
  },
  {
    name: "Derek", slug: "derek", role: "faithful", src: "player-3.jpg",
    death: "Early flight home",
    timeline: [
      { clip: "https://pub-ffcac53264b949d8b21c3a4641010a8b.r2.dev/IMG_7426.mp4", poster: "clip-1.jpg" }
    ]
  },
  {
    name: "Dew", slug: "dew", role: "faithful", src: "player-4.jpg",
    death: "Banishment",
    timeline: [
      { clip: "https://pub-ffcac53264b949d8b21c3a4641010a8b.r2.dev/IMG_7427.mp4", poster: "clip-1.jpg" }
    ]
  },
  {
    name: "Kamala", slug: "kamala", role: "faithful", src: "player-5.jpg",
    death: "Banishment",
    timeline: [
      { clip: "https://pub-ffcac53264b949d8b21c3a4641010a8b.r2.dev/IMG_7428.mp4", poster: "clip-1.jpg" }
    ]
  },
  {
    name: "Shrey", slug: "shrey", role: "faithful", src: "player-6.jpg",
    death: "Banishment",
    timeline: [
      { clip: "https://pub-ffcac53264b949d8b21c3a4641010a8b.r2.dev/IMG_5260.mp4", poster: "clip-1.jpg" }
    ]
  },
  {
    name: "Ash", slug: "ash", role: "traitor", src: "player-7.jpg",
    death: "Banishment",
    timeline: [
      { clip: "https://pub-ffcac53264b949d8b21c3a4641010a8b.r2.dev/IMG_7434.mp4", poster: "clip-1.jpg" }
    ]
  },
  {
    name: "Erkina", slug: "erkina", role: "faithful", src: "player-8.jpg",
    death: "Banishment",
    timeline: [
      { clip: "https://pub-ffcac53264b949d8b21c3a4641010a8b.r2.dev/IMG_7432.mp4", poster: "clip-1.jpg" }
    ]
  },
  {
    name: "Phil", slug: "phil", role: "traitor", src: "player-9.jpg",
    death: "Daisy’s wrath",
    timeline: [
      { media: "clip-1.jpg" },
      { clip: "https://pub-ffcac53264b949d8b21c3a4641010a8b.r2.dev/phil2.mp4", poster: "clip-2.jpg" },
      { media: "cloak-and-dagger.webp" }
    ]
  },
  {
    name: "Bailey", slug: "bailey", role: "faithful", src: "player-10.jpg",
    death: "Banishment",
    timeline: [
      { clip: "https://pub-ffcac53264b949d8b21c3a4641010a8b.r2.dev/IMG_7422.mp4", poster: "clip-1.jpg" },
      { clip: "https://pub-ffcac53264b949d8b21c3a4641010a8b.r2.dev/bailey2.mp4", poster: "clip-2.jpg" }
    ]
  },
  {
    name: "Ada", slug: "ada", role: "faithful", src: "player-11.jpg",
    death: "First blood!",
    timeline: [
      { clip: "https://pub-ffcac53264b949d8b21c3a4641010a8b.r2.dev/IMG_7431.mp4", poster: "clip-1.jpg" }
    ]
  },
  {
    name: "Steph", slug: "steph", role: "traitor", src: "player-12.jpg",
    death: "Suicide via sugar packet",
    timeline: [
      { clip: "https://pub-ffcac53264b949d8b21c3a4641010a8b.r2.dev/IMG_7419.mp4", poster: "clip-1.jpg" }
    ]
  },
  {
    name: "Susie", slug: "susie", role: "faithful", src: "player-13.jpg",
    death: "Banishment",
    timeline: [
      { clip: "https://pub-ffcac53264b949d8b21c3a4641010a8b.r2.dev/IMG_7424.mp4", poster: "clip-1.jpg" },
      { clip: "https://pub-ffcac53264b949d8b21c3a4641010a8b.r2.dev/susie2.mp4", poster: "clip-2.jpg" }
    ]
  },
  {
    name: "Nick", slug: "nick", role: "faithful", src: "player-14.jpg",
    death: "Banishment",
    timeline: [
      { clip: "https://pub-ffcac53264b949d8b21c3a4641010a8b.r2.dev/IMG_7436.mp4", poster: "clip-1.jpg" },
      { clip: "https://pub-ffcac53264b949d8b21c3a4641010a8b.r2.dev/nick2.mp4", poster: "clip-2.jpg" }
    ]
  },
  {
    name: "Ardyn", slug: "ardyn", role: "faithful", src: "player-15.jpg",
    fate: "Survived to the bitter end",
    timeline: [
      { clip: "https://pub-ffcac53264b949d8b21c3a4641010a8b.r2.dev/ardyn.mp4", poster: "clip-1.jpg" },
      { clip: "https://pub-ffcac53264b949d8b21c3a4641010a8b.r2.dev/ardyn2.mp4", poster: "clip-2.jpg" }
    ]
  },
  {
    name: "Daniel", slug: "daniel", role: "faithful", src: "player-16.jpg",
    death: "First blood",
    timeline: [
      { clip: "https://pub-ffcac53264b949d8b21c3a4641010a8b.r2.dev/IMG_7425.mp4", poster: "clip-1.jpg" }
    ]
  },
  {
    name: "Check", slug: "check", role: "faithful", src: "player-17.jpg",
    death: "Boredom",
    timeline: [
      { clip: "https://pub-ffcac53264b949d8b21c3a4641010a8b.r2.dev/IMG_7421.mp4", poster: "clip-1.jpg" }
    ]
  },
  {
    name: "Sasha", slug: "sasha", role: "faithful", src: "player-18.jpg",
    death: "Banishment, the true death",
    timeline: [
      { clip: "https://pub-ffcac53264b949d8b21c3a4641010a8b.r2.dev/IMG_7430.mp4", poster: "clip-1.jpg" },
      { text: "Murdered." },
      { text: "Brought back by Daisy’s grace.", media: "holy-prayer.webp" },
      { text: "Banished. That one stuck." }
    ]
  },
  {
    name: "Devon", slug: "devon", role: "faithful", src: "player-19.jpg",
    death: "Murdered",
    timeline: [
      { clip: "https://pub-ffcac53264b949d8b21c3a4641010a8b.r2.dev/IMG_7429.mp4", poster: "clip-1.jpg" }
    ]
  },
  {
    name: "Navya", slug: "navya", role: "faithful", src: "player-20.jpg",
    death: "Banishment",
    timeline: [
      { clip: "https://pub-ffcac53264b949d8b21c3a4641010a8b.r2.dev/IMG_7467.mp4", poster: "clip-1.jpg" },
      { clip: "https://pub-ffcac53264b949d8b21c3a4641010a8b.r2.dev/navya2.mp4", poster: "clip-2.jpg" }
    ]
  },
  {
    name: "Kushal", slug: "kushal", role: "faithful", src: "player-21.jpg",
    death: "Banishment",
    timeline: [
      { clip: "https://pub-ffcac53264b949d8b21c3a4641010a8b.r2.dev/IMG_7468.mp4", poster: "clip-1.jpg" }
    ]
  },
  {
    name: "Zac", slug: "zac", role: "traitor", src: "player-22.jpg",
    death: "Banishment"
  },
  {
    name: "Dan", slug: "dan", role: "faithful", src: "player-23.jpg",
    fate: "Survived to the bitter end",
    timeline: [
      { clip: "https://pub-ffcac53264b949d8b21c3a4641010a8b.r2.dev/dan1.mp4", poster: "clip-2.jpg" },
      { text: "Banished." },
      { text: "Brought back by the Christian Daisy.", media: "holy-prayer.webp" },
      { clip: "https://pub-ffcac53264b949d8b21c3a4641010a8b.r2.dev/dan2.mp4", poster: "clip-1.jpg" }
    ]
  },
  {
    name: "Gautham", slug: "gautham", role: "faithful", src: "player-24.jpg",
    death: "Early flight",
    timeline: [
      { clip: "https://pub-ffcac53264b949d8b21c3a4641010a8b.r2.dev/gautham.mp4", poster: "clip-1.jpg" }
    ]
  }
];

(function () {
  var board = document.getElementById('board');
  if (!board) return;

  // repeating tilts and drops, so the wall never falls into a tidy grid
  var TILT = [-2.6, 1.9, -1.1, 2.7, -2.1, 1.3, -3, 2.2, -1.6];
  var DROP = [10, 0, 16, 4, 12, 0, 6, 14, 2];

  var html = '<svg class="board-web" aria-hidden="true"></svg><div class="board-grid">';
  PLAYERS.forEach(function (p, i) {
    html += '<figure class="suspect" style="--tilt:' + TILT[i % TILT.length] + 'deg;' +
      '--drop:' + DROP[i % DROP.length] + 'px">' +
      '<span class="pin" aria-hidden="true"></span>' +
      '<a class="suspect-link" href="' + p.slug + '/">' +
      // the name beside it is what labels the link, so the photo needs no alt
      '<img src="' + p.src + '" alt=""' + (i < 6 ? '' : ' loading="lazy"') + '>' +
      '<span class="suspect-name">' + p.name + '</span>' +
      '</a></figure>';
  });
  html += '</div>';
  board.innerHTML = html;

  var svg = board.querySelector('.board-web');
  var cards = [].slice.call(board.querySelectorAll('.suspect'));
  if (cards.length < 2) return;

  // each card joins the next, and the one three along — which is the card
  // directly below it at phone width, so the thread reads as a web either way
  var links = [];
  for (var i = 0; i < cards.length - 1; i++) links.push([i, i + 1]);
  for (var j = 0; j + 3 < cards.length; j++) links.push([j, j + 3]);
  if (cards.length > 3) links.push([0, cards.length - 1]);

  function centres() {
    var base = board.getBoundingClientRect();
    return cards.map(function (c) {
      var r = c.getBoundingClientRect();
      return { x: r.left - base.left + r.width / 2, y: r.top - base.top + r.height / 2 };
    });
  }

  function draw() {
    var box = board.getBoundingClientRect();
    if (!box.width) return; // laid out in a hidden panel; wait for the tab
    var pts = centres();
    svg.setAttribute('viewBox', '0 0 ' + box.width + ' ' + box.height);
    svg.innerHTML = links.map(function (l) {
      var a = pts[l[0]], b = pts[l[1]];
      return '<line x1="' + a.x + '" y1="' + a.y + '" x2="' + b.x + '" y2="' + b.y + '"/>';
    }).join('');
  }

  draw();
  window.addEventListener('resize', draw);
  // the tab starts hidden, so the first real measurement comes later
  document.querySelectorAll('[role="tab"]').forEach(function (t) {
    t.addEventListener('click', function () { setTimeout(draw, 0); });
  });
  cards.forEach(function (c) {
    var img = c.querySelector('img');
    if (img && !img.complete) img.addEventListener('load', draw);
  });
})();
