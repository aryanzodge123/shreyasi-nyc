/*
  Who knows who better? A multiple choice quiz. A switch picks who is playing. If Aryan plays, every
  question is about Shreyasi and the right answer is the one Shreyasi gave (and the other way around).
  Each question shows the real answer and three decoys in a random order. The score is out of the
  questions that are complete in js/quiz-data.js.
*/
(function () {
  "use strict";
  window.NYC = window.NYC || {};

  var RIGHT_LINES = ["Correct! You really know them.", "Yes! Nailed it.", "Right again!"];
  var WRONG_LINES = ["Not quite. The answer was:", "So close. It was:", "Plot twist! The answer was:"];
  var SAYINGS = [
    [95, "Soulmate level. You two basically share one brain."],
    [80, "Certified expert on your person. Gold star!"],
    [60, "So close! A few more late night talks and you will ace it."],
    [40, "Not bad! Lucky you have a whole weekend to learn more."],
    [0, "Plot twist: you need a lot more date nights. Good thing there is a trip."]
  ];

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  function shuffled(list) {
    var a = list.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function sayingFor(pct) {
    for (var i = 0; i < SAYINGS.length; i++) if (pct >= SAYINGS[i][0]) return SAYINGS[i][1];
    return SAYINGS[SAYINGS.length - 1][1];
  }

  function complete(q, names) {
    if (!q || typeof q.q !== "string" || !q.answers || !q.decoys) return false;
    return names.every(function (n) {
      return typeof q.answers[n] === "string" && q.answers[n] && Array.isArray(q.decoys[n]) && q.decoys[n].length >= 3;
    });
  }

  function mount(root, data) {
    var names = data.names;
    var qs = data.questions.filter(function (q) { return complete(q, names); });
    var skipped = data.questions.length - qs.length;
    if (skipped && window.console) console.warn("Quiz: " + skipped + " incomplete question(s) skipped.");
    var N = qs.length;

    var player = 0;
    var idx = 0;
    var score = 0;
    var missed = [];
    var options = [];
    var answered = false;
    var finished = false;

    root.innerHTML = "";
    var wrap = el("div", "quiz");
    var status = el("p", "sr-only");
    status.setAttribute("aria-live", "polite");

    /* Who is playing: a sliding two way switch */
    var who = el("fieldset", "qz-who");
    who.appendChild(el("legend", "qz-legend", "Who is playing?"));
    var track = el("div", "qz-switch");
    track.setAttribute("data-pos", "0");
    track.appendChild(el("span", "qz-thumb"));
    names.forEach(function (n, i) {
      var label = el("label", "qz-side");
      var input = el("input");
      input.type = "radio";
      input.name = "qz-player";
      input.value = String(i);
      input.checked = i === 0;
      input.addEventListener("change", function () {
        player = i;
        track.setAttribute("data-pos", String(i));
        restart();
      });
      label.appendChild(input);
      label.appendChild(el("span", "qz-side-name", n));
      track.appendChild(label);
    });
    who.appendChild(track);
    var whoNote = el("p", "qz-who-note");
    who.appendChild(whoNote);

    var head = el("div", "ml-head");
    var card = el("div", "ml-card qz-card");
    var controls = el("div", "game-controls");

    wrap.appendChild(who);
    wrap.appendChild(head);
    wrap.appendChild(card);
    wrap.appendChild(controls);
    wrap.appendChild(status);
    root.appendChild(wrap);

    function target() { return names[1 - player]; }
    function playerName() { return names[player]; }

    function questionText(q) {
      return q.q.replace(/\{name\}/g, target()).replace(/\{other\}/g, playerName());
    }

    function restart() {
      idx = 0;
      score = 0;
      missed = [];
      finished = false;
      answered = false;
      render();
    }

    function renderQuestion() {
      var q = qs[idx];
      var correct = q.answers[target()];
      options = shuffled([correct].concat(q.decoys[target()].slice(0, 3)));
      card.appendChild(el("p", "ml-kicker", "Question " + (idx + 1)));
      card.appendChild(el("h3", "ml-question", questionText(q)));
      var list = el("div", "qz-options");
      options.forEach(function (text) {
        var b = el("button", "qz-option", text);
        b.type = "button";
        b.addEventListener("click", function () { choose(b, text, correct, q); });
        list.appendChild(b);
      });
      card.appendChild(list);
      var fb = el("div", "qz-feedback");
      fb.hidden = true;
      card.appendChild(fb);
    }

    function choose(button, text, correct, q) {
      if (answered) return;
      answered = true;
      var right = text === correct;
      var buttons = card.querySelectorAll(".qz-option");
      Array.prototype.forEach.call(buttons, function (b) {
        b.disabled = true;
        if (b.textContent === correct) b.classList.add("is-right");
      });
      if (!right) button.classList.add("is-wrong");
      if (right) score++;
      else missed.push({ q: questionText(q), correct: correct, pick: text });

      var fb = card.querySelector(".qz-feedback");
      fb.hidden = false;
      fb.innerHTML = "";
      if (right) {
        fb.appendChild(el("p", "qz-verdict is-right", RIGHT_LINES[idx % 3]));
      } else {
        fb.appendChild(el("p", "qz-verdict is-wrong", WRONG_LINES[idx % 3]));
        fb.appendChild(el("p", "qz-correct", correct));
      }
      var last = idx === N - 1;
      var next = el("button", "btn btn-primary qz-next", last ? "See my score" : "Next question");
      next.type = "button";
      next.addEventListener("click", function () {
        answered = false;
        idx++;
        if (idx >= N) finished = true;
        render();
        var r = wrap.getBoundingClientRect();
        if (r.top < 0) wrap.scrollIntoView({ block: "start" });
      });
      fb.appendChild(next);
      status.textContent = right ? "Correct." : "Not quite. The answer was " + correct + ".";
      if (right && window.NYC.hearts) {
        var rect = button.getBoundingClientRect();
        window.NYC.hearts.burst(rect.left + rect.width / 2, rect.top + rect.height / 2, 10);
      }
    }

    function renderResults() {
      var pct = N ? Math.round((score / N) * 100) : 0;
      card.appendChild(el("p", "ml-hint", "All done"));
      card.appendChild(el("p", "ml-picked ml-score qz-pct", pct + "%"));
      card.appendChild(el("p", "ml-ask qz-count", score + " of " + N + " correct"));
      card.appendChild(el("p", "ml-feedback qz-saying", sayingFor(pct)));
      if (missed.length) {
        card.appendChild(el("p", "ml-hint", "The ones that got away"));
        var ul = el("ul", "qz-missed");
        missed.forEach(function (m) {
          var li = el("li", "");
          li.appendChild(el("span", "qz-missed-q", m.q));
          li.appendChild(el("span", "qz-missed-a", "Answer: " + m.correct));
          ul.appendChild(li);
        });
        card.appendChild(ul);
      }
      if (window.NYC.hearts) {
        var r = card.getBoundingClientRect();
        window.NYC.hearts.burst(r.left + r.width / 2, r.top + 80, pct >= 60 ? 50 : 24);
      }
    }

    function renderHead() {
      head.innerHTML = "";
      if (finished || !N) return;
      head.appendChild(el("p", "ml-count", "Question " + (idx + 1) + " of " + N));
      var bar = el("div", "ml-bar");
      var fill = el("div", "ml-fill");
      fill.style.width = (idx / N) * 100 + "%";
      bar.appendChild(fill);
      head.appendChild(bar);
    }

    function render() {
      whoNote.textContent = playerName() + " is playing. Guess " + target() + "'s answers.";
      renderHead();
      card.innerHTML = "";
      card.className = "ml-card qz-card" + (finished ? " ml-card-done" : "");
      if (!N) card.appendChild(el("p", "ml-hint", "The quiz questions are not ready yet."));
      else if (finished) renderResults();
      else renderQuestion();
      controls.innerHTML = "";
      var again = el("button", "btn btn-ghost btn-small qz-restart", finished ? "Play again" : "Restart");
      again.type = "button";
      again.addEventListener("click", restart);
      controls.appendChild(again);
    }

    render();

    return {
      _state: function () { return { player: playerName(), target: target(), idx: idx, score: score, total: N, finished: finished }; },
      total: N
    };
  }

  window.NYC.quiz = { mount: mount };
})();
