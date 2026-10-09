const heartBtn = document.querySelector('.heart-btn');
const heartIcon = document.querySelector('i.fa-heart');
heartBtn.addEventListener ('click',()=>{
    heartIcon.classList.toggle('fa-solid');
})

document.addEventListener("DOMContentLoaded", () => {
  /* ---------- helpers ---------- */
  const store = {
    get(key, fallback) {
      try { const v = localStorage.getItem(key); return v === null ? fallback : JSON.parse(v); }
      catch { return fallback; }
    },
    set(key, value) {
      try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
    },
  };

  /* ---------- mobile menu ---------- */
  const toggle = document.querySelector(".menu-toggle");
  const navList = document.querySelector(".nav-list");

  function setMenu(open) {
    navList.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.innerHTML = open
      ? '<i class="fa-solid fa-xmark"></i>'
      : '<i class="fa-solid fa-bars"></i>';
  }
  toggle.addEventListener("click", () => setMenu(!navList.classList.contains("open")));
  navList.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });
  document.addEventListener("click", (e) => { if (!e.target.closest(".nav-header")) setMenu(false); });
  window.addEventListener("resize", () => { if (window.innerWidth > 1100) setMenu(false); });

  /* ---------- heart button ---------- */
  const heart = document.querySelector(".heart-btn");
  heart.addEventListener("click", () => {
    const liked = heart.classList.toggle("fa-solid");
    heart.classList.toggle("fa-regular", !liked);
    store.set("liked", liked);
  });
  if (store.get("liked", false)) { heart.classList.add("fa-solid"); heart.classList.remove("fa-regular"); }

  /* ---------- quiz: archetypes update the preview card ---------- */
  const archetypes = [
    { title: "The Soft Power Girl 🌸", palette: ["#a0174f", "#f48fb1", "#ec4899", "#fde4ee", "#fff0f6"],
      scent: "Rose Petals & Tonka", ritual: "15m Solitude & Matcha" },
    { title: "The Clean Minimalist 🤍", palette: ["#3d3a38", "#bfb8b0", "#e8e2da", "#f7f4ef", "#ffffff"],
      scent: "White Tea & Cedar", ritual: "10m Stretch & Lemon Water" },
    { title: "The Literary Muse 📖", palette: ["#5a1d39", "#a8577e", "#c9a27e", "#f1e3d3", "#fff7ee"],
      scent: "Old Paper & Amber", ritual: "20m Reading & Chai" },
    { title: "The Quiet Luxury Girl 🕊️", palette: ["#2b2523", "#7a6a5f", "#b9a999", "#e9e1d8", "#faf7f2"],
      scent: "Sandalwood & Fig", ritual: "Evening Journaling & Jasmine Tea" },
  ];

  const archetypeButtons = document.querySelectorAll(".archetype");
  const resultTitle = document.querySelector(".result-title");
  const paletteDots = document.querySelectorAll(".palette span");
  const infoValues = document.querySelectorAll(".info-value");
  const resultCard = document.querySelector(".result-card");

  function showArchetype(index) {
    const data = archetypes[index];
    archetypeButtons.forEach((b, i) => b.classList.toggle("active", i === index));
    resultCard.style.opacity = "0";
    setTimeout(() => {
      resultTitle.textContent = data.title;
      paletteDots.forEach((dot, i) => (dot.style.background = data.palette[i]));
      infoValues[0].textContent = data.scent;
      infoValues[1].textContent = data.ritual;
      resultCard.style.opacity = "1";
    }, 150);
  }
  resultCard.style.transition = "opacity 0.2s";
  archetypeButtons.forEach((btn, i) => btn.addEventListener("click", () => showArchetype(i)));

  // placeholder until the real quiz exists: pick a random archetype
  document.getElementById("quiz-cta").addEventListener("click", (e) => {
    e.preventDefault();
    showArchetype(Math.floor(Math.random() * archetypes.length));
  });

  /* ---------- 7-day reset (saved in the browser) ---------- */
  const days = document.querySelectorAll(".day-card:not(.next-level)");
  const ring = document.querySelector(".cadence-ring");
  const percentText = document.querySelector(".cadence p.fs-12");

  const savedDays = store.get("resetDays", null);
  if (savedDays) days.forEach((d, i) => paintDay(d, savedDays[i]));
  updateProgress();

  function paintDay(day, done) {
    day.classList.toggle("done", done);
    day.querySelector("i").className = done ? "fa-solid fa-circle-check" : "fa-regular fa-circle";
  }
  function updateProgress() {
    const count = document.querySelectorAll(".day-card.done").length;
    ring.textContent = count + "/7";
    percentText.textContent = Math.round((count / 7) * 100) + "% Completed this cycle";
    store.set("resetDays", [...days].map((d) => d.classList.contains("done")));
  }
  days.forEach((day) =>
    day.addEventListener("click", () => {
      paintDay(day, !day.classList.contains("done"));
      updateProgress();
    })
  );

  /* ---------- evening reflection ---------- */
  const greeting = document.getElementById("greeting");
  const dateEl = document.getElementById("today-date");
  const hour = new Date().getHours();
  const part = hour < 12 ? "morning" : hour < 18 ? "afternoon" : "evening";
  greeting.textContent = `Good ${part}, Muse ✨`;
  dateEl.textContent = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

  const chips = document.querySelectorAll(".chip");
  const journal = document.getElementById("journal");
  const saveBtn = document.getElementById("save-entry");

  const savedMood = store.get("mood", null);
  if (savedMood !== null) chips.forEach((c, i) => c.classList.toggle("active", i === savedMood));
  chips.forEach((chip, i) =>
    chip.addEventListener("click", () => {
      chips.forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      store.set("mood", i);
    })
  );

  journal.value = store.get("journal", "");
  saveBtn.addEventListener("click", (e) => {
    e.preventDefault();
    store.set("journal", journal.value);
    const original = saveBtn.innerHTML;
    saveBtn.innerHTML = 'Saved <i class="fa-solid fa-check"></i>';
    setTimeout(() => (saveBtn.innerHTML = original), 1500);
  });

  /* ---------- fade-in on scroll ---------- */
  const revealTargets = document.querySelectorAll(".section .card, .aesthetic-item, .perk");
  revealTargets.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  });
  const observer = new IntersectionObserver(
    (entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
  const el = entry.target;
  el.style.opacity = "1";
  el.style.transform = "translateY(0)";
  observer.unobserve(el);
  setTimeout(() => { el.style.opacity = el.style.transform = el.style.transition = ""; }, 700);
}
    }),
    { threshold: 0.12 }
  );
  revealTargets.forEach((el) => observer.observe(el));
});