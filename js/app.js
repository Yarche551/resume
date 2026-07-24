/* =========================================================
   Ринат Шайхлисламов — резюме. Логика интерфейса.
   Весь контент задаётся один раз данными ниже (единый источник
   правды), а повторяющиеся блоки (навигация, контакты, стек,
   проекты) отрисовываются на JS. Переключение языка не
   перерисовывает DOM, а обновляет текст элементов с data-i18n.
   ========================================================= */
(function () {
  "use strict";

  /* =========================================================
     ДАННЫЕ
     ========================================================= */

  /* Технологический стек (одинаково для всех языков). */
  var STACK = [
    "JavaScript", "TypeScript", "Angular", "Tailwind CSS",
    "Webpack", "Parcel", "Node.js", "Git"
  ];

  /* Контакты. */
  var CONTACTS = [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/rinat-shaikhlislamov-a8452a382/" },
    { label: "Telegram", href: "https://t.me/yarche551" },
    { label: "GitHub",   href: "https://github.com/Yarche551" }
  ];

  /* Разделы навигации (текст берётся по ключу из словаря). */
  var NAV = [
    { key: "nav.stack",    href: "#stack" },
    { key: "nav.projects", href: "#projects" }
  ];

  /* PDF-резюме под каждый язык. */
  var CV_FILE = {
    ru: "downloads/resume_rus.pdf",
    en: "downloads/resume_eng.pdf"
  };

  /* Проекты — единый источник правды: ссылки + тексты на двух языках.
     Раньше все карточки ссылались на один и тот же ключ (projects.p1),
     из-за чего заголовки и описания дублировались. */
  var PROJECTS = [
    {
      links: [
        { label: "GitHub",    href: "https://github.com/Yarche551/lumincoinFinance_spa" },
        { label: "Live-демо", href: "https://lumincoinfinance-frontend.onrender.com" }
      ],
      ru: {
        title: "Проект «Lumincoin Finance»",
        desc: "Одностраничное приложение для планирования бюджета: учёт доходов и расходов по категориям, " +
              "история транзакций и дашборд с графиками на Chart.js. Авторизация по JWT. " +
              "Реализовано на нативном JavaScript, Webpack и Bootstrap 5."
      },
      en: {
        title: "Project “Lumincoin Finance”",
        desc: "A single-page budget-planning app: income & expense tracking by category, a transactions " +
              "history, and a dashboard with Chart.js charts. JWT authentication. " +
              "Built with vanilla JavaScript, Webpack and Bootstrap 5."
      }
    },
    {
      links: [
        { label: "GitHub",    href: "https://github.com/Yarche551/freelanceStudio_spa" },
        { label: "Live-демо", href: "https://freelancestudio-spa-1.onrender.com/login" }
      ],
      ru: {
        title: "Проект «Freelance Studio»",
        desc: "Одностраничное приложение для управления фрилансерами и заказами: авторизация (JWT), " +
              "полный CRUD и дашборд с календарём заказов. Сделано на нативном JavaScript, Webpack и " +
              "AdminLTE 3 / Bootstrap 4; работает с REST API."
      },
      en: {
        title: "Project “Freelance Studio”",
        desc: "A single-page app for managing freelancers and orders: authentication (JWT), full CRUD, " +
              "and a dashboard with an order calendar. Built with vanilla JavaScript, Webpack and " +
              "AdminLTE 3 / Bootstrap 4; works with a REST API."
      }
    },
    {
      links: [
        { label: "GitHub",    href: "https://github.com/Yarche551/dostaffkin" },
        { label: "Live-демо", href: "https://yarche551.github.io/dostaffkin/" }
      ],
      ru: {
        title: "Проект «Dostaffkin»",
        desc: "Настроил и сконфигурировал проект на Angular и TypeScript: Angular CLI, структура модулей " +
              "и маршрутизации."
      },
      en: {
        title: "Project “Dostaffkin”",
        desc: "Set up and configured an Angular + TypeScript project: Angular CLI, module and routing " +
              "structure."
      }
    },
    {
      links: [
        { label: "GitHub",    href: "https://github.com/Yarche551/nightlights" },
        { label: "Live-демо", href: "https://yarche551.github.io/nightlights/" }
      ],
      ru: {
        title: "Лендинг «Night Light»",
        desc: "Тёмный лендинг с детальными CSS-анимациями и световыми эффектами. Особое внимание уделил " +
              "pixel-perfect вёрстке; анимации реализованы на jQuery."
      },
      en: {
        title: "Landing “Night Light”",
        desc: "A dark-mode landing page with detailed CSS animations and lighting effects, built with close " +
              "attention to pixel-perfect layout; animations powered by jQuery."
      }
    }
  ];

  /* =========================================================
     СЛОВАРЬ ИНТЕРФЕЙСА
     (тексты проектов подмешиваются ниже автоматически из PROJECTS)
     ========================================================= */
  var I18N = {
    ru: {
      "title": "Ринат Шайхлисламов — Frontend-разработчик",
      "nav.home": "Главная",
      "nav.stack": "Стек",
      "nav.projects": "Проекты",
      "nav.cv": "Скачать резюме",
      "hero.download": "Скачать резюме",
      "hero.hello": "Привет, меня зовут",
      "hero.name": "Ринат Шайхлисламов",
      "hero.role": "Frontend-разработчик (Angular)",
      "hero.lead": "Frontend-разработчик, ориентированный на результат и процесс. Обладаю фундаментальными знаниями JavaScript, специализируюсь на Angular и TypeScript. Быстро осваиваю инструменты и превращаю макеты в интерфейсы, лендинги и SPA-приложения.",
      "hero.contact": "Связаться со мной",
      "stack.title": "Стек",
      "projects.title": "Проекты"
    },
    en: {
      "title": "Rinat Shaikhlislamov — Frontend Developer",
      "nav.home": "Home",
      "nav.stack": "Stack",
      "nav.projects": "Projects",
      "nav.cv": "Download resume",
      "hero.download": "Download resume",
      "hero.hello": "Hi, my name is",
      "hero.name": "Rinat Shaikhlislamov",
      "hero.role": "Frontend Developer (Angular)",
      "hero.lead": "A frontend developer focused on results and process. I have a solid foundation in JavaScript and specialize in Angular and TypeScript. I pick up new tools quickly and turn mock-ups into interfaces, landing pages and SPAs.",
      "hero.contact": "Get in touch",
      "stack.title": "Tech stack",
      "projects.title": "Projects"
    }
  };

  /* Подмешиваем тексты проектов в словарь под уникальными ключами. */
  PROJECTS.forEach(function (p, i) {
    var base = "projects.p" + (i + 1);
    I18N.ru[base + ".title"] = p.ru.title;
    I18N.ru[base + ".desc"]  = p.ru.desc;
    I18N.en[base + ".title"] = p.en.title;
    I18N.en[base + ".desc"]  = p.en.desc;
  });

  /* =========================================================
     ХЕЛПЕР ДЛЯ СОЗДАНИЯ ЭЛЕМЕНТОВ
     ========================================================= */
  function h(tag, attrs, text) {
    var el = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (name) {
        if (attrs[name] === false || attrs[name] == null) return;
        if (name === "class") el.className = attrs[name];
        else el.setAttribute(name, attrs[name] === true ? "" : attrs[name]);
      });
    }
    if (text != null) el.textContent = text;
    return el;
  }

  function langToggle(cls) {
    var wrap = cls ? h("div", { class: cls }) : document.createDocumentFragment();
    wrap.appendChild(h("button", { "data-lang": "ru" }, "RU"));
    if (!cls) wrap.appendChild(h("span", null, "/"));
    wrap.appendChild(h("button", { "data-lang": "en" }, "ENG"));
    return wrap;
  }

  /* =========================================================
     ОТРИСОВКА БЛОКОВ
     ========================================================= */
  function buildNav() {
    var list = document.getElementById("navList");
    if (!list) return;
    NAV.forEach(function (item) {
      var li = h("li");
      li.appendChild(h("a", { href: item.href, "data-i18n": item.key }));
      list.appendChild(li);
    });
    var li = h("li", { class: "topbar__lang" });
    li.appendChild(langToggle());
    list.appendChild(li);
  }

  function buildContacts() {
    var list = document.getElementById("contactList");
    if (!list) return;
    CONTACTS.forEach(function (c) {
      var li = h("li");
      li.appendChild(h("a", { href: c.href, target: "_blank", rel: "noopener" }, c.label));
      list.appendChild(li);
    });
    var li = h("li");
    li.appendChild(h("a", { "data-cv": true, href: CV_FILE.ru, download: true, "data-i18n": "hero.download" }));
    list.appendChild(li);
  }

  function buildMobileMenu() {
    var menu = document.getElementById("mobileMenu");
    if (!menu) return;

    var links = [{ key: "nav.home", href: "#home" }].concat(NAV);
    links.forEach(function (item) {
      menu.appendChild(h("a", { href: item.href, "data-i18n": item.key, class: "mobile-menu__link" }));
    });

    var contacts = h("div", { class: "mobile-menu__contacts" });
    CONTACTS.forEach(function (c) {
      contacts.appendChild(h("a", { href: c.href, target: "_blank", rel: "noopener" }, c.label));
    });
    contacts.appendChild(h("a", {
      class: "mobile-menu__cv", "data-cv": true, href: CV_FILE.ru, download: true, "data-i18n": "nav.cv"
    }));
    menu.appendChild(contacts);

    menu.appendChild(langToggle("mobile-menu__lang"));
  }

  function buildStack() {
    var track = document.getElementById("sliderTrack");
    var grid = document.getElementById("stackGrid");
    STACK.forEach(function (name) {
      // десктоп-слайдер: .slide (по 4 в ряд); мобильная сетка: .chip (блок на всю ширину)
      if (track) { var s = h("div", { class: "slide" }); s.appendChild(h("p", null, name)); track.appendChild(s); }
      if (grid)  { var g = h("div", { class: "chip" });  g.appendChild(h("p", null, name)); grid.appendChild(g); }
    });
  }

  function buildProjects() {
    var list = document.getElementById("projectList");
    if (!list) return;
    PROJECTS.forEach(function (p, i) {
      var base = "projects.p" + (i + 1);
      var art = h("article", { class: "project reveal" });
      art.appendChild(h("h3", { class: "project__title", "data-i18n": base + ".title" }));
      art.appendChild(h("p", { class: "project__desc", "data-i18n": base + ".desc" }));

      var links = h("div", { class: "links" });
      p.links.forEach(function (l) {
        links.appendChild(h("a", {
          class: "project__link", href: l.href, target: "_blank", rel: "noopener"
        }, l.label));
      });
      art.appendChild(links);
      list.appendChild(art);
    });
  }

  function buildAll() {
    buildNav();
    buildContacts();
    buildMobileMenu();
    buildStack();
    buildProjects();
  }

  /* =========================================================
     i18n: применение языка (без перерисовки DOM)
     ========================================================= */
  function applyLang(lang) {
    var dict = I18N[lang] || I18N.ru;
    document.documentElement.lang = lang;

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (dict[key] != null) el.textContent = dict[key];
    });

    var cv = encodeURI(CV_FILE[lang] || CV_FILE.ru);
    document.querySelectorAll("[data-cv]").forEach(function (el) {
      el.setAttribute("href", cv);
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

  /* ---------- stack slider (page-by-page) ---------- */
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

    var saved = null;
    try { saved = localStorage.getItem("lang"); } catch (e) {}
    if (saved !== "ru" && saved !== "en") {
      var nav = (navigator.language || "en").toLowerCase();
      saved = nav.indexOf("ru") === 0 ? "ru" : "en";
    }
    applyLang(saved);
  }

  /* ---------- init ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    buildAll();      // сначала строим DOM из данных
    initScrollTop();
    initReveal();
    initMenu();
    initSlider();
    initLang();      // затем применяем язык к готовому DOM
  });
})();
