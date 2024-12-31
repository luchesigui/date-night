import { useEffect, useState } from "react";

import { cards } from "./data/cards";
import { Card, CardStacks, CardType, DrawnType } from "./page.types";

const separateDeckInStacks = (cards: Card[]): CardStacks => {
  return cards.reduce((cards, card) => {
    if (!cards[card.type]) {
      cards[card.type] = [];
    }
    cards[card.type].push(card);
    return cards;
  }, {} as CardStacks);
};

const getRandomNumberUpTo = (max: number) => Math.floor(Math.random() * max);

const questionCardsPerDateByType = 1;
const typesOfQuestionCards = 2;

export function useCardGame() {
  const [pickedCards, setPickedCards] = useState<Card[]>([]);
  const [drawnCard, setDrawnCard] = useState<Card>();
  const [cardStacks, setCardStacks] = useState<CardStacks>(
    separateDeckInStacks(cards)
  );
  const [drawnType, setDrawnType] = useState<DrawnType>();
  const [showingDateType, setShowingDateType] = useState(false);
  const [stillHasCards, setStillHasCards] = useState(true);

  const drawCardFrom = (cards: Card[]) => {
    const indexToDraw = getRandomNumberUpTo(cards.length);
    return cards[indexToDraw];
  };

  const removeCardFromStack = (card: Card) => {
    const filteredStack = cardStacks[card.type].filter(
      (groupCard) => groupCard.id !== card.id
    );

    setCardStacks((cardStacks) => ({
      ...cardStacks,
      [card.type]: filteredStack,
    }));

    return filteredStack;
  };

  const resetGame = () => {
    setCardStacks(separateDeckInStacks(cards));
    setPickedCards([]);
    setDrawnCard(undefined);
    setDrawnType(undefined);
    setStillHasCards(true);
  };

  const acceptCard = (card: Card) => {
    removeCardFromStack(card);

    if (drawnType === DrawnType.CHALLANGE) {
      setPickedCards([card]);
      return;
    }

    setPickedCards((pickedCards) => [...pickedCards, card]);
    pickNextCard();
  };

  const skipCard = (card: Card) => {
    const filteredStack = removeCardFromStack(card);
    pickNextCard(filteredStack);
  };

  const getCardType = () => {
    if (drawnType === DrawnType.CHALLANGE) {
      return CardType.BOTH;
    }

    return pickedCards.length >= questionCardsPerDateByType
      ? CardType.OTHER
      : CardType.YOU;
  };

  const pickNextCard = (stack?: Card[]) => {
    const card = drawCardFrom(stack ?? cardStacks[getCardType()]);
    if (card) {
      setDrawnCard(card);
      return;
    }

    setStillHasCards(false);
  };

  const toggleShowingDateType = () => {
    setShowingDateType(true);

    setTimeout(() => {
      setShowingDateType(false);
    }, 1000);
  };

  const sortNewDate = () => {
    const types = [DrawnType.CHALLANGE, DrawnType.QUESTIONS];
    const drawnType = types[getRandomNumberUpTo(types.length)];
    setDrawnType(drawnType);
    toggleShowingDateType();
  };

  useEffect(() => {
    if (
      (drawnType === DrawnType.CHALLANGE && pickedCards.length >= 1) ||
      pickedCards.length === questionCardsPerDateByType * typesOfQuestionCards
    ) {
      router.push("/history");
    }

    if (drawnType) {
      pickNextCard();
    }
  }, [pickedCards, drawnType]);

  return {
    stillHasCards,
    pickedCards,
    drawnCard,
    drawnType,
    showingDateType,
    acceptCard,
    skipCard,
    sortNewDate,
    resetGame,
  };
}
