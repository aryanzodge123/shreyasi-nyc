/*
  Who's most likely to: a two player party game for one table, played on two phones.
  Both phones show the same question in the same order. Each person picks in secret, both reveal
  on a count of three, and each phone records whether the picks matched. Nothing is shared between
  phones (the site has no server), so the "matched" tap is how the score is kept.
  Progress is saved on the device, so a refresh does not lose the game.
*/
(function () {
  "use strict";
  window.NYC = window.NYC || {};

  var KEY = "nyc-likely-v1";
  var SAME_LINES = ["Same brain!", "Great minds.", "You really do know each other."];
  var DIFF_LINES = ["Plot twist! Defend your pick.", "Time to argue about it over dinner.", "Interesting. Explain yourself."];

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  function fill(n) {
    var a = [];
    for (var i = 0; i < n; i++) a.push(null);
    return a;
  }

  function load(n) {
    try {
      var s = JSON.parse(localStorage.getItem(KEY));
      if (s && s.n === n && Array.isArray(s.picks) && Array.isArray(s.same) && typeof s.idx === "number") return s;
    } catch (e) { /* storage can be blocked or hold bad data */ }
    return null;
  }

  function save(st) {
    try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) { /* storage can be blocked */ }
  }

  function mount(root, cfg, opts) {
    var names = cfg.names;
    var qs = cfg.questions;
    var N = qs.length;
    var st = load(N) || { n: N, idx: 0, picks: fill(N), same: fill(N) };
    var phase = "choose";          // choose, locked, revealed, feedback
    var feedback = "";
    var finished = st.idx >= N;

    root.innerHTML = "";
    var wrap = el("div", "likely");
    var status = el("p", "sr-only");
    status.setAttribute("aria-live", "polite");
    var head = el("div", "ml-head");
    var card = el("div", "ml-card");
    var controls = el("div", "game-controls ml-controls");
    wrap.appendChild(head);
    wrap.appendChild(card);
    wrap.appendChild(controls);
    wrap.appendChild(status);
    root.appendChild(wrap);

    function questionText(i) {
      return "Who's most likely to " + qs[i] + "?";
    }

    function button(cls, text, handler) {
      var b = el("button", cls, text);
      b.type = "button";
      b.addEventListener("click", handler);
      return b;
    }

    function resetQuestion(i) {
      st.picks[i] = null;
      st.same[i] = null;
    }

    function go(i) {
      if (i < 0) i = 0;
      st.idx = i;
      finished = i >= N;
      if (!finished) resetQuestion(i);
      phase = "choose";
      feedback = "";
      save(st);
      render();
    }

    function renderHead() {
      head.innerHTML = "";
      if (finished) return;
      head.appendChild(el("p", "ml-count", "Question " + (st.idx + 1) + " of " + N));
      var bar = el("div", "ml-bar");
      var fillEl = el("div", "ml-fill");
      fillEl.style.width = (st.idx / N) * 100 + "%";
      bar.appendChild(fillEl);
      head.appendChild(bar);
    }

    function renderChoose() {
      card.appendChild(el("p", "ml-hint", "Pick in secret. Keep your screen to yourself."));
      var row = el("div", "ml-choices");
      names.forEach(function (name, n) {
        var b = button("ml-name", name, function () {
          st.picks[st.idx] = n;
          phase = "locked";
          save(st);
          status.textContent = "Locked in.";
          render();
        });
        b.setAttribute("data-name", name);
        row.appendChild(b);
      });
      card.appendChild(row);
    }

    function renderLocked() {
      card.appendChild(el("p", "ml-locked", "Locked in."));
      card.appendChild(el("p", "ml-hint", "Count down 3, 2, 1 together, then tap Reveal."));
      var row = el("div", "ml-actions");
      row.appendChild(button("btn btn-primary ml-reveal", "Reveal", function () { phase = "revealed"; render(); }));
      row.appendChild(button("btn btn-ghost ml-change", "Change my pick", function () {
        st.picks[st.idx] = null;
        phase = "choose";
        save(st);
        render();
      }));
      card.appendChild(row);
    }

    function renderRevealed() {
      card.appendChild(el("p", "ml-hint", "My pick"));
      card.appendChild(el("p", "ml-picked", names[st.picks[st.idx]]));
      card.appendChild(el("p", "ml-ask", "Did you both pick the same person?"));
      var row = el("div", "ml-actions");
      function mark(same) {
        st.same[st.idx] = same;
        feedback = (same ? SAME_LINES : DIFF_LINES)[st.idx % 3];
        phase = "feedback";
        save(st);
        if (same && window.NYC.hearts) {
          var r = card.getBoundingClientRect();
          window.NYC.hearts.burst(r.left + r.width / 2, r.top + r.height / 2, 16);
        }
        render();
      }
      row.appendChild(button("btn btn-primary ml-same", "Same pick", function () { mark(true); }));
      row.appendChild(button("btn btn-ghost ml-diff", "Different picks", function () { mark(false); }));
      card.appendChild(row);
    }

    function renderFeedback() {
      card.appendChild(el("p", "ml-feedback", feedback));
      var last = st.idx === N - 1;
      card.appendChild(button("btn btn-primary ml-next", last ? "See results" : "Next question", function () { go(st.idx + 1); }));
    }

    function tally() {
      var t = { counts: fill(names.length).map(function () { return 0; }), asked: 0, same: 0, marked: 0 };
      for (var i = 0; i < N; i++) {
        if (st.picks[i] != null) { t.counts[st.picks[i]]++; t.asked++; }
        if (st.same[i] != null) { t.marked++; if (st.same[i]) t.same++; }
      }
      return t;
    }

    function renderResults() {
      var t = tally();
      var pct = t.marked ? t.same / t.marked : 0;
      var line = pct >= 0.9 ? "Same brain. Honestly a little scary." :
        pct >= 0.7 ? "Basically mind readers." :
        pct >= 0.5 ? "Half and half. Perfect balance." : "Opposites attract, clearly.";
      card.appendChild(el("p", "ml-hint", "All done"));
      card.appendChild(el("p", "ml-picked ml-score", t.same + " of " + t.marked + " matched"));
      card.appendChild(el("p", "ml-feedback", line));
      var picks = el("p", "ml-ask", "On this phone: " + names.map(function (n, i) { return n + " " + t.counts[i]; }).join(", ") + ".");
      card.appendChild(picks);

      var diffs = [];
      for (var i = 0; i < N; i++) if (st.same[i] === false) diffs.push(i);
      if (diffs.length) {
        card.appendChild(el("p", "ml-hint", "Where you disagreed (your pick on this phone)"));
        var ul = el("ul", "ml-diff-list");
        diffs.forEach(function (i) {
          ul.appendChild(el("li", "", questionText(i) + " " + (st.picks[i] != null ? names[st.picks[i]] + "." : "")));
        });
        card.appendChild(ul);
      }
      if (window.NYC.hearts) {
        var r = card.getBoundingClientRect();
        window.NYC.hearts.burst(r.left + r.width / 2, r.top + 80, 44);
      }
    }

    function renderControls() {
      controls.innerHTML = "";
      if (!finished) {
        var back = button("btn btn-ghost btn-small ml-back", "Back", function () { go(st.idx - 1); });
        if (st.idx === 0) back.disabled = true;
        controls.appendChild(back);

        var label = el("label", "ml-jump");
        label.appendChild(el("span", "", "Jump to"));
        var sel = el("select", "ml-select");
        sel.setAttribute("aria-label", "Jump to question");
        for (var i = 0; i < N; i++) {
          var o = el("option", "", String(i + 1));
          o.value = String(i);
          if (i === st.idx) o.selected = true;
          sel.appendChild(o);
        }
        sel.addEventListener("change", function () { go(parseInt(sel.value, 10)); });
        label.appendChild(sel);
        controls.appendChild(label);
      }
      controls.appendChild(button("btn btn-ghost btn-small ml-restart", finished ? "Play again" : "Restart", function () {
        st = { n: N, idx: 0, picks: fill(N), same: fill(N) };
        finished = false;
        phase = "choose";
        save(st);
        render();
      }));
    }

    function render() {
      renderHead();
      card.innerHTML = "";
      card.className = "ml-card" + (finished ? " ml-card-done" : "");
      if (finished) {
        renderResults();
      } else {
        card.appendChild(el("p", "ml-kicker", "Question " + (st.idx + 1)));
        card.appendChild(el("h3", "ml-question", questionText(st.idx)));
        if (phase === "choose") renderChoose();
        else if (phase === "locked") renderLocked();
        else if (phase === "revealed") renderRevealed();
        else renderFeedback();
      }
      renderControls();
    }

    // A refreshed page resumes at the first question without a pick, never mid reveal.
    if (!finished) resetQuestion(st.idx);
    render();

    return {
      _state: function () { return JSON.parse(JSON.stringify(st)); },
      _go: go,
      count: N
    };
  }

  window.NYC.mostlikely = { mount: mount };
})();
