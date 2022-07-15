export default class Quizz {
    constructor(quizzs) {
        this.quizzs = quizzs;
        this.reset();
    }
    reset() {
        this._currentQuestionIndex = -1;
        this._totalCorrectAnswers = 0;
    }
    get currentQuestionIndex() {
        return this._currentQuestionIndex + 1;
    }
    get currentQuestion() {
        return this.quizzs[this._currentQuestionIndex].question;
    }
    get currentOptions() {
        return this.quizzs[this._currentQuestionIndex].response.map((resp) => resp.text);
    }
    get totalCorrectAnswers() {
        return this._totalCorrectAnswers;
    }
    get totalQuestionNbrs() {
        return this.quizzs.length;
    }
    get currentResponses() {
        return this.quizzs[this._currentQuestionIndex].response;
    }
    /**
     * We need to invoke this method to get the next question, even for the first one
     */
    loadNextQuestion() {
        if (this.currentQuestionIndex !== this.totalQuestionNbrs)
            this._currentQuestionIndex += 1;
    }
    scoreIfAnswersCorrect(playerAnswers) {
        if (this.areAnswersCorrect(playerAnswers)) {
            this._totalCorrectAnswers += 1;
        }
    }
    areAnswersCorrect(playerAnswers) {
        const areCorrect = this.currentResponses.every((response) => {
            if (response.isGood) {
                // playerAnswers must include the response if its good
                return playerAnswers.some((answer) => answer.toLowerCase() === response.text.toLowerCase());
            }
            else {
                // playerAnswers must not include the response otherwise
                return playerAnswers.every((answer) => answer.toLowerCase() !== response.text.toLowerCase());
            }
        });
        return areCorrect;
    }
}
