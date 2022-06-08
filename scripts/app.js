// ANIMATION
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

// CUSTOM SELECT
const select = document.querySelector("#select");

select.addEventListener("click", (event) => {
  const target = event.target;

  // visible option: refers to the option currently selected
  if (isVisibleOptionElement(target)) {
    showOrHideOptions();
  } else if (isOptionElement(target)) {
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
  return element?.classList.contains("select-option");
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
