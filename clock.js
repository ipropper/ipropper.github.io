// Counts down to 2pm ET on Saturday, September 26.
// Built from UTC parts so it lands on the same instant in every timezone:
// 2pm EDT (UTC-4) is 18:00 UTC. Month is 0-indexed, so 8 is September.
(function () {
  var el = document.getElementById("clock");
  if (!el) return;

  var deadline = new Date(Date.UTC(2026, 8, 26, 18, 0, 0));

  function pad(n) { return (n < 10 ? "0" : "") + n; }

  function tick() {
    var ms = deadline - new Date();

    if (ms <= 0) {
      el.textContent = "Time is up. Spoons down.";
      el.className = "clock over";
      return;
    }

    var s = Math.floor(ms / 1000);
    var days = Math.floor(s / 86400);
    var face = pad(Math.floor(s / 3600) % 24) + ":" + pad(Math.floor(s / 60) % 60) + ":" + pad(s % 60);

    el.textContent = days > 0 ? days + (days === 1 ? " day " : " days ") + face : face;
    el.className = s <= 3600 ? "clock urgent" : "clock";

    setTimeout(tick, 1000);
  }

  tick();
})();
