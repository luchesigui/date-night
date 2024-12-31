import { useState } from "react";

import { cards } from "./data/cards";
import { Card, DateType, DrawnType, GroupedCards } from "./page.types";

const createDefaultGroupedCards = (cards: Card[]): GroupedCards => {
  return cards.reduce((cards, card) => {
    if (!cards[card.type]) {
      cards[card.type] = [];
    }
    cards[card.type].push(card);
    return cards;
  }, {} as GroupedCards);
};

export function useCardGame() {
  const [pickedCards, setPickedCards] = useState<Card[]>([]);
  const [drawnCard, setDrawnCard] = useState<Card>();
  const [cardGroup, setCardGroup] = useState<GroupedCards>(
    createDefaultGroupedCards(cards)
  );
  const [drawnType, setDrawnType] = useState<DrawnType>();
  const [showingDateType, setShowingDateType] = useState(false);

  const getRandomIndexFrom = (max: number) => Math.floor(Math.random() * max);

  const drawCardFrom = (cards: Card[]) => {
    const indexToDraw = getRandomIndexFrom(cards.length);
    return cards[indexToDraw];
  };

  const removeCardFromGroup = (type: DateType, card: Card) => {
    const newGroup = cardGroup[type].filter(
      (groupCard) => groupCard.description !== card.description
    );
    setCardGroup({ ...cardGroup, [type]: newGroup });
  };

  const resetCards = () => {
    setCardGroup(createDefaultGroupedCards(cards));
    setPickedCards([]);
    setDrawnCard(undefined);
    setDrawnType(undefined);
  };

  const acceptCard = (card: Card) => {
    if (drawnType === DrawnType.CHALLANGE) {
      resetCards();
      return;
    }

    const newPickedCards = [...pickedCards, card];
    setPickedCards(newPickedCards);
    pickNextCard(newPickedCards.length);
  };

  const pickNextCard = (totalPickedCards: number) => {
    if (drawnType === DrawnType.CHALLANGE || totalPickedCards >= 4) {
      resetCards();
      return;
    }

    const card = drawCardFrom(
      cardGroup[totalPickedCards >= 2 ? DateType.OTHER : DateType.YOU]
    );

    if (card) {
      removeCardFromGroup(card.type, card);
      setDrawnCard(card);
    }
  };

  const sortNewDate = () => {
    const types = [DrawnType.CHALLANGE, DrawnType.QUESTIONS];
    const drawnType = types[getRandomIndexFrom(types.length)];
    const cardsToDraw =
      cardGroup[
        drawnType === DrawnType.CHALLANGE ? DateType.BOTH : DateType.YOU
      ];

    const drawnCard = drawCardFrom(cardsToDraw);
    if (drawnCard) {
      removeCardFromGroup(drawnCard.type, drawnCard);
      delayedSetDrawnCard(drawnCard);
    }

    setDrawnType(drawnType);
  };

  const delayedSetDrawnCard = (card: Card) => {
    setShowingDateType(true);
    setTimeout(() => {
      setDrawnCard(card);
      setShowingDateType(false);
    }, 1000);
  };

  return {
    pickedCards,
    drawnCard,
    drawnType,
    showingDateType,
    acceptCard,
    pickNextCard,
    sortNewDate,
  };
}
