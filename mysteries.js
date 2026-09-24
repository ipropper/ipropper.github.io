// Mysteries. Each entry is a short post with an image and a status.
//
// To mark one solved, change status to "solved" and add a `solution` line.
// Solved mysteries drop below the unsolved ones automatically.
var MYSTERIES = [
  {
    title: "The Chair by the Door",
    meta: "Attributed to the third weekend",
    image: "images/chair.svg",
    status: "unsolved",
    body: [
      "Three years running, the Faithful who sat with their back to the door at Friday dinner was the first one murdered. Nobody has ever explained it. The Traitors of those years all denied choosing on that basis, and all three denied it a little too quickly.",
      "The chair is still at the table. It is not marked. Guests are advised to arrive early and count the doors."
    ]
  },
  {
    title: "The Clock That Runs Fast",
    meta: "Kitchen lore",
    image: "images/clock.svg",
    status: "unsolved",
    body: [
      "The kitchen clock runs four minutes fast. It has run four minutes fast for as long as anyone has cooked in this house, and nobody will admit to setting it.",
      "The received wisdom is that a Traitor did it in an early year, to make a rival late to a challenge. The rival was late. The rival was also murdered that night, so the experiment is considered inconclusive."
    ]
  },
  {
    title: "The Rule of Three Denials",
    meta: "A superstition, widely held",
    image: "images/tally.svg",
    status: "unsolved",
    body: [
      "Say &ldquo;I am definitely Faithful&rdquo; once and you will be believed. Say it twice and you will be watched. Say it three times and the room will decide without you.",
      "No Faithful has ever needed to say it more than once. This is offered as evidence, though it proves nothing."
    ]
  },
  {
    title: "The Silent Winner",
    meta: "The weekend nobody talks about",
    image: "images/silence.svg",
    status: "unsolved",
    body: [
      "A guest once won the whole weekend without speaking after Saturday brunch. She answered questions with a nod or a shrug, and cast her votes in writing.",
      "Afterwards not one person at that table could recall a single thing she had said. Three swore she had accused them. She had not."
    ]
  },
  {
    title: "The Year the Traitors Turned",
    meta: "Recorded, then disputed",
    image: "images/crossed.svg",
    status: "unsolved",
    body: [
      "One year the two Traitors murdered each other on the same night, each convinced the other was Faithful and closing in.",
      "The Faithful never noticed. They convened at brunch, deliberated for ninety minutes, and voted out an innocent man. The game had been over since midnight."
    ]
  },
  {
    title: "On Washing Up",
    meta: "Practical advice",
    image: "images/washing.svg",
    status: "unsolved",
    body: [
      "Whoever volunteers to wash up is buying something. Time at the sink is time out of the room, and time out of the room is an alibi nobody thinks to question.",
      "Let them. Then ask who suggested it."
    ]
  },
  {
    title: "On Plating",
    meta: "From the judges&rsquo; table",
    image: "images/plating.svg",
    status: "unsolved",
    body: [
      "No dessert has ever won a round on flavour alone. The record is unambiguous: the plate that looked like it meant something has beaten the plate that tasted better, every single time.",
      "Cook accordingly."
    ]
  },
  {
    title: "The Last to Arrive",
    meta: "A reliable error",
    image: "images/door.svg",
    status: "unsolved",
    body: [
      "The last guest through the door is the first to be suspected. This has been true every year without exception.",
      "It has also been wrong every year without exception. Both facts are well known. Neither has ever changed a single vote."
    ]
  }
];

(function () {
  var tabs = [].slice.call(document.querySelectorAll('[role="tab"]'));
  var list = document.getElementById('mysteries');

  tabs.forEach(function (tab) {
    var panel = document.getElementById(tab.getAttribute('aria-controls'));
    if (!panel) return;
    panel.hidden = tab.getAttribute('aria-selected') !== 'true';
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) {
        var p = document.getElementById(t.getAttribute('aria-controls'));
        if (!p) return;
        var on = t === tab;
        t.setAttribute('aria-selected', String(on));
        p.hidden = !on;
      });
    });
  });

  if (!list) return;

  // unsolved first; within each group, the order written above is kept
  var ordered = MYSTERIES.slice().sort(function (a, b) {
    var av = a.status === 'solved' ? 1 : 0;
    var bv = b.status === 'solved' ? 1 : 0;
    return av - bv;
  });

  var html = '';
  ordered.forEach(function (m) {
    var solved = m.status === 'solved';
    html += '<li class="mystery' + (solved ? ' is-solved' : '') + '">' +
      '<img class="mystery-img" src="' + m.image + '" alt="">' +
      '<div class="mystery-text">' +
        '<p class="tag ' + (solved ? 'tag-solved' : 'tag-unsolved') + '">' +
          (solved ? 'Solved' : 'Unsolved') + '</p>' +
        '<h3 class="mystery-title">' + m.title + '</h3>' +
        '<p class="mystery-meta">' + m.meta + '</p>' +
        m.body.map(function (b) { return '<p>' + b + '</p>'; }).join('') +
        (solved && m.solution ? '<p class="mystery-solution">' + m.solution + '</p>' : '') +
      '</div></li>';
  });
  list.innerHTML = html;
})();
