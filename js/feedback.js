/*
  The answers form. Shreyasi answers each question with one short answer, then makes a .txt file and
  emails it to Aryan. A web page cannot send email by itself, so this builds three things:
    1. a .txt file (downloaded to the phone),
    2. an Email button that opens her mail app with Aryan's address and the answers already in the body,
    3. a Share button (on phones that support sharing files) that can attach the .txt file directly.
  Answers save on the device as she types. To remove the form, set feedbackForm.enabled to false in js/config.js.
*/
(function () {
  "use strict";
  window.NYC = window.NYC || {};

  var KEY = "nyc-feedback-v1";
  var MAX_LEN = 140;
  var toastTimer = null;

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  function toast(message) {
    var t = document.getElementById("toast");
    if (!t) return;
    t.textContent = message;
    t.classList.add("show");
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove("show"); }, 2400);
  }

  function copyText(text, done) {
    function fallback() {
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); done(true); } catch (e) { done(false); }
      document.body.removeChild(ta);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { done(true); }, fallback);
    } else {
      fallback();
    }
  }

  function readDraft(n) {
    try {
      var v = JSON.parse(localStorage.getItem(KEY));
      if (v && Array.isArray(v.answers)) {
        var out = [];
        for (var i = 0; i < n; i++) out.push(typeof v.answers[i] === "string" ? v.answers[i].slice(0, MAX_LEN) : "");
        return out;
      }
    } catch (e) { /* storage can be blocked or hold bad data */ }
    var blank = [];
    for (var j = 0; j < n; j++) blank.push("");
    return blank;
  }

  function writeDraft(answers) {
    try { localStorage.setItem(KEY, JSON.stringify({ answers: answers })); } catch (e) { /* storage can be blocked */ }
  }

  function pad(n) { return n < 10 ? "0" + n : String(n); }

  function stamp() {
    var d = new Date();
    return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()) + " " + pad(d.getHours()) + ":" + pad(d.getMinutes());
  }

  function mount(root, cfg, opts) {
    var questions = cfg.questions;
    var N = questions.length;
    var name = (opts && opts.name) || "Shreyasi";
    var answers = readDraft(N);
    var fileName = name.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-answers.txt";
    var lastFile = null;

    root.innerHTML = "";
    var wrap = el("div", "feedback");
    wrap.appendChild(el("p", "fb-intro", cfg.intro));

    var topRow = el("div", "game-controls fb-top");
    var copyQ = el("button", "btn btn-ghost fb-copy-questions", "Copy all questions");
    copyQ.type = "button";
    topRow.appendChild(copyQ);
    wrap.appendChild(topRow);

    var progress = el("p", "fb-progress");
    progress.setAttribute("aria-live", "polite");
    wrap.appendChild(progress);

    var list = el("ol", "fb-list");
    var inputs = [];
    questions.forEach(function (q, i) {
      var li = el("li", "fb-item");
      var label = el("label", "fb-label");
      label.htmlFor = "fb-q-" + (i + 1);
      label.appendChild(el("span", "fb-n", String(i + 1)));
      label.appendChild(el("span", "fb-q", q));
      var input = el("input", "fb-input");
      input.type = "text";
      input.id = "fb-q-" + (i + 1);
      input.maxLength = MAX_LEN;
      input.autocomplete = "off";
      input.setAttribute("enterkeyhint", i === N - 1 ? "done" : "next");
      input.placeholder = "One short answer";
      input.value = answers[i];
      input.addEventListener("input", function () {
        answers[i] = input.value;
        writeDraft(answers);
        update();
      });
      input.addEventListener("keydown", function (e) {
        if (e.key === "Enter" && i < N - 1) { e.preventDefault(); inputs[i + 1].focus(); }
      });
      inputs.push(input);
      li.appendChild(label);
      li.appendChild(input);
      list.appendChild(li);
    });
    wrap.appendChild(list);

    var finish = el("div", "fb-finish");
    var makeBtn = el("button", "btn btn-primary fb-make", "Make my .txt file");
    makeBtn.type = "button";
    var hint = el("p", "fb-hint");
    finish.appendChild(makeBtn);
    finish.appendChild(hint);
    wrap.appendChild(finish);

    var result = el("div", "fb-result");
    result.hidden = true;
    wrap.appendChild(result);
    root.appendChild(wrap);

    function answeredCount() {
      return answers.filter(function (a) { return a.trim().length > 0; }).length;
    }

    function update() {
      var done = answeredCount();
      progress.textContent = done + " of " + N + " answered";
      var ready = done === N;
      makeBtn.disabled = !ready;
      hint.textContent = ready ? "All answered. Make the file, then send it to Aryan." : "Answer all " + N + " questions to make the file (" + (N - done) + " to go).";
    }

    function questionsText() {
      return "Questions from Aryan\n\n" + questions.map(function (q, i) { return (i + 1) + ". " + q; }).join("\n") + "\n";
    }

    function fileText() {
      var lines = [
        "Who knows who better? Answers from " + name,
        "Made: " + stamp() + " (local time)",
        "Questions: " + N,
        ""
      ];
      questions.forEach(function (q, i) {
        lines.push((i + 1) + ". " + q);
        lines.push("Answer: " + answers[i].trim());
        lines.push("");
      });
      return lines.join("\n");
    }

    function emailBody() {
      var lines = [name + "'s answers (the full .txt file is " + fileName + "):", ""];
      answers.forEach(function (a, i) { lines.push((i + 1) + ". " + a.trim()); });
      return lines.join("\n");
    }

    function download(text) {
      var blob = new Blob([text], { type: "text/plain;charset=utf-8" });
      var url = URL.createObjectURL(blob);
      var a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(function () { URL.revokeObjectURL(url); }, 4000);
      return blob;
    }

    function showResult(text) {
      result.hidden = false;
      result.innerHTML = "";
      result.appendChild(el("p", "fb-done", "Your file is ready: " + fileName));
      result.appendChild(el("p", "fb-note", "It should be in your downloads. This page cannot send email by itself, so tap Email to open your mail app with Aryan's address and your answers filled in. If your mail app lets you, attach the .txt file too."));

      var row = el("div", "game-controls fb-actions");
      var mail = el("a", "btn btn-primary fb-email", "Email it to Aryan");
      mail.href = "mailto:" + cfg.email + "?subject=" + encodeURIComponent(name + "'s answers for the game") + "&body=" + encodeURIComponent(emailBody());
      row.appendChild(mail);

      var again = el("button", "btn btn-ghost fb-download", "Download again");
      again.type = "button";
      again.addEventListener("click", function () { download(text); });
      row.appendChild(again);

      var copyA = el("button", "btn btn-ghost fb-copy-answers", "Copy my answers");
      copyA.type = "button";
      copyA.addEventListener("click", function () {
        copyText(text, function (ok) { toast(ok ? "Answers copied!" : "Could not copy. Use Download instead."); });
      });
      row.appendChild(copyA);

      try {
        var probe = new File([text], fileName, { type: "text/plain" });
        if (navigator.canShare && navigator.canShare({ files: [probe] })) {
          var share = el("button", "btn btn-ghost fb-share", "Share the file");
          share.type = "button";
          share.addEventListener("click", function () {
            navigator.share({ files: [probe], title: name + "'s answers" }).catch(function () { /* closed the share sheet */ });
          });
          row.appendChild(share);
        }
      } catch (e) { /* File constructor not available */ }

      result.appendChild(row);
      result.appendChild(el("p", "fb-note", "Aryan's email: " + cfg.email));
      result.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }

    copyQ.addEventListener("click", function () {
      copyText(questionsText(), function (ok) { toast(ok ? "Questions copied!" : "Could not copy the questions."); });
    });

    makeBtn.addEventListener("click", function () {
      if (answeredCount() !== N) return;
      var text = fileText();
      lastFile = text;
      download(text);
      showResult(text);
    });

    update();

    return { _answers: function () { return answers.slice(); }, _file: function () { return lastFile; }, count: N };
  }

  window.NYC.feedback = { mount: mount };
})();
