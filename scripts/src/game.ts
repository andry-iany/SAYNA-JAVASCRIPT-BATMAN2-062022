import "./app.js";
import { quizz as quizzData } from "./data.js";
import Quizz from "./Quizz.js";

// ******************************
// TODO: refactor this later
const quizz = new Quizz(quizzData);
// ******************************

// script for the game page
const sectionGame = document.querySelector<HTMLElement>("#section-game");
sectionGame?.addEventListener("click", (event: Event) => {
  const target = event.target as HTMLElement;

  if (!target) return;
  else if (isBtnStartQuizz(target)) {
    startQuizz();
  } else if (isBtnNextQuizz(target)) {
    accumulateResult();
    showNextQuizz();
  } else if (isBtnShowResultQuizz(target)) {
    accumulateResult();
    showResultQuizz();
  }
});

function isBtnStartQuizz(element: HTMLElement) {
  return element.id === "btn-start-quizz";
}
function isBtnNextQuizz(element: HTMLElement) {
  return element.id === "btn-next-quizz";
}
function isBtnShowResultQuizz(element: HTMLElement) {
  return element.id === "btn-result-quizz";
}

function startQuizz() {
  // we want to create the skeleton of the quizz from template...
  buildQuizzSkeleton();
  // ...before populating it with data
  showNextQuizz();
}

function buildQuizzSkeleton() {
  const gameTemplate =
    document.querySelector<HTMLTemplateElement>("#game-template");
  const gameWrapper = document.querySelector<HTMLElement>(
    ".section-game-wrapper"
  );
  if (!gameTemplate || !gameWrapper) return;

  const question = gameTemplate.content.cloneNode(true);
  gameWrapper.replaceChildren(question);
}

function showNextQuizz() {
  const gameWrapper = document.querySelector<HTMLElement>(
    ".section-game-wrapper"
  );
  if (!gameWrapper) return;

  // then move to the next question
  quizz.incrementQuestionNbr();

  // populate the quizz with new data
  buildQuizz(gameWrapper, quizz);

  // make sure to display the top of the question
  gameWrapper.scrollIntoView();
}

function buildQuizz(gameWrapper: HTMLElement, quizzData: Quizz) {
  setCurrentQuestionNbr(gameWrapper, quizzData);
  setQuestion(gameWrapper, quizzData);
  setOptions(gameWrapper, quizzData);
  setImages(gameWrapper, quizzData);
  setBtn(gameWrapper, quizzData);
}

function setCurrentQuestionNbr(gameWrapper: HTMLElement, quizzData: Quizz) {
  const currentQuestionElt = gameWrapper.querySelector(".current");
  if (currentQuestionElt) {
    currentQuestionElt.textContent = quizzData.currentQuestionNbr.toString();
  }

  const totalQuestionElt = gameWrapper.querySelector(".total");
  if (totalQuestionElt) {
    totalQuestionElt.textContent = quizzData.totalQuestionNbrs + "";
  }
}

function setQuestion(gameWrapper: HTMLElement, quizzData: Quizz) {
  const questionElt = gameWrapper.querySelector(
    ".section-questions-question p"
  );
  if (questionElt) {
    questionElt.textContent = quizzData.currentQuestionObj.question;
  }
}

function setOptions(gameWrapper: HTMLElement, quizzData: Quizz) {
  const options = gameWrapper.querySelector(".section-questions-options");
  if (!options) return;

  removeAllChildrenFromElement(options);

  for (let option of quizzData.currentQuestionObj.options) {
    options.appendChild(createAnswerOptionElt(option));
  }
}

function removeAllChildrenFromElement(elt: Element) {
  elt.innerHTML = "";
}

function createAnswerOptionElt(content: string) {
  const inputGroup = document.createElement("div");
  inputGroup.classList.add("input-group");

  const input = document.createElement("input");
  input.setAttribute("type", "checkbox");

  const label = document.createElement("label");
  label.textContent = content;

  inputGroup.append(input, label);

  return inputGroup;
}

function setImages(gameWrapper: HTMLElement, quizzData: Quizz) {
  // clear all image elements...
  gameWrapper
    .querySelectorAll<HTMLImageElement>(".img-wrapper img")
    .forEach((img) => img.removeAttribute("src"));

  // ...then insert the appropriate image src
  quizzData.currentQuestionObj.images.forEach((image) => {
    const imgElt = gameWrapper.querySelector(`.img-${image.position} img`);
    imgElt?.setAttribute("src", image.src);
  });
}

function setBtn(gameWrapper: HTMLElement, quizzData: Quizz) {
  const btn = gameWrapper.querySelector("#btn-next-quizz");
  if (!btn) return;

  if (quizzData.currentQuestionNbr === quizzData.totalQuestionNbrs) {
    btn.textContent = "Voir le résultat";
    btn.setAttribute("id", "btn-result-quizz");
  } else {
    btn.textContent = "Question suivante";
    btn.setAttribute("id", "btn-next-quizz");
  }
}

function accumulateResult() {
  const inputGroups = document.querySelectorAll<HTMLElement>(
    ".section-game-wrapper .input-group"
  );
  for (let input of inputGroups) {
    const checkbox = input.querySelector<HTMLInputElement>("input");
    if (checkbox?.checked) {
      const answer = input.querySelector<HTMLElement>("label")?.textContent;
      quizz.scoreAnswerIfCorrect(answer + "");
    }
  }
}

function showResultQuizz() {
  alert(`You got ${quizz.totalCorrectAnswers} correct answers.`);
}
