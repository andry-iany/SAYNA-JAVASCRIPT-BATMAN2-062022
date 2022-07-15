import { hidePopup, isPopupCloseBtn } from "./app.js";
import QuizzState, { QuizzItem } from "./Quizz/index.js";

const url = "https://octopus-app-2u6og.ondigitalocean.app/questions/all";

getAllQuestionsAndAnswers(url)
  .then((quizzData) => {
    const gameWrapper = document.querySelector(
      ".section-game-wrapper"
    ) as HTMLElement;

    const gameTemplate = document.querySelector(
      "#game-template"
    ) as HTMLTemplateElement;

    if (!gameWrapper || !gameTemplate) return;

    const quizzState = new QuizzState(quizzData, gameWrapper, gameTemplate);

    window.addEventListener("click", (event: Event) => {
      const target = event.target as HTMLElement;

      if (!target) return;
      else if (isBtnStartQuizz(target)) {
        hidePopup();
        quizzState.start();
      } else if (isBtnNextQuizz(target)) {
        quizzState.accumulateResult();
        quizzState.showNextQuizz();
      } else if (isBtnShowResultQuizz(target)) {
        quizzState.accumulateResult();
        quizzState.showResultQuizz();
      } else if (isPopupCloseBtn(target)) {
        window.location.reload();
      }
    });
  })
  .catch((err) => {
    alert(`ERROR: ${err.message || "Une erreur s'est produite."}`);
  });

async function getAllQuestionsAndAnswers(url: string) {
  try {
    const res = await fetch(url);
    if (res.ok) return res.json() as Promise<QuizzItem[]>;
    throw new Error("Une erreur s'est produite.");
  } catch (err) {
    console.log("ERROR:", err);
    throw new Error("Une erreur s'est produite.");
  }
}

function isBtnStartQuizz(element: HTMLElement) {
  return element.id === "btn-start-quizz";
}
function isBtnNextQuizz(element: HTMLElement) {
  return element.id === "btn-next-quizz";
}
function isBtnShowResultQuizz(element: HTMLElement) {
  return element.id === "btn-result-quizz";
}
