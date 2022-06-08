const eltsToAnimate = document.querySelectorAll(".fade-in-hidden");
const observer = new IntersectionObserver(handleIntersecting);

// register observer to trigger animation when the element is visible
eltsToAnimate.forEach((elt) => observer.observe(elt));

function handleIntersecting(entries) {
  entries.forEach(
    (entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.replace("fade-in-hidden", "fade-in-shown");
        observer.unobserve(entry.target); // unobserve the element once it's been animated
      }
    },
    { root: null }
  );
}
