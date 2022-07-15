import Quizz from "./Quizz.js";

export interface QuizzResponse {
  text: string;
  isGood: boolean;
}

export interface QuizzItem {
  question: string;
  response: QuizzResponse[];
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

export function getMessageFromScore(quizz: Quizz) {
  let rank: QuizzRank;
  if (quizz.totalCorrectAnswers === quizz.totalQuestionNbrs) {
    rank = QuizzRank.BEST;
  } else if (quizz.totalCorrectAnswers >= quizz.totalQuestionNbrs * 0.6) {
    rank = QuizzRank.GOOD;
  } else {
    rank = QuizzRank.BAD;
  }

  return quizzMessages.find((qm) => qm.rank === rank);
}
