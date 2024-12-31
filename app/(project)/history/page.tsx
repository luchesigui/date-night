"use client";

import { cards } from "@/app/(project)/app/data/cards";
import { Header } from "@/app/components/header";

import { useState } from "react";
import { Card } from "../app/components/card";

const history = [
  {
    date: "2024-01-30",
    cards: [1, 4],
  },
  {
    date: "2024-01-21",
    cards: [7],
  },
  {
    date: "2024-01-14",
    cards: [2, 5],
  },
  {
    date: "2024-01-07",
    cards: [3, 6],
  },
];

const respostas = [
  {
    id: 1,
    cardId: 1,
    description: "Resposta dele sobre ele",
  },
  {
    id: 2,
    cardId: 1,
    description: "Resposta de você sobre você",
  },
  {
    id: 3,
    cardId: 4,
    description: "Resposta de você sobre ele",
  },
  {
    id: 4,
    cardId: 4,
    description: "Resposta dele sobre você",
  },
];

const getDateFromString = (date: string) => {
  const [year, month, day] = date.split("-").map(Number);
  return new Date(year, month - 1, day);
};

const getCardDetails = (cardId: number) => {
  return cards.find((card) => card.id === cardId);
};

const getRespostaDetails = (cardId?: number) => {
  if (cardId) {
    return respostas.filter((resposta) => resposta.cardId === cardId);
  }
};

export default function History() {
  const [activeCardId, setActiveCardId] = useState<number>();
  const [latestDate, ...otherDates] = history;
  const answersForActiveCard = getRespostaDetails(activeCardId);

  return (
    <div className="max-w-7xl mx-auto h-screen flex flex-col">
      <Header />
      <div className="container mx-auto">
        <h1>Histórico</h1>

        <div className="flex flex-col gap-4 mb-6">
          <h2>
            {getDateFromString(latestDate.date).toLocaleDateString("pt-BR")}
          </h2>
          <ul className="flex gap-4">
            {latestDate.cards.map((cardId, index) => (
              <Card
                key={index}
                onClick={() => {
                  setActiveCardId((activeCardId) =>
                    activeCardId !== cardId ? cardId : undefined
                  );
                }}
              >
                {getCardDetails(cardId)?.description}
              </Card>
            ))}
          </ul>

          {answersForActiveCard && (
            <ul>
              {answersForActiveCard.map((resposta) => (
                <li key={resposta.id}>{resposta.description}</li>
              ))}
            </ul>
          )}
        </div>

        <ul>
          {otherDates.map((date) => (
            <li
              key={date.date}
              className="bg-gray-100 rounded-lg p-4 hover:bg-gray-200 transition-colors cursor-pointer mb-2"
            >
              <p className="font-semibold text-gray-700">
                {getDateFromString(date.date).toLocaleDateString("pt-BR")}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
