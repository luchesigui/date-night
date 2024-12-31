import { Button } from "@/app/components/ui/button";

import { type Card } from "../page.types";
import { Card as CardComponent } from "./card";

export const DrawnCard = ({
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
      <CardComponent>{card.description}</CardComponent>
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
