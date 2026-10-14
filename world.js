/* GIRLORA World — interactions. Classic script, state in localStorage. Needs characters.js + layout.js first. */
(function () {
  var G = window.GIRLORA, chars = G.characters;
  var $ = function (id) { return document.getElementById(id); };
  var world = document.querySelector(".world");

  var store = {
    get: function (k, d) { try { var v = localStorage.getItem("girlora_" + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem("girlora_" + k, JSON.stringify(v)); } catch (e) {} }
  };
  function toast(msg) {
    var t = document.createElement("div"); t.className = "toast"; t.textContent = msg;
    document.body.appendChild(t); setTimeout(function () { t.remove(); }, 1800);
  }

  /* ---------- XP / level ---------- */
  var state = store.get("world", { xp: 0, rooms: 0, games: 0, journal: 0, moods: 0 });
  var titles = ["Fresh Start", "Soft Beginnings", "Rising Muse", "Main Character Era", "Icon in Bloom", "Girlora Legend"];
  var badges = [["🌱", "First habit", "rooms", 1], ["🎮", "Player", "games", 1], ["💌", "Letter writer", "journal", 1], ["🌸", "Mood tracker", "moods", 1], ["🔥", "Level 3", "lvl", 3]];
  function level() { return Math.floor(state.xp / 100) + 1; }
  function addXp(n, key) {
    state.xp += n; if (key) state[key] = (state[key] || 0) + 1;
    store.set("world", state); renderLevel(); toast("+" + n + " XP ✨");
  }
  function renderLevel() {
    var l = level();
    $("lvl").textContent = (l < 10 ? "0" : "") + l;
    $("lvl-title").textContent = titles[Math.min(l - 1, titles.length - 1)];
    $("badges").innerHTML = badges.map(function (b) {
      var v = b[2] === "lvl" ? l : state[b[2]];
      return '<span class="badge-chip' + (v >= b[3] ? " on" : "") + '">' + b[0] + " " + b[1] + "</span>";
    }).join("");
    var pct = function (n) { return Math.min(100, n); };
    var stats = [
      ["Daily XP progress", state.xp % 100],
      ["Habits", pct(state.rooms * 10)],
      ["Play", pct(state.games * 12)],
      ["Reflection", pct(state.journal * 20 + state.moods * 5)]
    ];
    $("stat-bars").innerHTML = stats.map(function (s) {
      return '<div class="stat-row"><div><span>' + s[0] + "</span><span>" + s[1] + '%</span></div><div class="bar"><i style="width:' + s[1] + '%"></i></div></div>';
    }).join("");
  }

  /* ---------- heroine selection ---------- */
  var quotes = {
    "soft-power": "Good morning, dreamer! Take it slow, softness is a strategy.",
    "clean-minimalist": "Fresh air, clear desk, one good thing at a time.",
    "literary-muse": "Rain on the window and a new chapter waiting for you.",
    "quiet-luxury": "Quality over noise. Begin the day unhurried.",
    "coquette-romantic": "Tie a ribbon, text someone sweet, make today pretty.",
    "street-sophisticate": "Espresso, playlist, city is yours. Go."
  };
  var current = store.get("hero", null) || G.load() || chars[0].slug;
  if (!G.find(current)) current = chars[0].slug;

  function img(c, cls) { return '<img src="' + c.image + '" alt="' + c.name + '" onerror="this.style.display=\'none\'">'; }

  function renderGrid() {
    $("hero-grid").innerHTML = "";
    chars.forEach(function (c, i) {
      var b = document.createElement("button");
      b.type = "button"; b.className = "hero-tile" + (c.slug === current ? " active" : "");
      b.style.setProperty("--accent", c.palette[0]);
      b.innerHTML = '<div class="ht-img" style="background:linear-gradient(160deg,' + c.palette[2] + "," + c.palette[3] + ')">' + img(c) + "<span>" + c.emoji + "</span></div>" +
        '<div class="ht-body"><span class="ht-name">' + c.name + '</span><span class="ht-tag">' + c.tagline + "</span>" +
        '<div class="ht-energy"><i style="width:' + (70 + (i * 7) % 28) + '%"></i></div>' +
        '<span class="ht-btn">' + (c.slug === current ? "Currently selected" : "Switch to " + c.name.replace("The ", "").split(" ")[0]) + "</span></div>";
      b.addEventListener("click", function () { choose(c.slug); });
      $("hero-grid").appendChild(b);
    });
  }

  var look = { Hair: null, Outfit: null, Shoes: null, Accessory: null, Bag: null };
  function choose(slug, silent) {
    current = slug; store.set("hero", slug);
    var c = G.find(slug);
    world.style.setProperty("--accent", c.palette[0]);
    $("hero-brand").textContent = c.name.replace("The ", "").split(" ")[0];
    $("hero-quote").textContent = "“" + quotes[slug] + "”";
    $("hero-name").textContent = c.name + " " + c.emoji;
    $("hero-tag").textContent = c.tagline;
    $("hero-profile").href = "profile.html?c=" + slug;
    $("hero-emoji").textContent = c.emoji; $("studio-emoji").textContent = c.emoji;
    ["hero-img", "studio-img"].forEach(function (id) { var im = $(id); im.style.display = ""; im.src = c.image; im.alt = c.name; });
    document.querySelectorAll(".hero-photo,.studio-preview").forEach(function (el) { el.style.background = "linear-gradient(160deg," + c.palette[2] + "," + c.palette[3] + ")"; });
    $("room-name").textContent = c.name.replace("The ", "").split(" ")[0] + "'s";
    renderGrid(); renderSwatches();
    if (!silent) toast("Switched to " + c.name);
  }

  /* ---------- room ---------- */
  var tip = $("room-tip");
  document.querySelectorAll(".hotspot").forEach(function (h) {
    h.addEventListener("click", function () {
      if (h.classList.contains("done")) { tip.textContent = "Already done today ✓"; return; }
      h.classList.add("done");
      tip.textContent = h.dataset.title + " ✓ +" + h.dataset.xp + " XP";
      addXp(parseInt(h.dataset.xp, 10), "rooms");
    });
  });

  /* ---------- dress-up ---------- */
  var items = {
    Hair: [["🎀", "Ribbon", "Sweet"], ["🌸", "Flower clip", "Soft"], ["💫", "Waves", "Dreamy"]],
    Outfit: [["🧥", "Camel coat", "Quiet"], ["👗", "Slip dress", "Romantic"], ["🧶", "Cardigan", "Cosy"]],
    Shoes: [["🩰", "Ballet flats", "Classic"], ["👟", "White sneakers", "City"], ["👢", "Leather boots", "Bold"]],
    Accessory: [["📿", "Pearls", "Elegant"], ["🕶️", "Sunglasses", "Cool"], ["💍", "Gold ring", "Shiny"]],
    Bag: [["👜", "Structured bag", "Chic"], ["🛍️", "Tote", "Everyday"], ["🎒", "Mini backpack", "Playful"]]
  };
  var tab = "Hair";
  function renderTabs() {
    $("studio-tabs").innerHTML = "";
    Object.keys(items).forEach(function (k) {
      var b = document.createElement("button"); b.type = "button"; b.className = "tab" + (k === tab ? " active" : ""); b.textContent = k;
      b.addEventListener("click", function () { tab = k; renderTabs(); renderItems(); });
      $("studio-tabs").appendChild(b);
    });
  }
  function renderItems() {
    $("item-grid").innerHTML = "";
    items[tab].forEach(function (it) {
      var b = document.createElement("button"); b.type = "button"; b.className = "item" + (look[tab] === it[1] ? " on" : "");
      b.innerHTML = '<span class="i-emoji">' + it[0] + "</span><b>" + it[1] + "</b><small>" + it[2] + "</small>";
      b.addEventListener("click", function () { look[tab] = look[tab] === it[1] ? null : it[1]; renderItems(); renderLook(); });
      $("item-grid").appendChild(b);
    });
  }
  function renderLook() {
    var out = [];
    Object.keys(look).forEach(function (k) {
      if (!look[k]) return;
      var e = items[k].filter(function (x) { return x[1] === look[k]; })[0];
      out.push("<span>" + e[0] + " " + e[1] + "</span>");
    });
    $("equipped").innerHTML = out.join("");
  }
  function renderSwatches() {
    var c = G.find(current);
    $("swatches").innerHTML = "";
    c.palette.forEach(function (p) {
      var b = document.createElement("button"); b.type = "button"; b.style.background = p; b.setAttribute("aria-label", "Colour " + p);
      b.addEventListener("click", function () {
        $("studio-preview").style.background = "linear-gradient(160deg," + p + "," + c.palette[4] + ")";
        document.querySelectorAll("#swatches button").forEach(function (x) { x.classList.remove("on"); }); b.classList.add("on");
      });
      $("swatches").appendChild(b);
    });
  }
  $("random-look").addEventListener("click", function () {
    Object.keys(items).forEach(function (k) { look[k] = items[k][Math.floor(Math.random() * 3)][1]; });
    renderItems(); renderLook();
  });

  /* ---------- mood ---------- */
  var moods = [
    ["🌸", "Happy", "Keep the glow going: send a kind text and wear your favourite colour."],
    ["💧", "Emotional", "Warm tea, soft blanket, and write three lines in the journal below. It will pass."],
    ["😴", "Tired", "Cancel one thing today. 10 minutes with your eyes closed is productive."],
    ["🔥", "Motivated", "Pick one big task, set a 25-minute timer, and reward yourself after."],
    ["💗", "Loved", "Pass it on: tell someone why they matter to you."],
    ["🌧️", "Sad", "Be gentle. Fresh air for 5 minutes, then a comfort playlist. You are not behind."]
  ];
  moods.forEach(function (m) {
    var b = document.createElement("button"); b.type = "button"; b.className = "mood"; b.innerHTML = "<span>" + m[0] + "</span>" + m[1];
    b.addEventListener("click", function () {
      document.querySelectorAll(".mood").forEach(function (x) { x.classList.remove("on"); }); b.classList.add("on");
      $("prescription").textContent = m[0] + " " + m[2];
      if (store.get("moodDay", "") !== new Date().toDateString()) { store.set("moodDay", new Date().toDateString()); addXp(5, "moods"); }
    });
    $("mood-row").appendChild(b);
  });

  /* ---------- arcade ---------- */
  var area = $("game-area"), timer = null;
  function stopGame() { if (timer) { clearInterval(timer); timer = null; } }

  $("play-hearts").addEventListener("click", function () {
    stopGame(); area.hidden = false;
    var score = 0, left = 10;
    area.innerHTML = '<div class="game-bar"><span id="hs">Hearts: 0</span><span id="ht">10s</span></div><div class="heart-field" id="hf"></div>';
    var field = $("hf");
    function spawn() {
      var b = document.createElement("button"); b.type = "button"; b.textContent = ["💗", "💖", "🌸", "💕"][Math.floor(Math.random() * 4)];
      b.style.left = Math.random() * 88 + "%"; b.style.top = Math.random() * 80 + "%";
      b.addEventListener("click", function () { score++; $("hs").textContent = "Hearts: " + score; b.remove(); });
      field.appendChild(b); setTimeout(function () { b.remove(); }, 1200);
    }
    var tick = 0;
    timer = setInterval(function () {
      tick++; spawn();
      if (tick % 4 === 0) { left--; $("ht").textContent = left + "s"; }
      if (left <= 0) { stopGame(); var xp = Math.min(30, score * 3); field.innerHTML = '<p style="padding:20px">Time! You caught ' + score + " hearts 💗</p>"; addXp(xp, "games"); }
    }, 250);
  });

  $("play-memory").addEventListener("click", function () {
    stopGame(); area.hidden = false;
    var faces = ["🌸", "🎀", "💌", "🍵", "📖", "🕯️"], deck = faces.concat(faces).sort(function () { return Math.random() - .5; });
    var open = [], matched = 0, moves = 0, lock = false;
    area.innerHTML = '<div class="game-bar"><span id="mm">Moves: 0</span></div><div class="mem-grid" id="mg"></div>';
    deck.forEach(function (f) {
      var b = document.createElement("button"); b.type = "button"; b.className = "mem-card"; b.textContent = f;
      b.addEventListener("click", function () {
        if (lock || b.classList.contains("up") || b.classList.contains("matched")) return;
        b.classList.add("up"); open.push(b);
        if (open.length === 2) {
          moves++; $("mm").textContent = "Moves: " + moves;
          if (open[0].textContent === open[1].textContent) {
            open.forEach(function (x) { x.classList.add("matched"); }); open = []; matched++;
            if (matched === 6) addXp(Math.max(10, 40 - moves * 2), "games");
          } else {
            lock = true;
            setTimeout(function () { open.forEach(function (x) { x.classList.remove("up"); }); open = []; lock = false; }, 700);
          }
        }
      });
      $("mg").appendChild(b);
    });
  });

  $("play-spin").addEventListener("click", function () {
    area.hidden = false; stopGame();
    var today = new Date().toDateString();
    if (store.get("spinDay", "") === today) { area.innerHTML = "<p>You already spun today 🎡. Come back tomorrow!</p>"; return; }
    store.set("spinDay", today);
    var prizes = [["+20 XP", 20], ["+30 XP", 30], ["+10 XP", 10], ["+50 XP jackpot", 50]];
    var p = prizes[Math.floor(Math.random() * prizes.length)];
    area.innerHTML = "<p style='font-size:20px'>🎡 You won <b>" + p[0] + "</b>!</p>"; addXp(p[1], "games");
  });

  /* ---------- map ---------- */
  var places = ["Rose Garden Café", "White Loft Studio", "Midnight Library", "Cashmere Atelier", "Ribbon Boutique", "Rooftop Skyline"];
  var placeInfo = [
    "Peonies, pastries and a table by the window. Soft Power's favourite hideout.",
    "Bright, quiet and perfectly empty. Clean Minimalist resets here.",
    "Candles, shelves to the ceiling and a rainy skylight. The Literary Muse lives here.",
    "A hushed boutique of cashmere and camel. Quiet Luxury shops once, well.",
    "Satin bows, lace and baby pink everything. A Coquette Romantic dream.",
    "City lights, loud playlists and the best view. Street Sophisticate's turf."
  ];
  chars.forEach(function (c, i) {
    var b = document.createElement("button"); b.type = "button"; b.className = "place";
    b.innerHTML = "<span>" + c.emoji + "</span><b>" + places[i] + "</b>";
    b.addEventListener("click", function () {
      document.querySelectorAll(".place").forEach(function (x) { x.classList.remove("on"); }); b.classList.add("on");
      $("map-info").textContent = c.emoji + " " + placeInfo[i];
    });
    $("map-grid").appendChild(b);
  });

  /* ---------- journal ---------- */
  var prompts = ["What is one small moment today that felt peaceful, gentle or completely yours?", "What are you proud of this week?", "What do you want future you to remember?", "What would make tomorrow feel soft?"];
  $("journal-prompt").textContent = prompts[new Date().getDate() % prompts.length];
  var entries = store.get("entries", []);
  function renderEntries() {
    $("journal-count").textContent = entries.length + (entries.length === 1 ? " entry" : " entries");
    $("entries").innerHTML = "";
    entries.slice(-3).reverse().forEach(function (e) {
      var li = document.createElement("li"); var s = document.createElement("small"); s.textContent = e.date;
      li.appendChild(s); li.appendChild(document.createTextNode(e.text)); $("entries").appendChild(li);
    });
  }
  $("journal-save").addEventListener("click", function () {
    var t = $("journal-text").value.trim();
    if (!t) { toast("Write something first 💌"); return; }
    entries.push({ text: t, date: new Date().toLocaleDateString() }); store.set("entries", entries);
    $("journal-text").value = ""; renderEntries(); addXp(15, "journal");
  });

  /* ---------- init ---------- */
  choose(current, true);
  renderTabs(); renderItems(); renderLook(); renderLevel(); renderEntries();
})();
