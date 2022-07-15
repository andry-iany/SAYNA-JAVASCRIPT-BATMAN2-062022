import { QuizzItem } from "./QuizzUtils";

export default class Quizz {
  // we want it to be zero-based index when used inside the instance, however we expose it one-based
  private _currentQuestionIndex!: number;

  // we want it to only be modifiable from inside the class instance
  private _totalCorrectAnswers!: number;

  constructor(private quizzs: QuizzItem[]) {
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
    return this.quizzs[this._currentQuestionIndex].response.map(
      (resp) => resp.text
    );
  }

  get totalCorrectAnswers() {
    return this._totalCorrectAnswers;
  }

  get totalQuestionNbrs() {
    return this.quizzs.length;
  }

  private get currentResponses() {
    return this.quizzs[this._currentQuestionIndex].response;
  }

  /**
   * We need to invoke this method to get the next question, even for the first one
   */
  loadNextQuestion() {
    if (this.currentQuestionIndex !== this.totalQuestionNbrs)
      this._currentQuestionIndex += 1;
  }

  scoreIfAnswersCorrect(playerAnswers: string[]) {
    if (this.areAnswersCorrect(playerAnswers)) {
      this._totalCorrectAnswers += 1;
    }
  }

  areAnswersCorrect(playerAnswers: string[]) {
    const areCorrect = this.currentResponses.every((response) => {
      if (response.isGood) {
        // playerAnswers must include the response if its good
        return playerAnswers.some(
          (answer) => answer.toLowerCase() === response.text.toLowerCase()
        );
      } else {
        // playerAnswers must not include the response otherwise
        return playerAnswers.every(
          (answer) => answer.toLowerCase() !== response.text.toLowerCase()
        );
      }
    });

    return areCorrect;
  }
}
