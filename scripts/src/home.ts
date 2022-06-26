import "./app.js";

// Script for the home page

// FORM
const form = document.querySelector<HTMLFormElement>(".forms");
form?.addEventListener("submit", (event: SubmitEvent) => {
  event.preventDefault();
  showPopup();
});

function showPopup() {
  const popup = document.querySelector<HTMLElement>(".popup");
  popup?.classList.add("popup-shown");
  setTimeout(() => popup?.classList.remove("popup-shown"), 3000);
}

// CUSTOM SELECT
const select = document.querySelector<HTMLElement>("#select");

select?.addEventListener("click", (event: Event) => {
  const target = event.target as HTMLElement;

  if (!target) return;

  // visible option: refers to the option currently selected
  if (isVisibleOptionElement(target)) {
    showOrHideOptions();
  } else if (isOptionElement(target)) {
    selectOption(target);
  }
});

function isVisibleOptionElement(element: HTMLElement) {
  return element.closest(".select-option-visible");
}

function showOrHideOptions() {
  select?.classList.toggle("select-shown");
}

function isOptionElement(element: HTMLElement) {
  return element?.classList.contains("select-option");
}

function selectOption(option: HTMLElement) {
  const visibleOption = select?.querySelector(".select-option-visible-text");

  if (!visibleOption) return;

  // show the value of the selected option
  visibleOption.textContent = option.textContent;

  // we want to store the "value" of the selected option as data property of the visible option
  if (option.dataset.value)
    visibleOption.setAttribute("data-value", option.dataset.value);

  hideOptions();
}

function hideOptions() {
  select?.classList.remove("select-shown");
}

// we want our "select" element to be closed when we click outside
window.addEventListener("click", (event: Event) => {
  if (!(event.target as HTMLElement).closest("#select")) {
    hideOptions();
  }
});
