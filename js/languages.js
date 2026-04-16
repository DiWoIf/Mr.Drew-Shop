const translations = {
  ua: {
    hero_title: "Ефективні рішення для вашого бізнесу",
    menu_features: "Переваги",
    // ... другие ключи
  },
  en: {
    hero_title: "Effective solutions for your business",
    menu_features: "Features",
    // ...
  },
  pl: {
    hero_title: "Efektywne rozwiązania для Twojego biznesu",
    menu_features: "Cechy",
    // ...
  },
};

const langButtons = document.querySelectorAll(".lang-btn");
const allTexts = document.querySelectorAll("[data-key]");

langButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const lang = btn.getAttribute("data-lang");

    // 1. Меняем активную кнопку
    document.querySelector(".lang-btn.active").classList.remove("active");
    btn.classList.add("active");

    // 2. Меняем текст у всех помеченных элементов
    allTexts.forEach((el) => {
      const key = el.getAttribute("data-key");
      el.textContent = translations[lang][key];
    });

    // 3. (Опционально) Сохраняем выбор в браузере
    localStorage.setItem("selectedLang", lang);
  });
});
