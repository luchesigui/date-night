import { Card, CardType } from "../page.types";

export const cards: Card[] = [
  {
    id: 1,
    type: CardType.YOU,
    description: "Pergunta sobre você 1",
  },
  {
    id: 2,
    type: CardType.YOU,
    description: "Pergunta sobre você 2",
  },
  {
    id: 3,
    type: CardType.YOU,
    description: "Pergunta sobre você 3",
  },
  {
    id: 4,
    type: CardType.OTHER,
    description: "Pergunta sobre o outro 1",
  },
  {
    id: 5,
    type: CardType.OTHER,
    description: "Pergunta sobre o outro 2",
  },
  {
    id: 6,
    type: CardType.OTHER,
    description: "Pergunta sobre o outro 3",
  },
  {
    id: 7,
    type: CardType.BOTH,
    description: "Vocês vão fazer alguma coisa",
  },
];
