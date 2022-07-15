var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { hidePopup, isPopupCloseBtn } from "./app.js";
import QuizzState from "./Quizz/index.js";
const url = "https://octopus-app-2u6og.ondigitalocean.app/questions/all";
getAllQuestionsAndAnswers(url)
    .then((quizzData) => {
    const gameWrapper = document.querySelector(".section-game-wrapper");
    const gameTemplate = document.querySelector("#game-template");
    if (!gameWrapper || !gameTemplate)
        return;
    const quizzState = new QuizzState(quizzData, gameWrapper, gameTemplate);
    window.addEventListener("click", (event) => {
        const target = event.target;
        if (!target)
            return;
        else if (isBtnStartQuizz(target)) {
            hidePopup();
            quizzState.start();
        }
        else if (isBtnNextQuizz(target)) {
            quizzState.accumulateResult();
            quizzState.showNextQuizz();
        }
        else if (isBtnShowResultQuizz(target)) {
            quizzState.accumulateResult();
            quizzState.showResultQuizz();
        }
        else if (isPopupCloseBtn(target)) {
            window.location.reload();
        }
    });
})
    .catch((err) => {
    alert(`ERROR: ${err.message || "Une erreur s'est produite."}`);
});
function getAllQuestionsAndAnswers(url) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield fetch(url);
            if (res.ok)
                return res.json();
            throw new Error("Une erreur s'est produite.");
        }
        catch (err) {
            console.log("ERROR:", err);
            throw new Error("Une erreur s'est produite.");
        }
    });
}
function isBtnStartQuizz(element) {
    return element.id === "btn-start-quizz";
}
function isBtnNextQuizz(element) {
    return element.id === "btn-next-quizz";
}
function isBtnShowResultQuizz(element) {
    return element.id === "btn-result-quizz";
}
