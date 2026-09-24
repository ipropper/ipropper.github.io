// Hearsay + Legends. Add, cut or rewrite freely — the page picks one at random.
var HEARSAY = [
  "The first Traitor is always the one who volunteers to pour.",
  "Never trust a player who compliments your dessert before tasting it.",
  "Three years running, the Faithful who sat with their back to the door was the first one murdered. Choose your chair.",
  "No Traitor has ever survived a round in which they laughed at their own alibi.",
  "The kitchen clock runs four minutes fast. It has always run four minutes fast. Nobody admits to setting it.",
  "A murder has never once happened before midnight. It has never once been late, either.",
  "If two players agree too quickly, one of them is lying and the other is about to be.",
  "The quietest person at brunch has won this game more often than anyone will admit.",
  "Say &ldquo;I&rsquo;m definitely Faithful&rdquo; three times and the house will hear you. So will everyone else.",
  "One year the Traitors murdered each other by accident. The Faithful never noticed and voted out an innocent anyway.",
  "No dessert has ever won a round on flavour alone. It was always the plating.",
  "Whoever volunteers to do the dishes is buying something. Work out what.",
  "The last to arrive is the first to be suspected. True every year. Wrong every year.",
  "Somebody always cries at the final vote. It is rarely the person who loses.",
  "A guest once won the whole weekend without speaking after Saturday brunch. Nobody could recall a single thing she had said.",
  "They say the winner&rsquo;s name is already written somewhere in this house."
];

(function () {
  var tabs = [].slice.call(document.querySelectorAll('[role="tab"]'));
  var excerpt = document.getElementById('excerpt');
  var draw = document.getElementById('draw');
  if (!tabs.length || !excerpt || !draw) return;

  // panels start open so the page still reads with JS off; the tabs take over here
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

  var last = -1;
  function tell() {
    if (HEARSAY.length < 2) { excerpt.innerHTML = HEARSAY[0] || ''; return; }
    var i = last;
    while (i === last) i = Math.floor(Math.random() * HEARSAY.length);
    last = i;
    excerpt.innerHTML = HEARSAY[i];
  }
  draw.addEventListener('click', tell);
  tell();
})();
