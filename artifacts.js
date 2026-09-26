// The Artifacts tab: one carousel per challenge.
//
// Add photos by dropping files in artifacts/ and listing them under
// `images`. A carousel with an empty list renders as a placeholder, so
// the six slots stay visible while the photos are still coming in.
var ARTIFACTS = [
  {
    title: "Quinquina Dubonnet",
    images: [
      "artifacts/dubonnet-1.jpg",
      "artifacts/dubonnet-2.jpg",
      "artifacts/dubonnet-3.jpg",
      "artifacts/dubonnet-source.jpg"
    ]
  },
  { title: "Moonmad", images: [] },
  { title: "The Merry Jesters", images: [] },
  {
    title: "Carousel Four",
    images: [
      "artifacts/bronze-1.jpg",
      "artifacts/bronze-2.jpg",
      "artifacts/bronze-3.jpg",
      "artifacts/bronze-source.jpg"
    ]
  },
  {
    title: "Carousel Five",
    images: [
      "artifacts/owl-1.jpg",
      "artifacts/owl-2.jpg",
      "artifacts/owl-3.jpg",
      "artifacts/owl-source.jpg"
    ]
  },
  {
    title: "Carousel Six",
    images: [
      "artifacts/guard-1.jpg",
      "artifacts/guard-2.jpg",
      "artifacts/guard-3.jpg",
      "artifacts/guard-source.jpg"
    ]
  }
];

(function () {
  var root = document.getElementById('artifacts');
  if (!root) return;

  var html = '';
  ARTIFACTS.forEach(function (reel, r) {
    var n = reel.images.length;
    html += '<section class="reel">' +
      '<h3 class="reel-title">' + reel.title + '</h3>';

    if (!n) {
      html += '<p class="reel-empty">Photos to come.</p></section>';
      return;
    }

    html += '<div class="reel-stage">' +
      '<div class="reel-track" id="track-' + r + '" tabindex="0" role="group" aria-label="' + reel.title + ' photos">';
    reel.images.forEach(function (src, i) {
      html += '<figure class="slide">' +
        '<img src="' + src + '" alt="' + reel.title + ', photo ' + (i + 1) + ' of ' + n + '"' +
        (r === 0 && i === 0 ? '' : ' loading="lazy"') + '>' +
        '</figure>';
    });
    html += '</div>';

    if (n > 1) {
      html +=
        '<button class="reel-arrow reel-prev" type="button" data-reel="' + r + '" data-step="-1" aria-label="Previous photo">' +
          '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 4 L7 12 L15 20"/></svg></button>' +
        '<button class="reel-arrow reel-next" type="button" data-reel="' + r + '" data-step="1" aria-label="Next photo">' +
          '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 4 L17 12 L9 20"/></svg></button>';
    }
    html += '</div>';

    if (n > 1) {
      html += '<div class="reel-dots" id="dots-' + r + '">';
      for (var i = 0; i < n; i++) {
        html += '<button class="reel-dot" type="button" data-reel="' + r + '" data-to="' + i + '"' +
          ' aria-current="' + (i === 0) + '" aria-label="Photo ' + (i + 1) + '"></button>';
      }
      html += '</div>';
    }
    html += '</section>';
  });
  root.innerHTML = html;

  // one slide is exactly one track width, so index and scroll position agree
  function indexOf(track) {
    return Math.round(track.scrollLeft / track.clientWidth);
  }

  function goTo(track, i) {
    var last = track.children.length - 1;
    track.scrollTo({ left: Math.max(0, Math.min(i, last)) * track.clientWidth, behavior: 'smooth' });
  }

  ARTIFACTS.forEach(function (reel, r) {
    var track = document.getElementById('track-' + r);
    if (!track || reel.images.length < 2) return;
    var dots = [].slice.call(document.querySelectorAll('#dots-' + r + ' .reel-dot'));

    function sync() {
      var at = indexOf(track);
      dots.forEach(function (d, i) { d.setAttribute('aria-current', String(i === at)); });
    }

    track.addEventListener('scroll', function () {
      clearTimeout(track._t);
      track._t = setTimeout(sync, 90);
    });

    track.addEventListener('keydown', function (e) {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
      e.preventDefault();
      goTo(track, indexOf(track) + (e.key === 'ArrowRight' ? 1 : -1));
    });

    dots.forEach(function (d) {
      d.addEventListener('click', function () { goTo(track, +d.getAttribute('data-to')); });
    });
  });

  root.addEventListener('click', function (e) {
    var btn = e.target.closest ? e.target.closest('.reel-arrow') : null;
    if (!btn) return;
    var track = document.getElementById('track-' + btn.getAttribute('data-reel'));
    if (track) goTo(track, indexOf(track) + +btn.getAttribute('data-step'));
  });
})();
