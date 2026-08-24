import { PiggyBank } from 'lucide-react'

export function SimulationHero() {
  return (
    <div className="mb-8 text-center">
      <div className="flex flex-col items-center justify-center sm:flex-row">
        <h1 className="text-foreground text-3xl font-semibold sm:text-4xl">
          Vamos planejar seu futuro
        </h1>
        <PiggyBank
          aria-hidden="true"
          className="text-primary h-16 w-16 sm:mt-2 sm:ml-3"
        />
      </div>
      <p className="text-muted-foreground text-sm">
        Responda algumas questões para ter insights financeiros personalizados.
      </p>
    </div>
  )
}
