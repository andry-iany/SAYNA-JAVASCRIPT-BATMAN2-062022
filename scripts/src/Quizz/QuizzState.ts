import Quizz from "./Quizz.js";
import { showPopup } from "../app.js";
import { ImageFactory } from "../images.js";
import { removeAllChildrenFromElement } from "../utils.js";
import { getMessageFromScore, QuizzItem } from "./QuizzUtils.js";

const getNextImage = ImageFactory();

export default class QuizzState {
  private quizz: Quizz;
  private quizzElementWrapper: HTMLElement;
  private quizzContentTemplate: HTMLTemplateElement;

  constructor(
    quizzData: QuizzItem[],
    quizzElementWrapper: HTMLElement,
    quizzContentTemplate: HTMLTemplateElement
  ) {
    this.quizz = new Quizz(quizzData);
    this.quizzElementWrapper = quizzElementWrapper;
    this.quizzContentTemplate = quizzContentTemplate;
  }

  start() {
    this.resetQuizzStateAndElement();
    // we want to create the skeleton of the quizz from template...
    this.buildQuizzSkeleton();
    // ...before populating it with data
    this.showNextQuizz();
  }

  resetQuizzStateAndElement() {
    removeAllChildrenFromElement(this.quizzElementWrapper);
    this.quizz.reset();
  }

  buildQuizzSkeleton() {
    const question = this.quizzContentTemplate.content.cloneNode(true);
    this.quizzElementWrapper.replaceChildren(question);
  }

  showNextQuizz() {
    // then move to the next question
    this.quizz.loadNextQuestion();
    // populate the quizz with new data
    this.buildQuizz();
    // make sure to display the top of the question
    this.quizzElementWrapper.scrollIntoView();
  }

  buildQuizz() {
    this.setCurrentQuestionNbr();
    this.setQuestion();
    this.setOptions();
    this.setImages();
    this.setBtn();
  }

  setCurrentQuestionNbr() {
    const currentQuestionElt =
      this.quizzElementWrapper.querySelector(".current");
    if (currentQuestionElt) {
      currentQuestionElt.textContent =
        this.quizz.currentQuestionIndex.toString();
    }

    const totalQuestionElt = this.quizzElementWrapper.querySelector(".total");
    if (totalQuestionElt) {
      totalQuestionElt.textContent = this.quizz.totalQuestionNbrs.toString();
    }
  }

  setQuestion() {
    const questionElt = this.quizzElementWrapper.querySelector(
      ".section-questions-question p"
    );
    if (questionElt) {
      questionElt.textContent = this.quizz.currentQuestion;
    }
  }

  setOptions() {
    const options = this.quizzElementWrapper.querySelector(
      ".section-questions-options"
    );
    if (!options) return;

    removeAllChildrenFromElement(options);

    for (let option of this.quizz.currentOptions) {
      options.appendChild(this.createAnswerOptionElt(option));
    }
  }

  createAnswerOptionElt(content: string) {
    const inputGroup = document.createElement("div");
    inputGroup.classList.add("input-group");

    const input = document.createElement("input");
    input.setAttribute("type", "checkbox");

    const label = document.createElement("label");
    label.textContent = content;

    inputGroup.append(input, label);

    return inputGroup;
  }

  setImages() {
    // clear all image elements...
    this.quizzElementWrapper
      .querySelectorAll<HTMLImageElement>(".img-wrapper img")
      .forEach((img) => img.removeAttribute("src"));

    // ...then insert the appropriate image src
    for (const imgSrc of getNextImage().images) {
      const imgElt = this.quizzElementWrapper.querySelector(
        `.img-${imgSrc.position} img`
      );
      imgElt?.setAttribute("src", imgSrc.src);
    }
  }

  setBtn() {
    const btn = this.quizzElementWrapper.querySelector("#btn-next-quizz");
    if (!btn) return;

    if (this.isLastQuestion()) {
      btn.textContent = "Voir le résultat";
      btn.setAttribute("id", "btn-result-quizz");
    } else {
      btn.textContent = "Question suivante";
      btn.setAttribute("id", "btn-next-quizz");
    }
  }

  isLastQuestion() {
    return this.quizz.currentQuestionIndex === this.quizz.totalQuestionNbrs;
  }

  accumulateResult() {
    const answers: string[] = [];

    const allInputGroups =
      this.quizzElementWrapper.querySelectorAll<HTMLElement>(".input-group");

    for (let inputGroup of allInputGroups) {
      const check = inputGroup.querySelector("input");
      const label = inputGroup.querySelector("label")?.textContent;
      if (!check || !label) return;
      if (check.checked) answers.push(label);
    }

    this.quizz.scoreIfAnswersCorrect(answers);
  }

  showResultQuizz() {
    this.buildPopup();
    showPopup();
  }

  buildPopup() {
    const popupText = getMessageFromScore(this.quizz);
    if (!popupText) return;

    const popupTitle = document.querySelector<HTMLElement>(".popup-title");
    if (popupTitle) {
      popupTitle.textContent = `${this.quizz.totalCorrectAnswers}/${this.quizz.totalQuestionNbrs} ${popupText.title}`;
    }

    const popupBody = document.querySelector<HTMLElement>(".popup-body");
    if (popupBody) {
      popupBody.textContent = popupText.body;
    }
  }
}
