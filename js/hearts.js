/* Falling hearts, plus a burst for celebrations. Turned off when the device asks for reduced motion. */
(function () {
  "use strict";
  window.NYC = window.NYC || {};

  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var COLORS = ["#D4163C", "#F27A93", "#FF9E7A", "#FFB9C6", "#B0123F", "#FFC24D"];
  var SVG = '<svg viewBox="0 0 32 29" aria-hidden="true" focusable="false"><path fill="currentColor" d="M23.6 0c-3.4 0-6.4 2.3-7.6 5.5C14.8 2.3 11.8 0 8.4 0 3.8 0 0 3.8 0 8.4c0 9.1 9.3 11.6 16 20.6 6.7-9 16-11.5 16-20.6C32 3.8 28.2 0 23.6 0z"/></svg>';
  var MAX_ACTIVE = 16;
  var timer = null;
  var active = 0;

  function layer() {
    return document.getElementById("hearts");
  }

  function pick(list) {
    return list[Math.floor(Math.random() * list.length)];
  }

  function makeHeart(cls) {
    var h = document.createElement("span");
    h.className = cls;
    h.innerHTML = SVG;
    h.style.color = pick(COLORS);
    return h;
  }

  function fall() {
    var l = layer();
    if (!l) return;
    var h = makeHeart("heart heart-fall");
    var size = 14 + Math.random() * 22;
    h.style.left = Math.random() * 100 + "vw";
    h.style.width = size + "px";
    h.style.setProperty("--sway", (10 + Math.random() * 26) + "px");
    h.style.animationDuration = (9 + Math.random() * 8) + "s";
    h.style.opacity = String(0.45 + Math.random() * 0.4);
    active++;
    h.addEventListener("animationend", function () {
      active--;
      if (h.parentNode) h.parentNode.removeChild(h);
    });
    l.appendChild(h);
  }

  function start() {
    if (reduce || timer) return;
    for (var i = 0; i < 6; i++) setTimeout(fall, i * 350);
    timer = setInterval(function () {
      if (document.hidden || active >= MAX_ACTIVE) return;
      fall();
    }, 800);
  }

  function stop() {
    if (timer) clearInterval(timer);
    timer = null;
  }

  function burst(x, y, count) {
    var l = layer();
    if (!l || reduce) return;
    var n = count || 36;
    if (typeof x !== "number") x = window.innerWidth / 2;
    if (typeof y !== "number") y = window.innerHeight / 2;
    for (var i = 0; i < n; i++) {
      var h = makeHeart("heart heart-burst");
      var angle = Math.random() * Math.PI * 2;
      var dist = 90 + Math.random() * 220;
      h.style.left = x + "px";
      h.style.top = y + "px";
      h.style.width = 14 + Math.random() * 24 + "px";
      h.style.setProperty("--dx", Math.cos(angle) * dist + "px");
      h.style.setProperty("--dy", Math.sin(angle) * dist - 90 + "px");
      h.style.setProperty("--rot", (Math.random() * 120 - 60) + "deg");
      h.style.animationDuration = 1.3 + Math.random() * 1.1 + "s";
      (function (el) {
        el.addEventListener("animationend", function () {
          if (el.parentNode) el.parentNode.removeChild(el);
        });
      })(h);
      l.appendChild(h);
    }
  }

  function heartSVG() {
    var wrap = document.createElement("span");
    wrap.innerHTML = SVG;
    return wrap.firstChild;
  }

  window.NYC.hearts = { start: start, stop: stop, burst: burst, svg: heartSVG };
})();
