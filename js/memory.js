/*
  Memory match: 16 face down tiles. Eight are photos and eight are sentences about where each
  photo was taken. Flip two tiles. They match when one is a photo and the other is its sentence.
  Long sentences are cut off on the tile, so the full text always appears in the caption above the board.
*/
(function () {
  "use strict";
  window.NYC = window.NYC || {};

  var BEST_KEY = "nyc-memory-best-v1";
  var MISMATCH_MS = 1700;

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  function readBest() {
    try { var v = localStorage.getItem(BEST_KEY); return v ? parseInt(v, 10) : null; } catch (e) { return null; }
  }
  function writeBest(v) {
    try { localStorage.setItem(BEST_KEY, String(v)); } catch (e) { /* storage can be blocked */ }
  }

  function shuffled(list) {
    var a = list.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function mount(root, pairs, cfg) {
    var recipient = (cfg && cfg.recipient) || "you";
    var tiles = [];
    var first = null;
    var second = null;
    var lock = false;
    var moves = 0;
    var found = 0;
    var timeoutId = null;

    root.innerHTML = "";
    var wrap = el("div", "memory");

    var stats = el("p", "game-stats");
    var movesOut = el("span", "", "0");
    var foundOut = el("span", "", "0 of " + pairs.length);
    var bestOut = el("span", "", "none yet");
    stats.appendChild(document.createTextNode("Tries "));
    stats.appendChild(movesOut);
    stats.appendChild(document.createTextNode("  Pairs "));
    stats.appendChild(foundOut);
    stats.appendChild(document.createTextNode("  Best "));
    stats.appendChild(bestOut);

    var caption = el("div", "memory-caption");
    caption.setAttribute("aria-live", "polite");
    var captionText = el("p", "", "Flip two tiles. Match each photo with the sentence about where we took it.");
    caption.appendChild(captionText);

    var board = el("div", "memory-board");
    board.setAttribute("role", "group");
    board.setAttribute("aria-label", "Memory game board with " + pairs.length * 2 + " tiles");

    var controls = el("div", "game-controls");
    var newBtn = el("button", "btn btn-primary", "New game");
    newBtn.type = "button";
    controls.appendChild(newBtn);

    var gallery = el("div", "memory-gallery");
    gallery.hidden = true;

    wrap.appendChild(stats);
    wrap.appendChild(caption);
    wrap.appendChild(board);
    wrap.appendChild(controls);
    wrap.appendChild(gallery);
    root.appendChild(wrap);

    function updateBest() {
      var b = readBest();
      bestOut.textContent = b ? b + " tries" : "none yet";
    }

    function setCaption(lines, cls) {
      caption.className = "memory-caption" + (cls ? " " + cls : "");
      caption.innerHTML = "";
      lines.forEach(function (l) { caption.appendChild(el("p", "", l)); });
    }

    function describe(t) {
      return t.kind === "img" ? "Photo: " + pairs[t.pair].alt : pairs[t.pair].tag;
    }

    function buildTile(t, index) {
      var btn = el("button", "mtile");
      btn.type = "button";
      btn.setAttribute("aria-label", "Face down tile " + (index + 1));
      var inner = el("span", "mtile-inner");
      var back = el("span", "mface mback");
      back.appendChild(window.NYC.hearts ? window.NYC.hearts.svg() : document.createTextNode("♥"));
      var front = el("span", "mface mfront");
      if (t.kind === "img") {
        var img = el("img", "mimg");
        img.src = pairs[t.pair].image;
        img.alt = "";
        img.draggable = false;
        front.appendChild(img);
        front.classList.add("is-photo");
      } else {
        front.appendChild(el("span", "mtag", pairs[t.pair].tag));
        front.classList.add("is-tag");
      }
      inner.appendChild(back);
      inner.appendChild(front);
      btn.appendChild(inner);
      t.el = btn;
      btn.addEventListener("click", function () { onFlip(t); });
      return btn;
    }

    function reveal(t) {
      t.flipped = true;
      t.el.classList.add("flipped");
      t.el.setAttribute("aria-label", describe(t));
    }

    function hide(t) {
      t.flipped = false;
      t.el.classList.remove("flipped");
      t.el.setAttribute("aria-label", "Face down tile " + (t.index + 1));
    }

    function onFlip(t) {
      if (lock || t.flipped || t.matched) return;
      reveal(t);
      if (!first) {
        first = t;
        setCaption([describe(t)]);
        return;
      }
      second = t;
      moves++;
      movesOut.textContent = String(moves);
      lock = true;
      var isMatch = first.pair === second.pair && first.kind !== second.kind;
      var a = first;
      var b = second;
      if (isMatch) {
        setCaption(["Match! " + pairs[a.pair].tag], "is-match");
        timeoutId = setTimeout(function () {
          a.matched = b.matched = true;
          a.el.classList.add("matched");
          b.el.classList.add("matched");
          found++;
          foundOut.textContent = found + " of " + pairs.length;
          if (window.NYC.hearts) {
            var r = b.el.getBoundingClientRect();
            window.NYC.hearts.burst(r.left + r.width / 2, r.top + r.height / 2, 10);
          }
          first = second = null;
          lock = false;
          if (found === pairs.length) win();
        }, 650);
      } else {
        setCaption([describe(a), describe(b), "Not a pair. Try again, you got this."], "is-miss");
        timeoutId = setTimeout(function () {
          hide(a);
          hide(b);
          first = second = null;
          lock = false;
          setCaption(["Pick two more tiles."]);
        }, MISMATCH_MS);
      }
    }

    function showGallery() {
      gallery.hidden = false;
      gallery.innerHTML = "";
      gallery.appendChild(el("h4", "", "Our memories"));
      var list = el("ul", "memory-gallery-list");
      pairs.forEach(function (p) {
        var li = el("li", "memory-gallery-item");
        var img = el("img", "");
        img.src = p.image;
        img.alt = p.alt;
        li.appendChild(img);
        li.appendChild(el("span", "", p.tag));
        list.appendChild(li);
      });
      gallery.appendChild(list);
    }

    function win() {
      var best = readBest();
      var line = "You found all " + pairs.length + " pairs in " + moves + " tries! Happy birthday, " + recipient + ".";
      if (!best || moves < best) {
        writeBest(moves);
        updateBest();
        if (best) line += " New best.";
      }
      setCaption([line], "is-win");
      if (cfg && cfg.onWin) cfg.onWin({ moves: moves });
      var rect = board.getBoundingClientRect();
      if (window.NYC.hearts) window.NYC.hearts.burst(rect.left + rect.width / 2, rect.top + rect.height / 2, 44);
      showGallery();
    }

    function start() {
      if (timeoutId) clearTimeout(timeoutId);
      first = second = null;
      lock = false;
      moves = 0;
      found = 0;
      movesOut.textContent = "0";
      foundOut.textContent = "0 of " + pairs.length;
      gallery.hidden = true;
      var set = [];
      pairs.forEach(function (p, i) {
        set.push({ pair: i, kind: "img" });
        set.push({ pair: i, kind: "tag" });
      });
      tiles = shuffled(set);
      board.innerHTML = "";
      tiles.forEach(function (t, i) {
        t.index = i;
        board.appendChild(buildTile(t, i));
      });
      setCaption(["Flip two tiles. Match each photo with the sentence about where we took it."]);
    }

    newBtn.addEventListener("click", start);
    updateBest();
    start();

    return {
      /* Test hooks. */
      _tiles: function () { return tiles; },
      _flip: onFlip,
      restart: start
    };
  }

  window.NYC.memory = { mount: mount };
})();
