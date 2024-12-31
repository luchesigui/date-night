"use client";

import { useState } from "react";

import { Header } from "@/app/components/header";

import { DrawnTypeView } from "./components/dranw-type-view";
import { DrawnCard } from "./components/drawn-card";
import { NoDateTypeSelected } from "./components/no-date-type-selected";
import {
  type Card,
  DateType,
  DrawnType,
  type GroupedCards,
} from "./page.types";

const cards: Card[] = [
  {
    type: DateType.YOU,
    description: "Pergunta sobre você 1",
  },
  {
    type: DateType.YOU,
    description: "Pergunta sobre você 2",
  },
  {
    type: DateType.YOU,
    description: "Pergunta sobre você 3",
  },
  {
    type: DateType.OTHER,
    description: "Pergunta sobre o outro 1",
  },
  {
    type: DateType.OTHER,
    description: "Pergunta sobre o outro 2",
  },
  {
    type: DateType.OTHER,
    description: "Pergunta sobre o outro 3",
  },
  {
    type: DateType.BOTH,
    description: "Vocês vão fazer alguma coisa",
  },
];

const defaultGroupedCards = cards.reduce((cards, card) => {
  if (!cards[card.type]) {
    cards[card.type] = [];
  }

  cards[card.type].push(card);
  return cards;
}, {} as GroupedCards);

export default function App() {
  const [pickedCards, setPickedCards] = useState<Card[]>([]);
  const [drawnCard, setDrawnCard] = useState<Card>();
  const [cardGroup, setCardGroup] = useState<GroupedCards>(defaultGroupedCards);
  const [drawnType, setDrawnType] = useState<DrawnType>();
  const [showingDateType, setShowingDateType] = useState(false);
  const animationDuration = 1000;

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

  const getRandomIndexFrom = (max: number) => {
    return Math.floor(Math.random() * max);
  };

  const drawCardFrom = (cards: Card[]) => {
    const indexToDraw = getRandomIndexFrom(cards.length);
    const newDate = cards[indexToDraw];
    return newDate;
  };

  const sortNewDate = () => {
    const types = [DrawnType.CHALLANGE, DrawnType.QUESTIONS];
    const randomIndex = getRandomIndexFrom(types.length);
    const drawnType = types[randomIndex];
    const cardsToDraw =
      cardGroup[
        drawnType === DrawnType.CHALLANGE ? DateType.BOTH : DateType.YOU
      ];

    const drawnCard = drawCardFrom(cardsToDraw);
    console.log({ cardsToDraw, drawnCard });
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
    }, animationDuration);
  };

  const removeCardFromGroup = (type: DateType, card: Card) => {
    const newGroup = cardGroup[type].filter(
      (groupCard) => groupCard.description !== card.description
    );

    setCardGroup({ ...cardGroup, [type]: newGroup });
  };

  const resetCards = () => {
    setCardGroup(defaultGroupedCards);
    setPickedCards([]);
    setDrawnCard(undefined);
    setDrawnType(undefined);
  };

  return (
    <div className="max-w-7xl mx-auto h-screen flex flex-col">
      <Header />
      <div className="h-full flex flex-col gap-4 items-center justify-center text-sm">
        <div className="flex flex-col gap-4 items-center justify-center">
          <ul>
            {pickedCards.map((card) => {
              return <li key={card.description}>{card.description}</li>;
            })}
          </ul>
          {drawnType && showingDateType ? (
            <DrawnTypeView type={drawnType} />
          ) : drawnCard ? (
            <DrawnCard
              key={drawnCard.description}
              card={drawnCard}
              onAccept={() => acceptCard(drawnCard)}
              onSkip={() => pickNextCard(pickedCards.length)}
            />
          ) : (
            <NoDateTypeSelected sortNewDate={sortNewDate} />
          )}
        </div>
      </div>
    </div>
  );
}
