"use client";

import { PropsWithChildren, useState } from "react";

import { Header } from "@/app/components/header";
import { Button } from "@/app/components/ui/button";

enum DateType {
  YOU = "you",
  OTHER = "other",
  BOTH = "both",
}

type Card = {
  type: DateType;
  description: string;
};

enum DrawnType {
  CHALLANGE = "challange",
  QUESTIONS = "questions",
}

type GroupedCards = Record<DateType, Card[]>;

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
            <div>
              <h1 className="text-2xl font-bold mb-3">Sorteio de dates</h1>
              <Button onClick={sortNewDate}>Sortear</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const DrawnTypeView = ({ type }: { type: DrawnType }) => {
  const getDrawnTypeText = () => {
    if (type === DrawnType.CHALLANGE) {
      return "Desafio!";
    }

    return "Sorteio de perguntas";
  };

  return (
    <div className="fixed top-0 left-0 h-screen w-screen flex items-center justify-center bg-black/50 text-white">
      <h2 className="text-6xl">{getDrawnTypeText()}</h2>
    </div>
  );
};

const DrawnCard = ({
  card,
  onSkip,
  onAccept,
}: {
  card: Card;
  onSkip: () => void;
  onAccept: () => void;
}) => {
  return (
    <div className="flex flex-col gap-2">
      <Card>{card.description}</Card>
      <div className="flex gap-2 items-center justify-center">
        <Button title="Pular essa carta" onClick={onSkip}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </Button>
        <Button title="Aceitar essa carta" onClick={onAccept}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </Button>
      </div>
    </div>
  );
};

const Card = ({ children }: PropsWithChildren) => {
  return (
    <div className="rounded-lg p-10 bg-base-200 w-[300px] h-[420px] flex flex-col items-center justify-center bg-[#eb3b5a] outline outline-white outline-[1px] outline-offset-[-20px] text-white text-center">
      {children}
    </div>
  );
};
