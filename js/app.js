/* =========================================================
   Ринат Шайхлисламов — резюме. Логика интерфейса.
   Написано вручную: курсор, прогресс, reveal, слайдер, i18n.
   ========================================================= */
(function () {
  "use strict";

  /* ---------- i18n ---------- */
  var I18N = {
    ru: {
      "title": "Ринат Шайхлисламов — Frontend-разработчик",
      "nav.home": "Главная",
      "nav.stack": "Стек",
      "nav.projects": "Проекты",
      "nav.education": "Образование",
      "nav.cv": "Скачать CV",
      "hero.download": "Скачать резюме",
      "hero.hello": "Привет, меня зовут",
      "hero.name": "Ринат Шайхлисламов",
      "hero.role": "Frontend-разработчик",
      "hero.lead": "Специализируюсь на создании адаптивных и удобных интерфейсов с помощью JavaScript и современного CSS. Уделяю внимание чистоте кода и быстро осваиваю новые технологии.",
      "hero.contact": "Связаться со мной",
      "stack.title": "Технологический стек",
      "projects.title": "Проекты",
      "projects.p1.title": "Лендинг «FURNITURE» · Обучение",
      "projects.p1.meta": "Март 2026 · 3 недели | Москва, Россия",
      "projects.p1.desc": "Спроектировал современный лендинг с профессиональным процессом сборки на Node.js и npm. Настроил и оптимизировал сборку через Webpack, стилизовал интерфейс на Tailwind CSS (utility-first).",
      "projects.p2.title": "Проект «Dostaffkin» · ITlogia-интенсив",
      "projects.p2.meta": "Март 2026 · 2 недели | Москва, Россия",
      "projects.p2.desc": "Разработал функциональный интерфейс веб-приложения с нуля на JavaScript (ES6+) и современном CSS. Реализовал адаптивную вёрстку под мобильные, планшеты и десктоп; интегрировал сторонние инструменты.",
      "projects.p3.title": "Лендинг «Night Light» · Обучение",
      "projects.p3.meta": "Январь — февраль 2026 · 2 месяца | Москва, Россия",
      "projects.p3.desc": "Сделал визуально насыщенный лендинг с акцентом на тёмный режим и световые эффекты. Использовал CSS-анимации и переходы для «премиального» ощущения и полностью адаптивный макет.",
      "projects.p4.title": "Лендинг «Macaroons» · Раннее обучение",
      "projects.p4.meta": "Январь 2026 · 3 недели | Москва, Россия",
      "projects.p4.desc": "Свёрстал детализированный многосекционный лендинг по макету из Figma с pixel-perfect точностью на семантическом HTML5 и CSS3 (Flexbox, Grid). Добавил интерактив и плавные анимации на JavaScript.",
      "edu.title": "Образование и языки",
      "edu.mai.title": "Московский авиационный институт (МАИ)",
      "edu.mai.meta": "Системный анализ и управление (27.03.03) · 2023 — 2027",
      "edu.mai.desc": "Фокус на информационных системах и разработке ПО. Развиваю логическое мышление, структурированное программирование и системное проектирование, применяя их во frontend-разработке. Есть опыт с C++ и SQL в рамках учебной программы.",
      "edu.lang.ru": "Русский",
      "edu.lang.ru.level": "Родной",
      "edu.lang.en": "English",
      "edu.lang.en.level": "B2 · Upper-Intermediate"
    },
    en: {
      "title": "Rinat Shaikhlislamov — Frontend Developer",
      "nav.home": "Home",
      "nav.stack": "Stack",
      "nav.projects": "Projects",
      "nav.education": "Education",
      "nav.cv": "Download CV",
      "hero.download": "Download resume",
      "hero.hello": "Hi, my name is",
      "hero.name": "Rinat Shaikhlislamov",
      "hero.role": "Frontend Developer",
      "hero.lead": "Focused on building responsive and user-friendly interfaces with JavaScript and modern CSS. Passionate about clean code and rapid learning of new technologies.",
      "hero.contact": "Get in touch",
      "stack.title": "Tech stack",
      "projects.title": "Projects",
      "projects.p1.title": "Landing “FURNITURE” · Studying",
      "projects.p1.meta": "March 2026 · 3 weeks | Moscow, Russia",
      "projects.p1.desc": "Architected a modern landing page with a professional build workflow on Node.js and npm. Configured and optimized the build with Webpack and styled the whole UI with Tailwind CSS (utility-first).",
      "projects.p2.title": "Project “Dostaffkin” · ITlogia intensive",
      "projects.p2.meta": "March 2026 · 2 weeks | Moscow, Russia",
      "projects.p2.desc": "Built a functional web app interface from scratch with JavaScript (ES6+) and modern CSS. Implemented responsive layout for mobile, tablet and desktop; integrated third-party tools.",
      "projects.p3.title": "Landing “Night Light” · Studying",
      "projects.p3.meta": "January — February 2026 · 2 months | Moscow, Russia",
      "projects.p3.desc": "Engineered a visually striking landing page focused on dark-mode aesthetics and lighting effects. Used CSS animations and transitions for a premium feel and a fully responsive layout.",
      "projects.p4.title": "Landing “Macaroons” · Early studying",
      "projects.p4.meta": "January 2026 · 3 weeks | Moscow, Russia",
      "projects.p4.desc": "Built a high-fidelity, multi-section landing page from a Figma mock-up with pixel-perfect accuracy on semantic HTML5 and CSS3 (Flexbox, Grid). Added interactive elements and smooth JavaScript animations.",
      "edu.title": "Education & languages",
      "edu.mai.title": "Moscow Aviation Institute (MAI)",
      "edu.mai.meta": "System Analysis and Management (27.03.03) · 2023 — 2027",
      "edu.mai.desc": "Focused on information systems and software development. Building logical problem-solving, structured programming and system design skills that I apply to frontend work. Gained experience with C++ and SQL through coursework.",
      "edu.lang.ru": "Russian",
      "edu.lang.ru.level": "Native",
      "edu.lang.en": "English",
      "edu.lang.en.level": "B2 · Upper-Intermediate"
    }
  };

  var CV_FILE = {
    ru: "downloads/Резюме на русском.pdf",
    en: "downloads/Resume.pdf"
  };

  function applyLang(lang) {
    var dict = I18N[lang] || I18N.ru;
    document.documentElement.lang = lang;

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (dict[key] != null) el.textContent = dict[key];
    });

    document.querySelectorAll("[data-cv]").forEach(function (el) {
      el.setAttribute("href", CV_FILE[lang] || CV_FILE.ru);
    });

    document.querySelectorAll("[data-lang]").forEach(function (btn) {
      btn.classList.toggle("is-active", btn.getAttribute("data-lang") === lang);
    });

    try { localStorage.setItem("lang", lang); } catch (e) {}
  }

  /* ---------- scroll progress + back to top ---------- */
  function initScrollTop() {
    var el = document.getElementById("scrollTop");
    var bar = document.getElementById("progressBar");
    if (!el || !bar) return;
    var len = 2 * Math.PI * 20; // r = 20

    function update() {
      var top = window.scrollY || document.documentElement.scrollTop;
      var height = document.documentElement.scrollHeight - window.innerHeight;
      var pct = height > 0 ? top / height : 0;
      bar.style.strokeDashoffset = String(len * (1 - pct));
      el.classList.toggle("is-visible", top > 400);
    }
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  /* ---------- reveal on scroll ---------- */
  function initReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      items.forEach(function (i) { i.classList.add("is-in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    items.forEach(function (i) { io.observe(i); });
  }

  /* ---------- burger / mobile menu ---------- */
  function initMenu() {
    var burger = document.getElementById("burger");
    var menu = document.getElementById("mobileMenu");
    if (!burger || !menu) return;

    function toggle(open) {
      var willOpen = open != null ? open : !menu.classList.contains("is-open");
      menu.classList.toggle("is-open", willOpen);
      burger.classList.toggle("is-open", willOpen);
      document.body.style.overflow = willOpen ? "hidden" : "";
    }
    burger.addEventListener("click", function () { toggle(); });
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { toggle(false); });
    });
  }

  /* ---------- stack slider (page-by-page, like Artem's) ---------- */
  function initSlider() {
    var slider = document.getElementById("slider");
    var track = document.getElementById("sliderTrack");
    if (!slider || !track) return;
    var perView = 4;
    var pages = Math.max(1, Math.ceil(track.children.length / perView));
    var index = 0;

    function render() { track.style.setProperty("--slider-index", index); }

    slider.querySelectorAll(".slider__handle").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var next = btn.getAttribute("data-dir") === "next";
        if (next) index = index >= pages - 1 ? 0 : index + 1;
        else index = index <= 0 ? pages - 1 : index - 1;
        render();
      });
    });
    render();
  }

  /* ---------- language buttons ---------- */
  function initLang() {
    document.querySelectorAll("[data-lang]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        applyLang(btn.getAttribute("data-lang"));
      });
    });
    var saved = "en";
    try { saved = localStorage.getItem("lang") || "en"; } catch (e) {}
    applyLang(saved);
  }

  /* ---------- init ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    initScrollTop();
    initReveal();
    initMenu();
    initSlider();
    initLang();
  });
})();
