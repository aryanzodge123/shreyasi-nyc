/*
  Sliding puzzle: one photo cut into a 4x4 grid. 15 pieces and one empty space.
  Swipe a piece toward the empty space, tap a piece in the same row or column as the space,
  or use the arrow keys. Every shuffle starts from the solved board and makes random legal
  moves, so it is always solvable.
*/
(function () {
  "use strict";
  window.NYC = window.NYC || {};

  var N = 4;
  var TOTAL = N * N;
  var SWIPE_MIN = 18;
  var BEST_KEY = "nyc-puzzle-best-v1";

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  function fmtTime(s) {
    var m = Math.floor(s / 60);
    var r = s % 60;
    return m + ":" + (r < 10 ? "0" : "") + r;
  }

  function readBest() {
    try { var v = localStorage.getItem(BEST_KEY); return v ? parseInt(v, 10) : null; } catch (e) { return null; }
  }
  function writeBest(v) {
    try { localStorage.setItem(BEST_KEY, String(v)); } catch (e) { /* storage can be blocked */ }
  }

  function mount(root, cfg) {
    var image = cfg.image;
    var recipient = cfg.recipient || "you";
    var grid = [];            // grid[position] = piece id (1..15) or 0 for the empty space
    var moves = 0;
    var seconds = 0;
    var timerId = null;
    var solved = false;
    var pieces = {};          // id -> element
    var drag = null;

    root.innerHTML = "";
    var wrap = el("div", "puzzle");

    var stats = el("p", "game-stats");
    var movesOut = el("span", "", "0");
    var timeOut = el("span", "", "0:00");
    var bestOut = el("span", "", "none yet");
    stats.appendChild(document.createTextNode("Moves "));
    stats.appendChild(movesOut);
    stats.appendChild(document.createTextNode("  Time "));
    stats.appendChild(timeOut);
    stats.appendChild(document.createTextNode("  Best "));
    stats.appendChild(bestOut);

    var board = el("div", "puzzle-board");
    board.tabIndex = 0;
    board.setAttribute("role", "group");
    board.setAttribute("aria-label", "Sliding puzzle. Swipe or tap a piece next to the empty space, or use the arrow keys.");

    var peek = el("div", "puzzle-peek");
    peek.style.backgroundImage = 'url("' + image + '")';
    peek.setAttribute("role", "img");
    peek.setAttribute("aria-label", cfg.alt || "The finished picture");
    board.appendChild(peek);

    for (var id = 1; id <= TOTAL; id++) {
      var home = id - 1;
      var r = Math.floor(home / N);
      var c = home % N;
      var piece = el("div", "ptile" + (id === TOTAL ? " ptile-last" : ""));
      piece.setAttribute("data-id", String(id));
      var face = el("div", "ptile-face");
      face.style.backgroundImage = 'url("' + image + '")';
      face.style.backgroundSize = N * 100 + "% " + N * 100 + "%";
      face.style.backgroundPosition = (c / (N - 1)) * 100 + "% " + (r / (N - 1)) * 100 + "%";
      piece.appendChild(face);
      board.appendChild(piece);
      pieces[id] = piece;
    }

    var msg = el("p", "game-msg");
    msg.setAttribute("aria-live", "polite");

    var controls = el("div", "game-controls");
    var shuffleBtn = el("button", "btn btn-primary", "Shuffle");
    shuffleBtn.type = "button";
    var peekBtn = el("button", "btn btn-ghost", "Show the picture");
    peekBtn.type = "button";
    peekBtn.setAttribute("aria-pressed", "false");
    controls.appendChild(shuffleBtn);
    controls.appendChild(peekBtn);

    wrap.appendChild(stats);
    wrap.appendChild(board);
    wrap.appendChild(msg);
    wrap.appendChild(controls);
    root.appendChild(wrap);

    function updateBest() {
      var b = readBest();
      bestOut.textContent = b ? b + " moves" : "none yet";
    }

    function layout() {
      for (var p = 0; p < TOTAL; p++) {
        var id = grid[p];
        if (!id) continue;
        var r = Math.floor(p / N);
        var c = p % N;
        pieces[id].style.transform = "translate(" + c * 100 + "%," + r * 100 + "%)";
      }
      // The last piece sits in the empty space, hidden until the puzzle is solved.
      var b = grid.indexOf(0);
      pieces[TOTAL].style.transform = "translate(" + (b % N) * 100 + "%," + Math.floor(b / N) * 100 + "%)";
    }

    function isSolved() {
      for (var i = 0; i < TOTAL - 1; i++) if (grid[i] !== i + 1) return false;
      return grid[TOTAL - 1] === 0;
    }

    function neighbors(pos) {
      var r = Math.floor(pos / N);
      var c = pos % N;
      var out = [];
      if (r > 0) out.push(pos - N);
      if (r < N - 1) out.push(pos + N);
      if (c > 0) out.push(pos - 1);
      if (c < N - 1) out.push(pos + 1);
      return out;
    }

    function startTimer() {
      if (timerId) return;
      timerId = setInterval(function () {
        seconds++;
        timeOut.textContent = fmtTime(seconds);
      }, 1000);
    }

    function stopTimer() {
      if (timerId) clearInterval(timerId);
      timerId = null;
    }

    function shuffle() {
      var tries = 0;
      do {
        grid = [];
        for (var i = 1; i < TOTAL; i++) grid.push(i);
        grid.push(0);
        var last = -1;
        var steps = 160 + Math.floor(Math.random() * 80);
        for (var s = 0; s < steps; s++) {
          var b = grid.indexOf(0);
          var options = neighbors(b).filter(function (p) { return p !== last; });
          var pick = options[Math.floor(Math.random() * options.length)];
          grid[b] = grid[pick];
          grid[pick] = 0;
          last = b;
        }
        tries++;
      } while (isSolved() && tries < 5);

      solved = false;
      moves = 0;
      seconds = 0;
      stopTimer();
      movesOut.textContent = "0";
      timeOut.textContent = "0:00";
      msg.textContent = "Swipe or tap the pieces to put us back together.";
      board.classList.remove("solved");
      pieces[TOTAL].classList.remove("show");
      layout();
    }

    function win() {
      solved = true;
      stopTimer();
      board.classList.add("solved");
      pieces[TOTAL].classList.add("show");
      var best = readBest();
      var line = "You did it in " + moves + " moves and " + fmtTime(seconds) + "! Happy birthday, " + recipient + ".";
      if (!best || moves < best) {
        writeBest(moves);
        updateBest();
        if (best) line += " New best.";
      }
      msg.textContent = line;
      if (cfg.onWin) cfg.onWin({ moves: moves, seconds: seconds });
      var rect = board.getBoundingClientRect();
      if (window.NYC.hearts) window.NYC.hearts.burst(rect.left + rect.width / 2, rect.top + rect.height / 2, 44);
    }

    /* Slide the piece at `pos` toward the empty space, moving everything in between. */
    function slide(pos) {
      if (solved) return false;
      var b = grid.indexOf(0);
      if (pos === b) return false;
      var r = Math.floor(pos / N);
      var c = pos % N;
      var br = Math.floor(b / N);
      var bc = b % N;
      if (r !== br && c !== bc) return false;
      var step = r === br ? (bc > c ? 1 : -1) : (br > r ? N : -N);
      var cur = b;
      while (cur !== pos) {
        grid[cur] = grid[cur - step];
        cur -= step;
      }
      grid[pos] = 0;
      moves++;
      movesOut.textContent = String(moves);
      startTimer();
      layout();
      if (isSolved()) win();
      return true;
    }

    /* Slide only if the empty space lies in the swiped direction. */
    function slideDirection(pos, dir) {
      var b = grid.indexOf(0);
      var r = Math.floor(pos / N);
      var c = pos % N;
      var br = Math.floor(b / N);
      var bc = b % N;
      var ok =
        (dir === "left" && br === r && bc < c) ||
        (dir === "right" && br === r && bc > c) ||
        (dir === "up" && bc === c && br < r) ||
        (dir === "down" && bc === c && br > r);
      return ok ? slide(pos) : false;
    }

    function pieceFromEvent(e) {
      var t = e.target.closest ? e.target.closest(".ptile") : null;
      if (!t || t.classList.contains("ptile-last")) return null;
      var id = parseInt(t.getAttribute("data-id"), 10);
      var pos = grid.indexOf(id);
      return pos < 0 ? null : pos;
    }

    board.addEventListener("pointerdown", function (e) {
      if (solved) return;
      var pos = pieceFromEvent(e);
      if (pos == null) return;
      drag = { pos: pos, x: e.clientX, y: e.clientY, id: e.pointerId };
      try { board.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
    });

    board.addEventListener("pointerup", function (e) {
      if (!drag) return;
      var dx = e.clientX - drag.x;
      var dy = e.clientY - drag.y;
      var pos = drag.pos;
      drag = null;
      if (Math.abs(dx) >= SWIPE_MIN || Math.abs(dy) >= SWIPE_MIN) {
        var dir = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? "right" : "left") : (dy > 0 ? "down" : "up");
        slideDirection(pos, dir);
      } else {
        slide(pos);
      }
    });

    board.addEventListener("pointercancel", function () { drag = null; });

    board.addEventListener("keydown", function (e) {
      var keys = { ArrowLeft: 1, ArrowRight: -1, ArrowUp: N, ArrowDown: -N };
      if (!(e.key in keys)) return;
      e.preventDefault();
      var b = grid.indexOf(0);
      var pos = b + keys[e.key];
      var bc = b % N;
      if (pos < 0 || pos >= TOTAL) return;
      if ((e.key === "ArrowLeft" && bc === N - 1) || (e.key === "ArrowRight" && bc === 0)) return;
      slide(pos);
    });

    shuffleBtn.addEventListener("click", shuffle);

    peekBtn.addEventListener("click", function () {
      var on = !board.classList.contains("peeking");
      board.classList.toggle("peeking", on);
      peekBtn.setAttribute("aria-pressed", on ? "true" : "false");
      peekBtn.textContent = on ? "Hide the picture" : "Show the picture";
    });

    updateBest();
    shuffle();

    return {
      /* Test hooks. */
      _grid: function () { return grid.slice(); },
      _set: function (g) { grid = g.slice(); solved = false; layout(); },
      _slide: slide,
      _isSolved: isSolved,
      shuffle: shuffle
    };
  }

  window.NYC.puzzle = { mount: mount };
})();
