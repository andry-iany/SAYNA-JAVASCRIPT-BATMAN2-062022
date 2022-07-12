// This module contains all shared script and some general functions

// ANIMATION
const eltsToAnimate = document.querySelectorAll(".fade-in-hidden");
const observer = new IntersectionObserver(handleIntersecting, {
  threshold: 0.5,
});
// register observer to trigger animation when the element is visible
eltsToAnimate.forEach((elt) => observer.observe(elt));

function handleIntersecting(entries: IntersectionObserverEntry[]) {
  entries.forEach((entry: IntersectionObserverEntry) => {
    if (entry.isIntersecting) {
      entry.target.classList.replace("fade-in-hidden", "fade-in-shown");
      observer.unobserve(entry.target); // unobserve the element once it's been animated
    }
  });
}

// POPUP
export function showPopup() {
  const popup = document.querySelector<HTMLElement>(".popup");
  popup?.classList.add("popup-shown");
}

export function hidePopup() {
  const popup = document.querySelector<HTMLElement>(".popup");
  popup?.classList.remove("popup-shown");
}

// we want to always close the popup if the popup-close-btn is clicked
window.addEventListener("click", (event: Event) => {
  const target = event.target as HTMLElement;
  if (!target) return;
  else if (isPopupCloseBtn(target)) {
    hidePopup();
  }
});

export function isPopupCloseBtn(elt: HTMLElement) {
  return elt.classList.contains("popup-close-btn");
}
