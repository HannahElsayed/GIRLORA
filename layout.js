/* GIRLORA — shared header/footer for the inner pages (quiz, characters, profile).
   Put <div id="site-header"></div> and <div id="site-footer"></div> in the page. */
(function () {
  var headerHTML =
    '<header class="nav-header between-flex gap-20 p-30">' +
      '<a href="index.html" class="logo d-flex align-center gap-20">' +
        '<h1 class="logo-f m-0">GIRLORA <span class="star">✨</span><span class="line"></span></h1>' +
        '<span class="logo-side center-flex">Universe</span>' +
      '</a>' +
      '<nav class="nav-list" aria-label="Main"><ul class="d-flex align-center gap-20 m-0">' +
        '<li><a href="index.html">BEAUTY</a></li>' +
        '<li><a href="index.html">JOURNAL</a></li>' +
        '<li><a href="index.html">DISCOVER</a></li>' +
        '<li><a href="characters.html" data-nav="characters">CHARACTERS</a></li>' +
        '<li><a href="quiz.html" data-nav="quiz">QUIZ</a></li>' +
        '<li><a href="world.html" data-nav="world">WORLD</a></li>' +
        '<li><a href="index.html">MINDSET</a></li>' +
      '</ul></nav>' +
      '<div class="right-nav d-flex align-center gap-20">' +
        '<i class="fa-regular fa-heart heart-btn c-pink" role="button" tabindex="0" aria-label="Favourite"></i>' +
        '<button class="menu-toggle" type="button" aria-label="Toggle menu" aria-expanded="false"><i class="fa-solid fa-bars"></i></button>' +
      '</div>' +
    '</header>';

  var footerHTML =
    '<footer class="site-footer"><div class="container footer-inner">' +
      '<div class="footer-brand"><h2 class="logo-f m-0">GIRLORA <span class="star">✨</span></h2>' +
        '<p class="fs-12 c-p m-0">© 2025 GIRLORA Atelier. All rights reserved. Curated for the modern muse.</p></div>' +
      '<ul class="footer-links">' +
        '<li><a href="index.html">Home</a></li>' +
        '<li><a href="quiz.html">Take the Quiz</a></li>' +
        '<li><a href="characters.html">All Characters</a></li>' +
        '<li><a href="world.html">GIRLORA World</a></li>' +
        '<li><a href="#">Privacy Policy</a></li>' +
        '<li><a href="#">Terms of Service</a></li>' +
      '</ul>' +
    '</div></footer>';

  function mount(id, html) { var el = document.getElementById(id); if (el) el.outerHTML = html; }
  mount("site-header", headerHTML);
  mount("site-footer", footerHTML);

  var toggle = document.querySelector(".menu-toggle");
  var nav = document.querySelector(".nav-list");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  var heart = document.querySelector(".heart-btn");
  if (heart) {
    var KEY = "girlora_heart", on = false;
    try { on = localStorage.getItem(KEY) === "1"; } catch (e) {}
    function paint() { heart.classList.toggle("fa-solid", on); heart.classList.toggle("fa-regular", !on); }
    function flip() { on = !on; try { localStorage.setItem(KEY, on ? "1" : "0"); } catch (e) {} paint(); }
    paint();
    heart.addEventListener("click", flip);
    heart.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); flip(); } });
  }

  var page = document.body.getAttribute("data-page");
  if (page) {
    var link = document.querySelector('[data-nav="' + page + '"]');
    if (link) link.style.color = "var(--neon-pink)";
  }
})();
