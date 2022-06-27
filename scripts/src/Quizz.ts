type PositionY = "top" | "bottom";
type PositionX = "left" | "right" | "center";

export interface QuizzItem {
  question: string;
  options: string[];
  answer: number;
  images: {
    position: `${PositionY}-${PositionX}`;
    src: string;
  }[];
}

export default class Quizz {
  // we want it to be zero-based index when used inside the instance, however we expose it one-based
  private _currentQuestionNbr = -1;
  // we want it to only be modifiable from inside the class instance
  private _totalCorrectAnswers = 0;

  constructor(private quizzs: QuizzItem[]) {}

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
  scoreAnswerIfCorrect(answer: string) {
    if (this.isCorrectAnswer(answer)) this._totalCorrectAnswers += 1;
  }
  isCorrectAnswer(answer: string) {
    return (
      this.currentQuestionObj.options[
        this.currentQuestionObj.answer
      ].toLowerCase() === answer.toLowerCase()
    );
  }
}

export enum QuizzRank {
  BAD = "bad",
  GOOD = "good",
  BEST = "best",
}

export const quizzRanks = [QuizzRank.BAD, QuizzRank.GOOD, QuizzRank.BEST];

export const quizzMessages = [
  {
    rank: QuizzRank.BAD,
    title: "c'est pas tout à fait ça...",
    body: "Oulo! Heureusement que le Riddler est sous les verrous. Il faut que vous vous repassiez les films, cette fois en enlevant peut-être le masque qui vous a bloqué la vue ! Aller, rien est perdu !",
  },
  {
    rank: QuizzRank.GOOD,
    title: "Pas mal !",
    body: "Encore un peu d'entrainement avec le Chevalier Noir vous serait bénéfique, mais vous pouvez marcher la tête haute vos connaissances sont là. A vous de les consolider, foncez Gotham est votre terrain de chasse !",
  },
  {
    rank: QuizzRank.BEST,
    title: "Bravo !",
    body: "Vous êtes véritablement super fan de l'univers de Batman ! Comics, films, rien ne vous échappe. Bruce Wayne a de quoi être fier, Gotham est en paix et Batman peut prendre sa retraite, vous veillez aux grains !",
  },
];
