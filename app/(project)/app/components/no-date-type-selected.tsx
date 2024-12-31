import { Button } from "@/app/components/ui/button";

export const NoDateTypeSelected = ({
  sortNewDate,
}: {
  sortNewDate: () => void;
}) => (
  <div>
    <h1 className="text-2xl font-bold mb-3">Sorteio de dates</h1>
    <Button onClick={sortNewDate}>Sortear</Button>
  </div>
);
