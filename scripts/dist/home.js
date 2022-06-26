import "./app.js";
// Script for the home page
// FORM
const form = document.querySelector(".forms");
form === null || form === void 0 ? void 0 : form.addEventListener("submit", (event) => {
    event.preventDefault();
    showPopup();
});
function showPopup() {
    const popup = document.querySelector(".popup");
    popup === null || popup === void 0 ? void 0 : popup.classList.add("popup-shown");
    setTimeout(() => popup === null || popup === void 0 ? void 0 : popup.classList.remove("popup-shown"), 3000);
}
// CUSTOM SELECT
const select = document.querySelector("#select");
select === null || select === void 0 ? void 0 : select.addEventListener("click", (event) => {
    const target = event.target;
    if (!target)
        return;
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
    select === null || select === void 0 ? void 0 : select.classList.toggle("select-shown");
}
function isOptionElement(element) {
    return element === null || element === void 0 ? void 0 : element.classList.contains("select-option");
}
function selectOption(option) {
    const visibleOption = select === null || select === void 0 ? void 0 : select.querySelector(".select-option-visible-text");
    if (!visibleOption)
        return;
    // show the value of the selected option
    visibleOption.textContent = option.textContent;
    // we want to store the "value" of the selected option as data property of the visible option
    if (option.dataset.value)
        visibleOption.setAttribute("data-value", option.dataset.value);
    hideOptions();
}
function hideOptions() {
    select === null || select === void 0 ? void 0 : select.classList.remove("select-shown");
}
// we want our "select" element to be closed when we click outside
window.addEventListener("click", (event) => {
    if (!event.target.closest("#select")) {
        hideOptions();
    }
});