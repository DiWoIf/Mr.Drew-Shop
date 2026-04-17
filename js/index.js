// 1. Сначала выносим данные (словарь) на самый верх
const translations = {
  ua: {
    hero_title: "Место, где вы можете воплотить свои идеи",
    menu_overview: "Обзор",
    menu_contacts: "Контакты",
  },
  en: {
    hero_title: "A place where you can bring your ideas to life",
    menu_overview: "Overview",
    menu_contacts: "Contacts",
  },
  pl: {
    hero_title: "Miejsce, w którym ożywisz swoje pomysły",
    menu_overview: "Przegląd",
    menu_contacts: "Kontakty",
  },
};

// 2. Находим элементы один раз
const langSwitcher = document.querySelector(".lang-switcher");
const langCurrent = document.querySelector(".lang-current");
const langButtons = document.querySelectorAll(".lang-list button");
const allTexts = document.querySelectorAll("[data-key]");

// 3. Функция смены языка (выносим отдельно для чистоты)
function changeLanguage(lang) {
  allTexts.forEach((el) => {
    const key = el.getAttribute("data-key");
    if (translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  langCurrent.textContent = lang.toUpperCase();
  localStorage.setItem("selectedLang", lang);
}

// 4. Слушатели событий
langCurrent.addEventListener("click", () => {
  langSwitcher.classList.toggle("is-open");
});

langButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const lang = btn.getAttribute("data-lang");
    changeLanguage(lang);
    langSwitcher.classList.remove("is-open");
  });
});

// Закрыть, если кликнули мимо
document.addEventListener("click", (e) => {
  if (!langSwitcher.contains(e.target)) {
    langSwitcher.classList.remove("is-open");
  }
});

// 5. Бонус: проверяем сохраненный язык при загрузке страницы
const savedLang = localStorage.getItem("selectedLang");
if (savedLang) {
  changeLanguage(savedLang);
}

(() => {
  const refs = {
    openModalBtn: document.querySelector("[data-menu-open]"),
    closeModalBtn: document.querySelector("[data-menu-close]"),
    modal: document.querySelector("[data-menu]"),
    // Находим все ссылки внутри навигации мобильного меню
    menuLinks: document.querySelectorAll(".nav-list-mobile a"),
  };

  refs.openModalBtn.addEventListener("click", toggleModal);
  refs.closeModalBtn.addEventListener("click", toggleModal);

  // Добавляем слушатель событий на каждую ссылку
  refs.menuLinks.forEach((link) => {
    link.addEventListener("click", toggleModal);
  });

  function toggleModal() {
    refs.modal.classList.toggle("is-open");

    // Бонус: блокировка скролла страницы при открытом меню
    if (refs.modal.classList.contains("is-open")) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }
})();
