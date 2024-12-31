import { DrawnType } from "../page.types";

export const DrawnTypeView = ({ type }: { type: DrawnType }) => {
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
