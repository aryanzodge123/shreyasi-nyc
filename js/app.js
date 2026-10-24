/*
  The front page has two parts, switched by the bar at the top:
    0. Before the games open (gamesAt) the whole site shows only a countdown.
    1. Birthday games: open from gamesAt on. Slide puzzle and memory match that unlock gifts (js/gifts.js).
    2. Our trip: a countdown until the unlock time, then the full trip page.
  Countdown and unlock. Until the unlock time the trip part shows only the countdown.
  The trip content, games and weather code are loaded only after the unlock, so the page does not
  show any plans before then. The unlock uses the device clock, so someone who changes their phone
  clock could open it early. That is fine for a surprise, but it is not security.
*/
(function () {
  "use strict";
  window.NYC = window.NYC || {};

  var CFG = window.NYC_CONFIG;
  var UNLOCK_MS = Date.parse(CFG.unlockAt);
  var GAMES_MS = Date.parse(CFG.gamesAt);
  var params = new URLSearchParams(window.location.search);
  var preview = params.get("preview") === CFG.previewCode;
  var unlocked = false;
  var tick = null;
  var siteTick = null;
  var begun = false;

  var SCRIPTS = ["js/data.js", "js/weather.js", "js/mostlikely.js", "js/quiz-data.js", "js/quiz.js", "js/site.js"];
  var part = "games";
  var toastTimer = null;

  function $(id) { return document.getElementById(id); }

  function pad(n) { return n < 10 ? "0" + n : String(n); }

  /* ---------- The two parts ---------- */

  function partFromHash() {
    var m = /^#\/(games|trip)$/.exec(window.location.hash);
    return m ? m[1] : null;
  }

  function showToast(message) {
    var t = $("toast");
    if (!t) return;
    t.textContent = message;
    t.classList.add("show");
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove("show"); }, 3200);
  }

  function updateRibbon() {
    var r = $("preview-ribbon");
    if (r) r.hidden = !(preview && part === "trip" && unlocked);
  }

  function setPart(next, silent) {
    part = next;
    $("part-games").hidden = next !== "games";
    $("part-trip").hidden = next !== "trip";
    $("part-btn-games").setAttribute("aria-pressed", next === "games" ? "true" : "false");
    $("part-btn-trip").setAttribute("aria-pressed", next === "trip" ? "true" : "false");
    document.body.setAttribute("data-part", next);
    $("part-btn-trip").classList.remove("has-news");
    if (!silent) {
      try { window.history.replaceState(null, "", window.location.pathname + window.location.search + "#/" + next); } catch (e) { /* ignore */ }
      window.scrollTo(0, 0);
    }
    updateRibbon();
  }

  function setTripLabel(text) {
    var s = $("trip-sub");
    if (s) s.textContent = text;
  }

  function fillCountdown(prefix, ms) {
    var total = Math.max(0, Math.floor(ms / 1000));
    var d = Math.floor(total / 86400);
    var h = Math.floor((total % 86400) / 3600);
    var m = Math.floor((total % 3600) / 60);
    var s = total % 60;
    $(prefix + "-days").textContent = String(d);
    $(prefix + "-hours").textContent = pad(h);
    $(prefix + "-mins").textContent = pad(m);
    $(prefix + "-secs").textContent = pad(s);
    var parts = [];
    parts.push(d + (d === 1 ? " day" : " days"));
    parts.push(h + (h === 1 ? " hour" : " hours"));
    parts.push(m + (m === 1 ? " minute" : " minutes"));
    $(prefix + "-live").textContent = parts.join(", ") + " to go";
    return { d: d, h: h, m: m };
  }

  function renderCountdown(ms) {
    var t = fillCountdown("cd", ms);
    setTripLabel(t.d > 0 ? "Opens in " + t.d + (t.d === 1 ? " day" : " days") : t.h > 0 ? "Opens in " + t.h + "h" : "Opens in " + t.m + "m");
  }

  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      var s = document.createElement("script");
      s.src = src;
      s.onload = resolve;
      s.onerror = function () { reject(new Error("Could not load " + src)); };
      document.head.appendChild(s);
    });
  }

  function loadAll() {
    return SCRIPTS.reduce(function (chain, src) {
      return chain.then(function () { return loadScript(src); });
    }, Promise.resolve());
  }

  function unlock(celebrate) {
    if (unlocked) return;
    unlocked = true;
    if (tick) clearInterval(tick);
    loadAll().then(function () {
      window.NYC.render();
      var lockedEl = $("locked");
      var siteEl = $("site");
      lockedEl.hidden = true;
      siteEl.hidden = false;
      document.body.classList.remove("is-locked");
      document.body.classList.add("is-open");
      setTripLabel("Open now");
      updateRibbon();
      if (celebrate && part === "trip") {
        if (window.NYC.hearts) window.NYC.hearts.burst(window.innerWidth / 2, window.innerHeight / 3, 60);
        window.scrollTo(0, 0);
      } else if (celebrate) {
        $("part-btn-trip").classList.add("has-news");
        showToast("Your trip page is open! Tap Our trip.");
      }
      if (!celebrate) window.scrollTo(0, 0);
    }).catch(function (err) {
      unlocked = false;
      var e = $("load-error");
      if (e) {
        e.hidden = false;
        e.textContent = "Oops, something did not load. Check your connection and refresh the page.";
      }
      if (window.console) console.error(err);
    });
  }

  /* The games part and the trip countdown. Runs once the whole site is open. */
  function begin() {
    if (begun) return;
    begun = true;
    if (window.NYC.gifts) window.NYC.gifts.render($("gifts-root"));

    var isOpen = preview || Date.now() >= UNLOCK_MS;
    $("part-btn-games").addEventListener("click", function () { setPart("games"); });
    $("part-btn-trip").addEventListener("click", function () { setPart("trip"); });
    window.addEventListener("hashchange", function () {
      var p = partFromHash();
      if (p && p !== part) setPart(p, true);
    });
    setPart(partFromHash() || (isOpen ? "trip" : "games"), true);

    if (isOpen) {
      unlock(false);
      return;
    }

    renderCountdown(UNLOCK_MS - Date.now());
    tick = setInterval(function () {
      var left = UNLOCK_MS - Date.now();
      if (left <= 0) {
        renderCountdown(0);
        unlock(true);
        return;
      }
      renderCountdown(left);
    }, 1000);
  }

  function openFront(celebrate) {
    if (siteTick) clearInterval(siteTick);
    $("site-lock").hidden = true;
    $("front").hidden = false;
    begin();
    if (celebrate) {
      window.scrollTo(0, 0);
      if (window.NYC.hearts) window.NYC.hearts.burst(window.innerWidth / 2, window.innerHeight / 3, 60);
    }
  }

  function start() {
    if (window.NYC.hearts) window.NYC.hearts.start();

    if (preview || Date.now() >= GAMES_MS) {
      openFront(false);
      return;
    }

    /* Before the games open: only the countdown is on the page. */
    $("site-lock").hidden = false;
    fillCountdown("sl", GAMES_MS - Date.now());
    siteTick = setInterval(function () {
      var left = GAMES_MS - Date.now();
      if (left <= 0) {
        fillCountdown("sl", 0);
        openFront(true);
        return;
      }
      fillCountdown("sl", left);
    }, 1000);
  }

  window.NYC.app = { start: start, unlock: unlock };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
