"use client";

import { Header } from "@/app/components/header";

import { DrawnTypeView } from "./components/dranw-type-view";
import { DrawnCard } from "./components/drawn-card";
import { NoCardsLeft } from "./components/no-cards-left";
import { NoDateTypeSelected } from "./components/no-date-type-selected";
import { useCardGame } from "./use-card-game";

export default function App() {
  const {
    pickedCards,
    drawnCard,
    drawnType,
    showingDateType,
    stillHasCards,
    acceptCard,
    skipCard,
    sortNewDate,
    resetGame,
  } = useCardGame();

  return (
    <div className="max-w-7xl mx-auto h-screen flex flex-col">
      <Header />
      <div className="h-full flex flex-col gap-4 items-center justify-center text-sm">
        <div className="flex flex-col gap-4 items-center justify-center">
          <ul>
            {pickedCards.map((card) => (
              <li key={card.description}>{card.description}</li>
            ))}
          </ul>
          {drawnType && showingDateType ? (
            <DrawnTypeView type={drawnType} />
          ) : drawnCard ? (
            <>
              <DrawnCard
                key={drawnCard.description}
                card={drawnCard}
                onAccept={() => acceptCard(drawnCard)}
                onSkip={() => skipCard(drawnCard)}
              />
              {!stillHasCards && <NoCardsLeft resetCards={resetGame} />}
            </>
          ) : (
            <NoDateTypeSelected sortNewDate={sortNewDate} />
          )}
        </div>
      </div>
    </div>
  );
}
