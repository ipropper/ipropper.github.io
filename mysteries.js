// The Red Rose Farm posts.
//
// Each entry is one dated post. `body` takes strings for paragraphs and
// {quote: "..."} for a pulled quote. To mark one solved, set
// status: "solved" and optionally add a `solution` line — solved posts
// drop below the unsolved ones.
var MYSTERIES = [
  {
    title: "Guard House",
    meta: "Fri, Sept 25 &middot; 7:02 PM",
    image: "images/ruin.svg",
    status: "unsolved",
    body: [
      "If you follow the eastern road there&rsquo;s a lone ruined guard house. Went to check it out, but my piece of shit flashlight died. Couldn&rsquo;t see anything, though I heard a weird clicking?",
      "Asked the caretaker, and of course he &ldquo;doesn&rsquo;t know.&rdquo; Says it showed up last week. LAST WEEK? It&rsquo;s 100 years old! This place is hilarious."
    ]
  },
  {
    title: "Creepy Books",
    meta: "Sat, Sept 26 &middot; 10:40 AM",
    image: "images/book.svg",
    status: "unsolved",
    body: [
      "Love the creepy vibe here. Found an old tome in the library, and the first page I opened to said:",
      { quote: "I grasped his throat to silence him, and in a moment he lay dead at my feet. I gazed on my victim, and my heart swelled with exultation and hellish triumph; clapping my hands, I exclaimed, &lsquo;I too can create desolation; my enemy is not invulnerable; this death will carry despair to him, and a thousand other miseries shall torment and destroy him.&rsquo;" },
      "Opened a few more. Blank, or said similar things. Then I found the old inn&rsquo;s guest book with a pressed red rose between the pages. My signature is in it. Dated 1901. Probably some kind of prank? Weird one, though."
    ]
  },
  {
    title: "Treasure Map",
    meta: "Sat, Sept 26 &middot; 1:05 PM",
    image: "images/map.svg",
    status: "unsolved",
    body: [
      "Found a funky treasure map on the way to the restroom. Wondering if it&rsquo;s part of some house scavenger hunt."
    ]
  },
  {
    title: "The Stable",
    meta: "Sat, Sept 26 &middot; 2:40 PM",
    image: "images/barn.svg",
    status: "unsolved",
    body: [
      "Found an abandoned stable in the fields, back wall was covered in scratches. Of course my name was scratched back there too, the name trick wasn&rsquo;t as scary the second time, but I appreciated the effort."
    ]
  },
  {
    title: "Basement Symbols",
    meta: "Sat, Sept 26 &middot; 4:30 PM",
    image: "images/sigil.svg",
    status: "unsolved",
    body: [
      "I took the basement tour, but it was pretty lame. It was mostly a guy dressed as the grim reaper doing a super fake Elizabeth Holmes voice. He lost his voice halfway through, and that&rsquo;s when I left.",
      "On the way out, I noticed a path sectioned off deeper in. So of course I skipped the barrier. Ha! I was looking for something creepy, and I was not disappointed. The basement felt endless. It took me almost 10 minutes to reach the final room. Chamber. I&rsquo;m calling it a chamber.",
      "It&rsquo;s covered in symbols, the same one from the map, everywhere. Dried rose petals all over the floor, and a lockbox in the middle. I tried it a few times but couldn&rsquo;t crack it, so I decided to high-tail it out of there. The place just made me feel uneasy, like I was being watched, ya know?"
    ]
  },
  {
    title: "What&rsquo;s That by the Pond?",
    meta: "Sat, Sept 26 &middot; 6:50 PM",
    image: "images/fish.svg",
    status: "unsolved",
    body: [
      "Something washed up by the pond while I was walking back for dinner. It&rsquo;s a fish, I think. Too many eyes. They were all looking at me. Caretaker says the pond&rsquo;s &ldquo;always had those.&rdquo;"
    ]
  },
  {
    title: "Koi Pond",
    meta: "Sat, Sept 26 &middot; 9:20 PM",
    image: "images/brick.svg",
    status: "unsolved",
    body: [
      "I was sitting by the koi when I noticed a loose brick in the wall. I pulled it out and found a small note. In MY handwriting. It just said &ldquo;RUN.&rdquo;"
    ]
  },
  {
    title: "Missing Pair",
    meta: "Sat, Sept 26 &middot; 11:10 PM",
    image: "images/shoe.svg",
    status: "unsolved",
    body: [
      "Came back to my room and one of my shoes is gone. The caretaker insists there&rsquo;s only ever been one. Pretty fucking sure I came with a pair."
    ]
  },
  {
    title: "Attic",
    meta: "Sun, Sept 27 &middot; 1:00 AM",
    image: "images/photos.svg",
    status: "unsolved",
    body: [
      "Been searching this place damn near all night. Then it hit me: there&rsquo;s one place I haven&rsquo;t looked. The attic. Found a box of photos up there. Me at the guard house. Me in the basement. Me asleep in my room.",
      "Under the photos was a stack of old illustrations, the kind the artists who lived here in the early 1900s used to draw. They&rsquo;re all of me. The first one is dated 1901.",
      "Got the fuck out of there."
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
    var blocks = m.body.map(function (b) {
      return b && b.quote ? '<blockquote>' + b.quote + '</blockquote>' : '<p>' + b + '</p>';
    }).join('');
    html +=
      '<li class="post' + (solved ? ' is-solved' : '') + '">' +
        '<div class="post-head">' +
          '<p class="post-meta">' + m.meta + '</p>' +
          '<span class="tag ' + (solved ? 'tag-solved' : 'tag-unsolved') + '">' +
            (solved ? 'Solved' : 'Unsolved') + '</span>' +
        '</div>' +
        '<h3 class="post-title">' + m.title + '</h3>' +
        '<img class="post-img" src="' + m.image + '" alt="" loading="lazy">' +
        blocks +
        (solved && m.solution ? '<p class="post-solution">' + m.solution + '</p>' : '') +
      '</li>';
  });
  list.innerHTML = html;
})();
