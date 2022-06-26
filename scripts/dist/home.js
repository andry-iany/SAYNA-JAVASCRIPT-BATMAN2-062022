// Script for the home page
import "./app.js";
// FORM
const form = document.querySelector(".forms");
form.addEventListener("submit", (event) => {
    event.preventDefault();
    showPopup();
});
function showPopup() {
    const popup = document.querySelector(".popup");
    popup.classList.add("popup-shown");
    setTimeout(() => popup.classList.remove("popup-shown"), 3000);
}
// CUSTOM SELECT
const select = document.querySelector("#select");
select.addEventListener("click", (event) => {
    const target = event.target;
    // visible option: refers to the option currently selected
    if (isVisibleOptionElement(target)) {
        showOrHideOptions();
    }
    else if (isOptionElement(target)) {
        selectOption(target);
    }
});
function isVisibleOptionElement(element) {
    return element.closest(".select-option-visible");
}
function showOrHideOptions() {
    select.classList.toggle("select-shown");
}
function isOptionElement(element) {
    return element === null || element === void 0 ? void 0 : element.classList.contains("select-option");
}
function selectOption(option) {
    const visibleOption = select.querySelector(".select-option-visible-text");
    // show the value of the selected option
    visibleOption.textContent = option.textContent;
    // we want to store the "value" of the selected option as data property of the visible option
    visibleOption.setAttribute("data-value", option.dataset.value);
    hideOptions();
}
function hideOptions() {
    select.classList.remove("select-shown");
}
// we want our "select" element to be closed when we click outside
window.addEventListener("click", (event) => {
    if (!event.target.closest("#select")) {
        hideOptions();
    }
});
