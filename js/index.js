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

document.querySelectorAll(".faq-card").forEach((targetDetail) => {
  targetDetail.addEventListener("click", (e) => {
    // Ждем микросекунду, чтобы атрибут open успел обновиться
    setTimeout(() => {
      if (targetDetail.open) {
        document.querySelectorAll(".faq-card").forEach((detail) => {
          if (detail !== targetDetail) {
            detail.open = false;
          }
        });
      }
    }, 10);
  });
});

// фильтр ввода телефона

const phoneInput = document.getElementById("form-phone-input");

phoneInput.addEventListener("input", (e) => {
  // Оставляем только цифры и плюс
  e.target.value = e.target.value.replace(/[^\d+]/g, "");
});

// МОДАЛКА
const orderForm = document.querySelector('form[name="consultation-form"]');
const successModal = document.getElementById("success-modal");
const closeBtns = document.querySelectorAll("#modal-close-btn, #modal-ok-btn");

// Обработка отправки
orderForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Останавливаем перезагрузку страницы

  const formData = new FormData(orderForm);

  fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(formData).toString(),
  })
    .then(() => {
      // Показываем модалку
      successModal.classList.remove("is-hidden");
      orderForm.reset(); // Очищаем форму
    })
    .catch((error) => alert("Ошибка отправки: " + error));
});

// Закрытие модалки
closeBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    successModal.classList.add("is-hidden");
  });
});
