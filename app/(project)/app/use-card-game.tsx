import { useEffect, useState } from "react";

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
  const [stillHasCards, setStillHasCards] = useState(true);

  const getRandomIndexFrom = (max: number) => Math.floor(Math.random() * max);

  const drawCardFrom = (cards: Card[]) => {
    const indexToDraw = getRandomIndexFrom(cards.length);
    return cards[indexToDraw];
  };

  const removeCardFromGroup = (card: Card) => {
    const newGroup = cardGroup[card.type].filter(
      (groupCard) => groupCard.description !== card.description
    );
    setCardGroup({ ...cardGroup, [card.type]: newGroup });
  };

  const resetCards = () => {
    setCardGroup(createDefaultGroupedCards(cards));
    setPickedCards([]);
    setDrawnCard(undefined);
    setDrawnType(undefined);
  };

  const acceptCard = (card: Card) => {
    if (drawnType === DrawnType.CHALLANGE) {
      removeCardFromGroup(card);
      return;
    }

    const newPickedCards = [...pickedCards, card];
    setPickedCards(newPickedCards);
    pickNextCard(newPickedCards.length);
  };

  const skipCard = (card: Card) => {
    removeCardFromGroup(card);
    pickNextCard(pickedCards.length);
  }

  const pickNextCard = (totalPickedCards: number) => {
    const isChallange = drawnType === DrawnType.CHALLANGE
    if (isChallange && totalPickedCards === 1 || totalPickedCards >= 4) {
      resetCards();
      return;
    }

    const card = drawCardFrom(
      cardGroup[isChallange ? DateType.BOTH : totalPickedCards >= 2 ? DateType.OTHER : DateType.YOU]
    );

    if (card) {
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

  useEffect(() => {
    if(drawnType === DrawnType.CHALLANGE) {
      setStillHasCards(cardGroup[DateType.BOTH].length > 0)  
      return
    }

    if(pickedCards.length < 2) {
      setStillHasCards(cardGroup[DateType.YOU].length > 0)  
      return
    }

    setStillHasCards(cardGroup[DateType.OTHER].length > 0)  
  }, [cardGroup, pickedCards, drawnType]);

  return {
    stillHasCards,
    pickedCards,
    drawnCard,
    drawnType,
    showingDateType,
    acceptCard,
    skipCard,
    sortNewDate,
    resetCards
  };
}
