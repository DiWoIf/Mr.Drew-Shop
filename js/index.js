// 1. МОБИЛЬНОЕ МЕНЮ
(() => {
  const refs = {
    openMenuBtn: document.querySelector("[data-menu-open]"),
    closeMenuBtn: document.querySelector("[data-menu-close]"),
    menu: document.querySelector("[data-menu]"),
    menuLinks: document.querySelectorAll(".nav-list-mobile a"),
  };

  const toggleMenu = () => {
    refs.menu.classList.toggle("is-open");
    document.body.style.overflow = refs.menu.classList.contains("is-open")
      ? "hidden"
      : "";
  };

  refs.openMenuBtn?.addEventListener("click", toggleMenu);
  refs.closeMenuBtn?.addEventListener("click", toggleMenu);
  refs.menuLinks.forEach((link) => link.addEventListener("click", toggleMenu));
})();

// 2. ПЕРЕКЛЮЧАТЕЛЬ ЯЗЫКА (Логика открытия списка)
const langCurrent = document.querySelector(".lang-current");
const langSwitcher = document.querySelector(".lang-switcher");

langCurrent?.addEventListener("click", () => {
  const isOpen = langSwitcher.classList.toggle("is-open");
  // Добавляем эту строчку для Lighthouse:
  langCurrent.setAttribute("aria-expanded", isOpen);
});

document.addEventListener("click", (e) => {
  if (!langSwitcher?.contains(e.target)) {
    langSwitcher?.classList.remove("is-open");
    langCurrent?.setAttribute("aria-expanded", "false");
  }
});

// 3. FAQ (Аккордеон: закрываем другие при открытии нового)
document.querySelectorAll(".faq-card").forEach((el) => {
  el.addEventListener("toggle", () => {
    if (el.open) {
      document.querySelectorAll(".faq-card").forEach((other) => {
        if (other !== el && other.open) other.open = false;
      });
    }
  });
});

// 4. ВАЛИДАЦИЯ ТЕЛЕФОНА (Только цифры и +)
const phoneInput = document.getElementById("form-phone-input");
phoneInput?.addEventListener("input", (e) => {
  e.target.value = e.target.value.replace(/[^\d+]/g, "");
});

// 5. ОТПРАВКА ФОРМЫ И МОДАЛКА УСПЕХА
const orderForm = document.querySelector('form[name="consultation-form"]');
const successModal = document.getElementById("success-modal");
const closeBtns = document.querySelectorAll("#modal-close-btn, #modal-ok-btn");

orderForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  // Проверка валидности (minlength, pattern и т.д.)
  if (!orderForm.checkValidity()) {
    orderForm.reportValidity();
    return;
  }

  const formData = new FormData(orderForm);

  fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(formData).toString(),
  })
    .then(() => {
      successModal?.classList.remove("is-hidden");
      orderForm.reset();
    })
    .catch((error) => console.error("Ошибка отправки:", error));
});

// Закрытие модалки по кнопкам
closeBtns.forEach((btn) => {
  btn.addEventListener("click", () => successModal?.classList.add("is-hidden"));
});

// Закрытие модалки по клику на фон
successModal?.addEventListener("click", (e) => {
  if (e.target === successModal) successModal.classList.add("is-hidden");
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !successModal.classList.contains("is-hidden")) {
    successModal.classList.add("is-hidden");
  }
});

document.querySelectorAll(".faq-card").forEach((card) => {
  const summary = card.querySelector("summary");

  summary.addEventListener("click", (e) => {
    e.preventDefault(); // Останавливаем мгновенное открытие/закрытие

    if (card.hasAttribute("open")) {
      // Закрытие
      card.classList.remove("is-open");
      // Ждем окончания анимации (300ms) перед тем как убрать атрибут open
      setTimeout(() => {
        card.removeAttribute("open");
      }, 300);
    } else {
      // Открытие
      card.setAttribute("open", "");
      // Минимальная задержка, чтобы браузер успел заметить атрибут и запустил transition
      setTimeout(() => {
        card.classList.add("is-open");
      }, 10);
    }
  });
});
