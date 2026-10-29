/*
  The Birthday games part of the front page. It is always open and has no trip details in it.
  Finishing the slide puzzle or the memory match unlocks a gift card that says to come find him.
  Progress is saved on the device. Open the page once with ?resetgifts=1 to clear it.
*/
(function () {
  "use strict";
  window.NYC = window.NYC || {};

  var KEY = "nyc-gifts-v1";
  var toastTimer = null;

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  function add(parent) {
    for (var i = 1; i < arguments.length; i++) parent.appendChild(arguments[i]);
    return parent;
  }

  function read() {
    try {
      var v = JSON.parse(localStorage.getItem(KEY));
      return v && typeof v === "object" ? v : {};
    } catch (e) { return {}; }
  }

  function write(v) {
    try { localStorage.setItem(KEY, JSON.stringify(v)); } catch (e) { /* storage can be blocked */ }
  }

  function toast(message) {
    var t = document.getElementById("toast");
    if (!t) return;
    t.textContent = message;
    t.classList.add("show");
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove("show"); }, 2800);
  }

  function render(root) {
    var CFG = window.NYC_CONFIG;
    var G = CFG.gifts;
    var params = new URLSearchParams(window.location.search);
    if (params.get("resetgifts")) write({});
    var state = read();

    root.innerHTML = "";

    /* Hero */
    var hero = el("header", "hero");
    var heroInner = el("div", "wrap hero-inner");
    add(heroInner, el("p", "hero-kicker", "For the birthday girl"));
    add(heroInner, el("h1", "hero-title", "Birthday games"));
    add(heroInner, el("p", "hero-lede", G.intro));
    add(hero, heroInner);
    add(root, hero);

    /* Gift cards */
    var giftSection = el("section", "section gifts");
    giftSection.id = "gifts";
    var giftWrap = el("div", "wrap");
    var progress = el("p", "gift-progress");
    progress.setAttribute("aria-live", "polite");
    var grid = el("div", "gift-grid");
    var both = el("p", "gift-both");
    both.hidden = true;
    var order = [{ id: "puzzle", n: 1 }, { id: "memory", n: 2 }];
    var cards = {};
    order.forEach(function (g) {
      var card = el("div", "gift-card");
      card.setAttribute("data-gift", g.id);
      var emoji = el("span", "gift-emoji");
      emoji.setAttribute("aria-hidden", "true");
      var body = el("div", "gift-body");
      var title = el("p", "gift-title", "Gift " + g.n + ": " + G[g.id].label);
      var text = el("p", "gift-text");
      add(body, title, text);
      add(card, emoji, body);
      add(grid, card);
      cards[g.id] = { card: card, emoji: emoji, text: text };
    });
    add(giftWrap, progress, grid, both);
    add(giftSection, giftWrap);
    add(root, giftSection);

    function update() {
      var done = 0;
      order.forEach(function (g) {
        var open = !!state[g.id];
        if (open) done++;
        var c = cards[g.id];
        c.card.classList.toggle("is-open", open);
        c.emoji.textContent = open ? "🎁" : "🔒";
        c.text.textContent = open ? G[g.id].unlocked : G[g.id].locked;
      });
      progress.textContent = done + " of " + order.length + " gifts unlocked";
      both.hidden = done < order.length;
      both.textContent = done >= order.length ? G.both : "";
    }

    function unlockGift(id) {
      var first = !state[id];
      state[id] = true;
      write(state);
      update();
      if (first) {
        var all = order.every(function (g) { return state[g.id]; });
        toast(all ? G.both : G[id].unlocked);
      }
    }

    update();

    /* Games */
    var gameSection = el("section", "section section-alt");
    gameSection.id = "gift-games";
    var gameWrap = el("div", "wrap");
    add(gameWrap, el("h2", "section-title", "Play"));
    add(gameWrap, el("p", "section-lede", "Pick a game. Finish it to unlock its gift."));

    var defs = [
      { id: "puzzle", label: G.puzzle.label, how: "Put the pieces back together to see us! Swipe a piece toward the empty space, or just tap it." },
      { id: "memory", label: G.memory.label, how: "Flip two tiles. Match each photo with the sentence about where we took it." }
    ];
    var tabs = el("div", "tabs tabs-two");
    tabs.setAttribute("role", "tablist");
    tabs.setAttribute("aria-label", "Games");
    var panels = el("div", "panels");
    var tabEls = [];
    var panelEls = [];

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

      var onWin = function () { unlockGift(d.id); };
      if (d.id === "puzzle") {
        window.NYC.games.puzzle = window.NYC.puzzle.mount(mountPoint, { image: CFG.puzzle.image, alt: CFG.puzzle.alt, recipient: CFG.recipient, onWin: onWin });
      } else {
        window.NYC.games.memory = window.NYC.memory.mount(mountPoint, CFG.memoryPairs, { recipient: CFG.recipient, onWin: onWin });
      }
    });

    add(gameWrap, tabs, panels);
    add(gameSection, gameWrap);
    add(root, gameSection);
    select(0);

    var footer = el("footer", "footer");
    add(footer, add(el("div", "wrap"), el("p", "", "Made with so much love for your birthday.")));
    add(root, footer);
  }

  window.NYC.gifts = { render: render };
})();
