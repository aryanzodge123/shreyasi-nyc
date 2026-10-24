/* Builds the unlocked site: hero, day by day plan, games, packing list and trip info. */
(function () {
  "use strict";
  window.NYC = window.NYC || {};

  var D = window.NYC_DATA;
  var CFG = window.NYC_CONFIG;
  var W = window.NYC.weather;
  var wxTasks = [];
  var toastTimer = null;

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  function add(parent) {
    for (var i = 1; i < arguments.length; i++) if (arguments[i]) parent.appendChild(arguments[i]);
    return parent;
  }

  function link(label, url, cls) {
    var a = el("a", cls || "btn btn-ghost", label);
    a.href = url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    return a;
  }

  function mapsUrl(addr) {
    return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(addr.name + ", " + addr.text);
  }

  /* ---------- Toast and copy ---------- */

  function toast(message) {
    var t = document.getElementById("toast");
    if (!t) return;
    t.textContent = message;
    t.classList.add("show");
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove("show"); }, 2200);
  }

  function copyText(text, btn) {
    function done() {
      toast("Address copied!");
      if (btn) {
        var old = btn.textContent;
        btn.textContent = "Copied";
        setTimeout(function () { btn.textContent = old; }, 1600);
      }
    }
    function fallback() {
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); done(); } catch (e) { toast("Could not copy. Press and hold the address instead."); }
      document.body.removeChild(ta);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, fallback);
    } else {
      fallback();
    }
  }

  /* ---------- Menu dialog ---------- */

  function openMenu(menu) {
    var dlg = document.getElementById("menu-dialog");
    var title = document.getElementById("menu-title");
    var body = document.getElementById("menu-body");
    var foot = document.getElementById("menu-foot");
    title.textContent = menu.title + " menu";
    body.innerHTML = "";
    foot.innerHTML = "";

    if (menu.note) add(body, el("p", "menu-note", menu.note));
    menu.sections.forEach(function (s) {
      var sec = el("section", "menu-section");
      add(sec, el("h4", "", s.title));
      if (s.note) add(sec, el("p", "menu-sec-note", s.note));
      var ul = el("ul", "menu-items");
      s.items.forEach(function (it) {
        var li = el("li", "menu-item");
        var top = el("div", "menu-item-top");
        add(top, el("span", "menu-item-name", it[0]));
        if (it[2]) add(top, el("span", "menu-item-price", it[2]));
        add(li, top);
        if (it[1]) add(li, el("p", "menu-item-desc", it[1]));
        add(ul, li);
      });
      add(sec, ul);
      add(body, sec);
    });

    add(foot, link(menu.full.label, menu.full.url, "btn btn-primary"));
    (menu.extra || []).forEach(function (x) { add(foot, link(x.label, x.url, "btn btn-ghost")); });
    add(foot, el("p", "menu-updated", menu.updated));

    if (typeof dlg.showModal === "function") {
      if (!dlg.open) dlg.showModal();
    } else {
      dlg.setAttribute("open", "");
    }
    body.scrollTop = 0;
  }

  function wireDialog() {
    var dlg = document.getElementById("menu-dialog");
    if (!dlg || dlg.getAttribute("data-wired")) return;
    dlg.setAttribute("data-wired", "1");
    document.getElementById("menu-close").addEventListener("click", function () {
      if (dlg.close) dlg.close(); else dlg.removeAttribute("open");
    });
    dlg.addEventListener("click", function (e) {
      if (e.target === dlg) { if (dlg.close) dlg.close(); else dlg.removeAttribute("open"); }
    });
  }

  /* ---------- Stops ---------- */

  function addressBlock(addr, phone) {
    var box = el("div", "addr");
    var text = el("div", "addr-text");
    add(text, el("p", "addr-name", addr.name));
    add(text, el("p", "addr-line", addr.text));
    if (addr.extra) add(text, el("p", "addr-extra", addr.extra));
    if (phone) {
      var p = el("p", "addr-phone");
      var a = el("a", "", phone);
      a.href = "tel:" + phone.replace(/[^0-9+]/g, "");
      add(p, a);
      add(text, p);
    }
    var actions = el("div", "addr-actions");
    var copy = el("button", "btn btn-small btn-primary", "Copy address");
    copy.type = "button";
    copy.setAttribute("aria-label", "Copy address for " + addr.name);
    copy.addEventListener("click", function () { copyText(addr.name + ", " + addr.text, copy); });
    add(actions, copy, link("Open in Maps", mapsUrl(addr), "btn btn-small btn-ghost"));
    add(box, text, actions);
    return box;
  }

  function wxSlot(day, stop) {
    var list = stop.wx || (stop.time ? [{ city: "nyc", time: stop.time }] : []);
    if (!list.length) return null;
    var slot = el("div", "stop-wx");
    list.forEach(function (w) {
      var ph = el("p", "wx-chip wx-muted", "Loading forecast...");
      add(slot, ph);
      wxTasks.push(function () { ph.replaceWith(W.hourChip(w.city, day.date, w.time, w.label)); });
    });
    return slot;
  }

  function stopItem(day, stop) {
    var li = el("li", "stop kind-" + stop.kind);
    li.id = "stop-" + stop.id;
    var marker = el("span", "marker");
    marker.setAttribute("aria-hidden", "true");
    marker.appendChild(window.NYC.hearts.svg());
    add(li, marker);

    var card = el("article", "stop-card");
    var head = el("header", "stop-head");
    add(head, el("p", "stop-time", stop.timeLabel));
    var h = el("h4", "stop-title");
    var em = el("span", "stop-emoji", stop.emoji);
    em.setAttribute("aria-hidden", "true");
    add(h, em, document.createTextNode(" " + stop.title));
    add(head, h);
    add(card, head);

    add(card, el("p", "stop-blurb", stop.blurb));
    if (stop.pending) add(card, el("p", "stop-pending", stop.pending));
    add(card, wxSlot(day, stop));
    if (stop.address) add(card, addressBlock(stop.address, stop.phone));
    if (stop.travel) add(card, el("p", "stop-travel", "Getting there: " + stop.travel));

    if (stop.notes && stop.notes.length) {
      var det = el("details", "stop-notes");
      add(det, el("summary", "", "What to know"));
      var ul = el("ul", "");
      stop.notes.forEach(function (n) { add(ul, el("li", "", n)); });
      add(det, ul);
      det.open = true;
      add(card, det);
    }

    var actions = el("div", "stop-actions");
    if (stop.menu) {
      var mb = el("button", "btn btn-primary", "View menu");
      mb.type = "button";
      mb.addEventListener("click", function () { openMenu(stop.menu); });
      add(actions, mb);
    }
    (stop.links || []).forEach(function (l) { add(actions, link(l.label, l.url, "btn btn-ghost")); });
    if (actions.childNodes.length) add(card, actions);

    add(li, card);
    return li;
  }

  /* ---------- Days ---------- */

  function todayET() {
    try { return new Date().toLocaleDateString("en-CA", { timeZone: "America/New_York" }); } catch (e) { return ""; }
  }

  function dayPanel(day, index) {
    var panel = el("section", "day-panel");
    panel.id = "day-" + day.id;
    panel.setAttribute("role", "tabpanel");
    panel.setAttribute("aria-labelledby", "tab-" + day.id);
    panel.tabIndex = 0;

    var head = el("header", "day-head");
    add(head, el("p", "day-tag", day.tag));
    add(head, el("h3", "day-title", day.name + ", " + day.label));
    add(head, el("p", "day-intro", day.intro));
    add(panel, head);

    var costume = null;
    if (day.id === "fri") costume = D.costumes[0];
    if (day.id === "sat") costume = D.costumes[1];
    if (costume) {
      var c = el("div", "costume");
      var ce = el("span", "costume-emoji", costume.emoji);
      ce.setAttribute("aria-hidden", "true");
      var ct = el("p", "", "Costume night. You: " + costume.you + ". Me: " + costume.me + ".");
      add(c, ce, ct);
      add(panel, c);
    }

    var wxBox = el("div", "day-wx");
    day.wx.forEach(function (city) {
      var ph = el("p", "day-wx-line wx-muted", "Loading forecast...");
      add(wxBox, ph);
      wxTasks.push(function () { ph.replaceWith(W.daySummary(city, day.date)); });
    });
    add(panel, wxBox);

    var hourBox = el("div", "day-hourly");
    var times = [];
    day.stops.forEach(function (s) { if (s.time) times.push(s.time); });
    wxTasks.push(function () {
      var strip = W.hourlyStrip("nyc", day.date, times);
      if (strip) {
        add(hourBox, el("p", "hourly-label", "Hour by hour in New York. The highlighted hours are when we have plans."));
        add(hourBox, strip);
      }
    });
    add(panel, hourBox);

    var ol = el("ol", "timeline");
    day.stops.forEach(function (s) { add(ol, stopItem(day, s)); });
    add(panel, ol);
    return panel;
  }

  function renderDays(root) {
    var tabs = el("div", "tabs");
    tabs.setAttribute("role", "tablist");
    tabs.setAttribute("aria-label", "Days of the trip");
    var panels = el("div", "panels");
    var today = todayET();
    var selected = 0;
    D.days.forEach(function (d, i) { if (d.date === today) selected = i; });
    var tabEls = [];
    var panelEls = [];

    function select(i, focus) {
      selected = i;
      tabEls.forEach(function (t, n) {
        var on = n === i;
        t.setAttribute("aria-selected", on ? "true" : "false");
        t.tabIndex = on ? 0 : -1;
        panelEls[n].hidden = !on;
      });
      if (focus) tabEls[i].focus();
    }

    D.days.forEach(function (d, i) {
      var t = el("button", "tab");
      t.type = "button";
      t.id = "tab-" + d.id;
      t.setAttribute("role", "tab");
      t.setAttribute("aria-controls", "day-" + d.id);
      add(t, el("span", "tab-day", d.short), el("span", "tab-date", d.label));
      t.addEventListener("click", function () { select(i); });
      t.addEventListener("keydown", function (e) {
        if (e.key === "ArrowRight") { e.preventDefault(); select((i + 1) % D.days.length, true); }
        if (e.key === "ArrowLeft") { e.preventDefault(); select((i + D.days.length - 1) % D.days.length, true); }
      });
      tabEls.push(t);
      add(tabs, t);
      var p = dayPanel(d, i);
      panelEls.push(p);
      add(panels, p);
    });

    add(root, tabs, panels);
    select(selected);
  }

  /* ---------- Games ---------- */

  function renderGames(root) {
    var defs = [
      { id: "likely", label: "Most likely to", how: "Dinner game! Both of us open this page on our own phones. Pick in secret, reveal on three, and see how well we know each other." },
      { id: "quiz", label: "Who knows who better?", how: "Flip the switch to say who is playing. You guess the other person's answers, four choices a question, and get a score at the end." }
    ];
    var tabs = el("div", "tabs tabs-two");
    tabs.setAttribute("role", "tablist");
    tabs.setAttribute("aria-label", "Dinner games");
    var tabEls = [];
    var panelEls = [];
    var panels = el("div", "panels");

    function select(i, focus) {
      tabEls.forEach(function (t, n) {
        var on = n === i;
        t.setAttribute("aria-selected", on ? "true" : "false");
        t.tabIndex = on ? 0 : -1;
        panelEls[n].hidden = !on;
      });
      if (focus) tabEls[i].focus();
    }

    window.NYC.games = window.NYC.games || {};
    defs.forEach(function (d, i) {
      var t = el("button", "tab");
      t.type = "button";
      t.id = "gtab-" + d.id;
      t.setAttribute("role", "tab");
      t.setAttribute("aria-controls", "game-" + d.id);
      add(t, el("span", "tab-day", d.label));
      t.addEventListener("click", function () { select(i); });
      t.addEventListener("keydown", function (e) {
        if (e.key === "ArrowRight" || e.key === "ArrowLeft") { e.preventDefault(); select((i + 1) % defs.length, true); }
      });
      tabEls.push(t);
      add(tabs, t);

      var p = el("div", "game-panel");
      p.id = "game-" + d.id;
      p.setAttribute("role", "tabpanel");
      p.setAttribute("aria-labelledby", "gtab-" + d.id);
      add(p, el("p", "game-how", d.how));
      var mountPoint = el("div", "game-mount");
      add(p, mountPoint);
      panelEls.push(p);
      add(panels, p);
      if (d.id === "likely") window.NYC.games.likely = window.NYC.mostlikely.mount(mountPoint, CFG.mostLikely, { recipient: CFG.recipient });
      else window.NYC.games.quiz = window.NYC.quiz.mount(mountPoint, window.NYC_QUIZ);
    });

    add(root, tabs, panels);
    select(0);
  }

  /* ---------- Packing ---------- */

  var PACK_KEY = "nyc-packing-v1";

  function readPack() {
    try { return JSON.parse(localStorage.getItem(PACK_KEY) || "{}"); } catch (e) { return {}; }
  }
  function writePack(o) {
    try { localStorage.setItem(PACK_KEY, JSON.stringify(o)); } catch (e) { /* storage can be blocked */ }
  }

  function renderPacking(root) {
    var state = readPack();
    var total = 0;
    D.packing.forEach(function (g) { total += g.items.length; });
    var progress = el("p", "pack-progress");

    function refresh() {
      var done = 0;
      Object.keys(state).forEach(function (k) { if (state[k]) done++; });
      progress.textContent = done + " of " + total + " packed";
    }

    var wrap = el("div", "pack-grid");
    D.packing.forEach(function (g, gi) {
      var box = el("fieldset", "pack-group");
      add(box, el("legend", "", g.title));
      g.items.forEach(function (item, ii) {
        var key = gi + "-" + ii;
        var label = el("label", "pack-item");
        var cb = document.createElement("input");
        cb.type = "checkbox";
        cb.checked = !!state[key];
        cb.addEventListener("change", function () {
          state[key] = cb.checked;
          writePack(state);
          refresh();
        });
        add(label, cb, el("span", "", item));
        add(box, label);
      });
      add(wrap, box);
    });
    add(root, progress, wrap);
    refresh();
  }

  /* ---------- Info ---------- */

  function renderInfo(root) {
    var grid = el("div", "info-grid");

    var fl = el("div", "info-card");
    add(fl, el("h3", "", "Flights"));
    D.flights.forEach(function (f) {
      var item = el("div", "info-row");
      add(item, el("p", "info-strong", f.leg), el("p", "", f.airline + ": " + f.route), el("p", "", f.times));
      add(fl, item);
    });
    add(grid, fl);

    var hotel = el("div", "info-card");
    add(hotel, el("h3", "", "Where we are staying"));
    add(hotel, addressBlock(D.hotel));
    add(hotel, el("p", "info-small", "On the edge of Park Slope in Brooklyn, near Prospect Park. Home base for the whole weekend."));
    add(grid, hotel);

    var tips = el("div", "info-card info-wide");
    add(tips, el("h3", "", "Good to know"));
    var ul = el("ul", "tip-list");
    [
      "New York and Charlotte are both on Eastern time, so no jet lag for us.",
      "Clocks go back one hour at 2:00 AM on Sunday, November 1. Bonus hour of sleep before the flight home.",
      "The subway takes a tap from a phone or contactless card at the turnstile (it is called OMNY). No ticket needed.",
      "Forecasts more than a few days out change a lot. The weather on this page refreshes every time you open it.",
      "Menus and prices were checked on October 20, 2026. Places change them, so tap the links for the latest."
    ].forEach(function (t) { add(ul, el("li", "", t)); });
    add(tips, ul);
    add(grid, tips);

    var src = el("div", "info-card info-wide");
    add(src, el("h3", "", "Where I got the details"));
    var sl = el("ul", "source-list");
    D.sources.forEach(function (s) {
      var li = el("li", "");
      add(li, link(s.label, s.url, "text-link"));
      add(sl, li);
    });
    add(src, sl);
    add(grid, src);

    add(root, grid);
  }

  /* ---------- Hero ---------- */

  function renderHero(root) {
    add(root, el("p", "hero-kicker", "October 29 to November 1, 2026"));
    var h = el("h1", "hero-title");
    add(h, document.createTextNode("Happy birthday, " + CFG.recipient));
    add(root, h);
    add(root, el("p", "hero-lede", "Our weekend in New York City, planned stop by stop. Everything is right here: times, addresses, menus, the weather, and games for the dinner table. Let's go!"));
    var nav = el("div", "hero-actions");
    var a1 = el("a", "btn btn-primary", "See the plan");
    a1.href = "#plan";
    var a2 = el("a", "btn btn-ghost", "Play the dinner games");
    a2.href = "#games";
    add(nav, a1, a2);
    add(root, nav);
  }

  /* ---------- Entry ---------- */

  function applyWeather() {
    W.load().then(function () {
      wxTasks.forEach(function (fn) { fn(); });
      var note = document.getElementById("wx-note");
      if (note) {
        note.textContent = W.state.failed
          ? "The forecast could not be loaded. Reopen this page in a bit and it will try again."
          : "Forecast from Open-Meteo, refreshed when you opened this page. Forecasts this far ahead change a lot, so peek again closer to the trip.";
      }
    });
  }

  function render() {
    wireDialog();
    renderHero(document.getElementById("hero-inner"));
    renderDays(document.getElementById("days-root"));
    renderGames(document.getElementById("games-root"));
    renderPacking(document.getElementById("packing-root"));
    renderInfo(document.getElementById("info-root"));
    applyWeather();
  }

  window.NYC.render = render;
})();
