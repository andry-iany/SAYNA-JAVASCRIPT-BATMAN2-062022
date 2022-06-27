// This module contains all shared script and some general functions

// ANIMATION
const eltsToAnimate = document.querySelectorAll(".fade-in-hidden");
const observer = new IntersectionObserver(handleIntersecting);
// register observer to trigger animation when the element is visible
eltsToAnimate.forEach((elt) => observer.observe(elt));

function handleIntersecting(entries: IntersectionObserverEntry[]) {
  entries.forEach(
    (entry: IntersectionObserverEntry) => {
      if (entry.isIntersecting) {
        entry.target.classList.replace("fade-in-hidden", "fade-in-shown");
        observer.unobserve(entry.target); // unobserve the element once it's been animated
      }
    },
    { root: null }
  );
}

export function showPopup() {
  const popup = document.querySelector<HTMLElement>(".popup");
  popup?.classList.add("popup-shown");
}

export function hidePopup() {
  const popup = document.querySelector<HTMLElement>(".popup");
  popup?.classList.remove("popup-shown");
}
