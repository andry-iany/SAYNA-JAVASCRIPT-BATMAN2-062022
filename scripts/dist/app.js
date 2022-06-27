// This module contains all shared script and some general functions
// ANIMATION
const eltsToAnimate = document.querySelectorAll(".fade-in-hidden");
const observer = new IntersectionObserver(handleIntersecting);
// register observer to trigger animation when the element is visible
eltsToAnimate.forEach((elt) => observer.observe(elt));
function handleIntersecting(entries) {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.replace("fade-in-hidden", "fade-in-shown");
            observer.unobserve(entry.target); // unobserve the element once it's been animated
        }
    }, { root: null });
}
// POPUP
export function showPopup() {
    const popup = document.querySelector(".popup");
    popup === null || popup === void 0 ? void 0 : popup.classList.add("popup-shown");
}
export function hidePopup() {
    const popup = document.querySelector(".popup");
    popup === null || popup === void 0 ? void 0 : popup.classList.remove("popup-shown");
}
// we want to always close the popup if the popup-close-btn is clicked
window.addEventListener("click", (event) => {
    const target = event.target;
    if (!target)
        return;
    else if (isPopupCloseBtn(target)) {
        hidePopup();
    }
});
export function isPopupCloseBtn(elt) {
    return elt.classList.contains("popup-close-btn");
}
