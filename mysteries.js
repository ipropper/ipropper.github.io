// Mysteries. Each entry is a report with an image and a status.
//
// To mark one solved, change status to "solved" and add a `solution` line.
// Solved ones drop below the unsolved automatically.
var MYSTERIES = [
  {
    title: "The guard house?",
    meta: "Eastern road",
    image: "images/ruin.svg",
    status: "unsolved",
    body: [
      "If you follow the eastern road there&rsquo;s a loan ruined guard house. I tried to get a closer look, but my piece of shit flashlight died. Couldn&rsquo;t see dick, but kept hearing a weird clicking?",
      "Asked the owner, course he doesn&rsquo;t know shit. Says it showed up last week. LAST WEEK? It&rsquo;s 100 years old! People can be so dense. Miraculously my flashlight started working again today. Think I&rsquo;ll check it out tonight&hellip;.."
    ]
  },
  {
    title: "That well is not dry",
    meta: "Past the north hedge",
    image: "images/well.svg",
    status: "unsolved",
    body: [
      "Owner swears the well&rsquo;s been dry since the seventies. Dropped a stone in Friday and counted four seconds. FOUR. That&rsquo;s not dry, that&rsquo;s deep.",
      "Threw a second one in to be sure and heard absolutely nothing. Not a splash, not a knock, nothing. So either it filled up between Tuesday and Friday or something down there caught it. I know which one I think."
    ]
  },
  {
    title: "Somebody is in the boathouse",
    meta: "Reported four nights running",
    image: "images/lantern.svg",
    status: "unsolved",
    body: [
      "There&rsquo;s a light in the boathouse most nights around one. Not a lamp left on &mdash; it moves. Goes window to window, slow, like somebody looking for something they already know isn&rsquo;t there.",
      "Asked at brunch and every single person said they were asleep. Every one. Fine, people lie, that&rsquo;s the whole weekend. But the boathouse is padlocked from the OUTSIDE. I checked. Twice."
    ]
  },
  {
    title: "Eleven coats",
    meta: "Front hall, Friday",
    image: "images/coats.svg",
    status: "unsolved",
    body: [
      "Ten of us came up on Friday. I hung mine last and counted eleven coats on the rail. Counted again. Eleven. Counted a third time because by then I was annoyed about it. Eleven.",
      "Went back after dinner and there were ten. Nobody left. Nobody drove anywhere. I am not saying anything, I am simply reporting that for about two hours this house had one more coat in it than it had people."
    ]
  },
  {
    title: "The door at the top",
    meta: "Second floor landing",
    image: "images/stairs.svg",
    status: "unsolved",
    body: [
      "House sleeps ten. Ten bedrooms. Go upstairs and count the doors on the landing and you get eleven, and one of them does not open. Not locked &mdash; there&rsquo;s no keyhole. It just doesn&rsquo;t.",
      "Owner says it&rsquo;s a cupboard. It is not a cupboard. You can hear the floor on the other side take somebody&rsquo;s weight when you stand close enough."
    ]
  },
  {
    title: "The cellar door will not stay shut",
    meta: "Kitchen stairs",
    image: "images/door.svg",
    status: "unsolved",
    body: [
      "Shut it, latched it, wedged a chair under the handle because I am not an idiot. Came back in twenty minutes and it was standing open and the chair was against the wall. Neatly. Against the wall.",
      "A draught doesn&rsquo;t move a chair and put it away tidy. I&rsquo;d like that on the record before anyone tells me it was the wind."
    ]
  },
  {
    title: "Nobody hired the caretaker",
    meta: "Seen from the kitchen window",
    image: "images/figure.svg",
    status: "unsolved",
    body: [
      "Man in the far field both mornings, just standing, facing the house. Waved on Saturday. He waved back, which honestly made it worse.",
      "Owner says there&rsquo;s no caretaker and hasn&rsquo;t been one for years. So who is he waving at? I was at the window. He was waving at me."
    ]
  },
  {
    title: "The clicking again",
    meta: "Throughout the property, after midnight",
    image: "images/clock.svg",
    status: "unsolved",
    body: [
      "Same clicking as the guard house, only now it&rsquo;s in the house. Kitchen first, then the hall, then outside my door around two. Regular. Like something counting.",
      "Timed it against my watch: four clicks, gap, four clicks. Four again. I don&rsquo;t love that it&rsquo;s four, given the well. Probably nothing. Sleeping with the light on regardless."
    ]
  }
];

(function () {
  var tabs = [].slice.call(document.querySelectorAll('[role="tab"]'));
  var list = document.getElementById('mysteries');

  // a tab controls its header and its panel, so aria-controls carries both ids
  function targets(tab) {
    return (tab.getAttribute('aria-controls') || '').split(/\s+/)
      .map(function (id) { return document.getElementById(id); })
      .filter(Boolean);
  }

  tabs.forEach(function (tab) {
    var on = tab.getAttribute('aria-selected') === 'true';
    targets(tab).forEach(function (el) { el.hidden = !on; });
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) {
        var sel = t === tab;
        t.setAttribute('aria-selected', String(sel));
        targets(t).forEach(function (el) { el.hidden = !sel; });
      });
      window.scrollTo(0, 0);
    });
  });

  if (!list) return;

  // unsolved first; within each group the order written above is kept
  var ordered = MYSTERIES.slice().sort(function (a, b) {
    return (a.status === 'solved' ? 1 : 0) - (b.status === 'solved' ? 1 : 0);
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
