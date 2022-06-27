export default class Quizz {
    constructor(quizzs) {
        this.quizzs = quizzs;
        // we want it to be zero-based index when used inside the instance, however we expose it one-based
        this._currentQuestionNbr = -1;
        // we want it to only be modifiable from inside the class instance
        this._totalCorrectAnswers = 0;
    }
    get currentQuestionNbr() {
        return this._currentQuestionNbr + 1;
    }
    get totalCorrectAnswers() {
        return this._totalCorrectAnswers;
    }
    get totalQuestionNbrs() {
        return this.quizzs.length;
    }
    get currentQuestionObj() {
        return this.quizzs[this._currentQuestionNbr];
    }
    /**
     * We need to invoke this method to get the next question, even for the first one
     */
    incrementQuestionNbr() {
        if (this.currentQuestionNbr !== this.totalQuestionNbrs)
            this._currentQuestionNbr += 1;
    }
    scoreAnswerIfCorrect(answer) {
        if (this.isCorrectAnswer(answer))
            this._totalCorrectAnswers += 1;
    }
    isCorrectAnswer(answer) {
        return (this.currentQuestionObj.options[this.currentQuestionObj.answer].toLowerCase() === answer.toLowerCase());
    }
}
