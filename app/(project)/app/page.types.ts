export enum CardType {
  YOU = "you",
  OTHER = "other",
  BOTH = "both",
}

export enum DrawnType {
  CHALLANGE = "challange",
  QUESTIONS = "questions",
}

export type Card = {
  id: number;
  type: CardType;
  description: string;
};

export type CardStacks = Record<CardType, Card[]>;
