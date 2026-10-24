/*
  Weather from Open-Meteo (free, no key). Daily and hourly forecasts for New York and Charlotte.
  Forecasts nine days out shift a lot, so the page says so and refreshes on every visit.
*/
(function () {
  "use strict";
  window.NYC = window.NYC || {};

  var CITIES = {
    nyc: { name: "New York", lat: 40.7128, lon: -74.006 },
    clt: { name: "Charlotte", lat: 35.2271, lon: -80.8431 }
  };

  var WMO = {
    0: ["☀️", "Clear"], 1: ["🌤️", "Mostly clear"], 2: ["⛅", "Partly cloudy"], 3: ["☁️", "Overcast"],
    45: ["🌫️", "Fog"], 48: ["🌫️", "Fog"],
    51: ["🌦️", "Light drizzle"], 53: ["🌦️", "Drizzle"], 55: ["🌧️", "Heavy drizzle"],
    56: ["🌧️", "Freezing drizzle"], 57: ["🌧️", "Freezing drizzle"],
    61: ["🌦️", "Light rain"], 63: ["🌧️", "Rain"], 65: ["🌧️", "Heavy rain"],
    66: ["🌧️", "Freezing rain"], 67: ["🌧️", "Freezing rain"],
    71: ["🌨️", "Light snow"], 73: ["🌨️", "Snow"], 75: ["❄️", "Heavy snow"], 77: ["🌨️", "Snow grains"],
    80: ["🌦️", "Light showers"], 81: ["🌧️", "Showers"], 82: ["⛈️", "Heavy showers"],
    85: ["🌨️", "Snow showers"], 86: ["🌨️", "Heavy snow showers"],
    95: ["⛈️", "Thunderstorms"], 96: ["⛈️", "Thunderstorms"], 99: ["⛈️", "Thunderstorms"]
  };

  var store = { nyc: null, clt: null, loaded: false, failed: false };

  function describe(code) {
    return WMO[code] || ["🌡️", "Forecast"];
  }

  function url(c) {
    return "https://api.open-meteo.com/v1/forecast?latitude=" + c.lat + "&longitude=" + c.lon +
      "&hourly=temperature_2m,precipitation_probability,weather_code" +
      "&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max" +
      "&temperature_unit=fahrenheit&timezone=America%2FNew_York&past_days=7&forecast_days=16";
  }

  function normalize(j) {
    var out = { hourly: {}, daily: {} };
    var h = j.hourly || {};
    (h.time || []).forEach(function (t, i) {
      out.hourly[t] = { temp: h.temperature_2m[i], pop: h.precipitation_probability[i], code: h.weather_code[i] };
    });
    var d = j.daily || {};
    (d.time || []).forEach(function (t, i) {
      out.daily[t] = { hi: d.temperature_2m_max[i], lo: d.temperature_2m_min[i], pop: d.precipitation_probability_max[i], code: d.weather_code[i] };
    });
    return out;
  }

  function fetchCity(key) {
    return fetch(url(CITIES[key])).then(function (r) {
      if (!r.ok) throw new Error("Weather request failed: " + r.status);
      return r.json();
    }).then(normalize);
  }

  function load() {
    return Promise.all([fetchCity("nyc"), fetchCity("clt")]).then(function (res) {
      store.nyc = res[0];
      store.clt = res[1];
      store.loaded = true;
      return store;
    }).catch(function (err) {
      store.failed = true;
      if (window.console) console.warn(err);
      return store;
    });
  }

  /* Round a time like "18:45" to the nearest forecast hour. */
  function hourKey(date, hhmm) {
    var p = hhmm.split(":");
    var h = parseInt(p[0], 10);
    if (parseInt(p[1], 10) >= 30) h += 1;
    if (h > 23) h = 23;
    return date + "T" + (h < 10 ? "0" : "") + h + ":00";
  }

  function getHour(city, date, hhmm) {
    var c = store[city];
    return c ? c.hourly[hourKey(date, hhmm)] || null : null;
  }

  function getDay(city, date) {
    var c = store[city];
    return c ? c.daily[date] || null : null;
  }

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  function pct(n) {
    return n == null ? "n/a" : Math.round(n) + "%";
  }

  /* One line for a single hour, for a stop card. */
  function hourChip(city, date, hhmm, label) {
    var chip = el("p", "wx-chip");
    var h = getHour(city, date, hhmm);
    if (!h) {
      chip.textContent = store.failed ? "Forecast unavailable right now. Try again in a bit." : "Forecast for this hour shows up closer to the day.";
      chip.className += " wx-muted";
      return chip;
    }
    var d = describe(h.code);
    chip.appendChild(el("span", "wx-icon", d[0]));
    chip.appendChild(el("span", "", (label ? label + ": " : "") + Math.round(h.temp) + "°F, " + d[1] + ", " + pct(h.pop) + " chance of rain"));
    chip.setAttribute("aria-label", (label || "Forecast") + ": " + Math.round(h.temp) + " degrees, " + d[1] + ", " + pct(h.pop) + " chance of rain");
    return chip;
  }

  /* Daily summary line for a day header. */
  function daySummary(city, date) {
    var box = el("p", "day-wx-line");
    var d = getDay(city, date);
    var name = CITIES[city].name;
    if (!d) {
      box.textContent = name + ": " + (store.failed ? "forecast unavailable right now." : "forecast not available yet.");
      box.className += " wx-muted";
      return box;
    }
    var info = describe(d.code);
    box.appendChild(el("span", "wx-icon", info[0]));
    box.appendChild(el("span", "", name + ": " + Math.round(d.hi) + "° / " + Math.round(d.lo) + "°F, " + info[1] + ", " + pct(d.pop) + " chance of rain"));
    return box;
  }

  /* Scrollable hour by hour strip, 8 AM to 11 PM. */
  function hourlyStrip(city, date, highlightTimes) {
    var wrap = el("div", "hourly");
    var list = el("ul", "hourly-list");
    var any = false;
    var marks = {};
    (highlightTimes || []).forEach(function (t) { marks[hourKey(date, t).slice(11, 13)] = true; });
    for (var h = 8; h <= 23; h++) {
      var hh = (h < 10 ? "0" : "") + h;
      var data = getHour(city, date, hh + ":00");
      if (!data) continue;
      any = true;
      var info = describe(data.code);
      var li = el("li", "hour" + (marks[hh] ? " hour-marked" : ""));
      var label = (h % 12 === 0 ? 12 : h % 12) + (h < 12 ? " AM" : " PM");
      li.appendChild(el("span", "hour-time", label));
      li.appendChild(el("span", "hour-icon", info[0]));
      li.appendChild(el("span", "hour-temp", Math.round(data.temp) + "°"));
      li.appendChild(el("span", "hour-pop", pct(data.pop)));
      li.setAttribute("title", info[1]);
      list.appendChild(li);
    }
    if (!any) return null;
    wrap.appendChild(list);
    return wrap;
  }

  window.NYC.weather = {
    load: load,
    hourChip: hourChip,
    daySummary: daySummary,
    hourlyStrip: hourlyStrip,
    state: store
  };
})();
