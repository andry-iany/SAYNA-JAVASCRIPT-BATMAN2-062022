const eltsToAnimate = document.querySelectorAll("[data-animation='fade-in']");
const threshold = 1;
const observer = new IntersectionObserver(handleIntersecting);
eltsToAnimate.forEach((elt) => observer.observe(elt));

function handleIntersecting(entries) {
  entries.forEach(
    (entry) => {
      if (entry.isIntersecting) entry.target.classList.add("fade-in");
    },
    { root: null, threshold }
  );
}
