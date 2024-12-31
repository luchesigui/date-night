export enum DateType {
  YOU = "you",
  OTHER = "other",
  BOTH = "both",
}

export enum DrawnType {
  CHALLANGE = "challange",
  QUESTIONS = "questions",
}

export type Card = {
  type: DateType;
  description: string;
};

export type GroupedCards = Record<DateType, Card[]>;
