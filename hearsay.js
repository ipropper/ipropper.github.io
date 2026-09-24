// Hearsay + Legends. Each entry is a short post: a title, a line of
// attribution, and one or more paragraphs. Add, cut or rewrite freely.
var HEARSAY = [
  {
    title: "The Chair by the Door",
    meta: "Attributed to the third weekend",
    body: [
      "Three years running, the Faithful who sat with their back to the door at Friday dinner was the first one murdered. Nobody has ever explained it. The Traitors of those years have all denied choosing on that basis, and all three denied it a little too quickly.",
      "The chair is still at the table. It is not marked. Guests are advised to arrive early and count the doors."
    ]
  },
  {
    title: "The Clock That Runs Fast",
    meta: "Kitchen lore",
    body: [
      "The kitchen clock runs four minutes fast. It has run four minutes fast for as long as anyone has cooked in this house, and nobody will admit to setting it.",
      "The received wisdom is that it was done by a Traitor in an early year, to make a rival late to a challenge. The rival was late. The rival was also murdered that night, so the experiment is considered inconclusive."
    ]
  },
  {
    title: "The Rule of Three Denials",
    meta: "A superstition, widely held",
    body: [
      "Say &ldquo;I am definitely Faithful&rdquo; once and you will be believed. Say it twice and you will be watched. Say it three times and the room will decide without you.",
      "No Faithful has ever needed to say it more than once. This is offered as evidence, though it proves nothing."
    ]
  },
  {
    title: "The Silent Winner",
    meta: "The weekend nobody talks about",
    body: [
      "A guest once won the whole weekend without speaking after Saturday brunch. She answered questions with a nod or a shrug, and cast her votes in writing.",
      "Afterwards not one person at that table could recall a single thing she had said. Three swore she had accused them. She had not."
    ]
  },
  {
    title: "The Year the Traitors Turned",
    meta: "Recorded, then disputed",
    body: [
      "One year the two Traitors murdered each other on the same night, each convinced the other was Faithful and closing in.",
      "The Faithful never noticed. They convened at brunch, deliberated for ninety minutes, and voted out an innocent man. The game had been over since midnight."
    ]
  },
  {
    title: "On Washing Up",
    meta: "Practical advice",
    body: [
      "Whoever volunteers to wash up is buying something. Time at the sink is time out of the room, and time out of the room is an alibi nobody thinks to question.",
      "Let them. Then ask who suggested it."
    ]
  },
  {
    title: "On Plating",
    meta: "From the judges&rsquo; table",
    body: [
      "No dessert has ever won a round on flavour alone. The record is unambiguous: the plate that looked like it meant something has beaten the plate that tasted better, every single time.",
      "Cook accordingly."
    ]
  },
  {
    title: "The Last to Arrive",
    meta: "A reliable error",
    body: [
      "The last guest through the door is the first to be suspected. This has been true every year without exception.",
      "It has also been wrong every year without exception. Both facts are well known. Neither has ever changed a single vote."
    ]
  }
];

(function () {
  var tabs = [].slice.call(document.querySelectorAll('[role="tab"]'));
  var legend = document.getElementById('legend');
  var draw = document.getElementById('draw');
  if (!tabs.length || !legend || !draw) return;

  // panels start open so the page still reads with JS off; the nav takes over here
  tabs.forEach(function (tab) {
    var panel = document.getElementById(tab.getAttribute('aria-controls'));
    panel.hidden = tab.getAttribute('aria-selected') !== 'true';
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) {
        var p = document.getElementById(t.getAttribute('aria-controls'));
        var on = t === tab;
        t.setAttribute('aria-selected', String(on));
        p.hidden = !on;
      });
    });
  });

  function render(post) {
    var html = '<h3 class="legend-title">' + post.title + '</h3>' +
               '<p class="legend-meta">' + post.meta + '</p>';
    for (var i = 0; i < post.body.length; i++) html += '<p>' + post.body[i] + '</p>';
    legend.innerHTML = html;
  }

  var last = -1;
  function tell() {
    if (HEARSAY.length < 2) { if (HEARSAY.length) render(HEARSAY[0]); return; }
    var i = last;
    while (i === last) i = Math.floor(Math.random() * HEARSAY.length);
    last = i;
    render(HEARSAY[i]);
  }
  draw.addEventListener('click', tell);
  tell();
})();
