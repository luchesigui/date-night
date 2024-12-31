import { Button } from '@/app/components/ui/button'

export const NoCardsLeft = ({ resetCards }: { resetCards: () => void }) => (
  <div className="flex flex-col gap-4 items-center justify-center">
    <p>
      Acabaram as cartas. Gostaria de sortear começar de novo?
    </p>
    <Button onClick={resetCards}>Sortear novo</Button>
  </div>
)
