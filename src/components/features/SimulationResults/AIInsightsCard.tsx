import 'react-loading-skeleton/dist/skeleton.css'

import Skeleton from 'react-loading-skeleton'

import { Content } from '@/components/features/Insights/Content'
import { Error as InsightError } from '@/components/features/Insights/Error'
import { useInsight } from '@/hooks/useInsight'

interface AIInsightCardProps {
  simulationId: string
}

export function AIInsightsCard({ simulationId }: AIInsightCardProps) {
  const { insight, isLoading, error, fetchInsight } = useInsight(simulationId)

  return (
    <div
      className="bg-card order-2 rounded-2xl p-6 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)] lg:order-1 lg:col-span-2"
      aria-busy={isLoading}
    >
      <div className="mb-3 flex items-center gap-1.5">
        <span>✨</span>
        <span className="text-primary text-xs font-semibold tracking-widest uppercase">
          Insight Financeiro Personalizado
        </span>
      </div>
      {isLoading && (
        <div className="flex flex-col">
          <Skeleton
            count={10}
            baseColor="var(--skeleton-base-color)"
            highlightColor="var(--skeleton-highlight-color)"
            className="mb-3 flex rounded-lg"
            containerClassName="flex-1"
            inline
          />
        </div>
      )}
      {!isLoading && error && (
        <InsightError
          simulationId={simulationId}
          message={error}
          onRetry={() => void fetchInsight(simulationId)}
        />
      )}
      {!isLoading && !error && insight && <Content insight={insight} />}
    </div>
  )
}
