// The Players tab: an evidence board.
//
// Add a player by dropping the photo in players/ and appending here,
// then re-run build-players.mjs to write their page at players/<slug>/.
// The grid is 3 across on phones and 5 on desktop, and the red thread
// is redrawn from wherever the cards actually land.
var PLAYERS = [
  { name: "Alex", slug: "alex", role: "faithful", src: "players/player-1.jpg" },
  { name: "Joe", slug: "joe", role: "faithful", src: "players/player-2.jpg" },
  { name: "Derek", slug: "derek", role: "faithful", src: "players/player-3.jpg" },
  { name: "Dew", slug: "dew", role: "faithful", src: "players/player-4.jpg" },
  { name: "Kamala", slug: "kamala", role: "faithful", src: "players/player-5.jpg" },
  { name: "Shrey", slug: "shrey", role: "faithful", src: "players/player-6.jpg" },
  { name: "Ash", slug: "ash", role: "traitor", src: "players/player-7.jpg" },
  { name: "Erkina", slug: "erkina", role: "faithful", src: "players/player-8.jpg" },
  { name: "Phil", slug: "phil", role: "traitor", src: "players/player-9.jpg" },
  { name: "Bailey", slug: "bailey", role: "faithful", src: "players/player-10.jpg" },
  { name: "Ada", slug: "ada", role: "faithful", src: "players/player-11.jpg" },
  { name: "Steph", slug: "steph", role: "traitor", src: "players/player-12.jpg" },
  { name: "Susie", slug: "susie", role: "faithful", src: "players/player-13.jpg" },
  { name: "Nick", slug: "nick", role: "faithful", src: "players/player-14.jpg" },
  { name: "Ardyn", slug: "ardyn", role: "faithful", src: "players/player-15.jpg" },
  { name: "Daniel", slug: "daniel", role: "faithful", src: "players/player-16.jpg" },
  { name: "Check", slug: "check", role: "faithful", src: "players/player-17.jpg" },
  { name: "Sasha", slug: "sasha", role: "faithful", src: "players/player-18.jpg" },
  { name: "Devon", slug: "devon", role: "faithful", src: "players/player-19.jpg" },
  { name: "Navya", slug: "navya", role: "faithful", src: "players/player-20.jpg" },
  { name: "Kushal", slug: "kushal", role: "faithful", src: "players/player-21.jpg" },
  { name: "Zac", slug: "zac", role: "traitor", src: "players/player-22.jpg" },
  { name: "Dan", slug: "dan", role: "faithful", src: "players/player-23.jpg" }
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
      '<a class="suspect-link" href="players/' + p.slug + '/">' +
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
