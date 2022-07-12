// This module contains all shared script and some general functions

// ANIMATION
const eltsToAnimate = document.querySelectorAll(
  ".slide-in-hidden, .scale-in-hidden"
);

const observer = new IntersectionObserver(handleIntersecting, {
  threshold: 0.2,
});
// register observer to trigger animation when the element is visible
eltsToAnimate.forEach((elt) => observer.observe(elt));

function handleIntersecting(entries: IntersectionObserverEntry[]) {
  entries.forEach((entry: IntersectionObserverEntry) => {
    if (!entry.isIntersecting) return;

    const target = entry.target;

    if (isToFade(target)) {
      target.classList.replace("scale-in-hidden", "scale-in-shown");
    } else if (isToSlide(target)) {
      const slideDirection = target.classList.contains("slide-in-to-left")
        ? "left"
        : "right";
      target.classList.replace(
        "slide-in-hidden",
        `slide-in-to-${slideDirection}-shown`
      );
    }

    observer.unobserve(target); // unobserve the element once it's been animated
  });
}

function isToFade(elt: Element) {
  return elt.classList.contains("scale-in-hidden");
}
function isToSlide(elt: Element) {
  return elt.classList.contains("slide-in-hidden");
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
