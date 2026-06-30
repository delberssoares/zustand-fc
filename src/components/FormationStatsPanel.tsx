import { useMemo } from 'react'
import { useAppStore } from '../store/useAppStore'
import { calculateFormationStats } from '../utils/formationStats'

export function FormationStatsPanel() {
  const formations = useAppStore((state) => state.formations)
  const activeFormationId = useAppStore((state) => state.activeFormationId)
  const players = useAppStore((state) => state.players)

  const activeFormation = formations.find((f) => f.id === activeFormationId)

  // Só recalcula se a formação ativa ou a lista de jogadores mudar
  const stats = useMemo(
    () => calculateFormationStats(activeFormation, players),
    [activeFormation, players]
  )

  if (!activeFormation) return null

  return (
    <div
      style={{
        background: '#1f2937',
        borderRadius: '8px',
        padding: '0.8rem 1rem',
        marginBottom: '1rem',
        display: 'flex',
        gap: '1.5rem',
        flexWrap: 'wrap',
        fontSize: '0.85rem',
      }}
    >
      <div>
        <strong style={{ color: '#9ca3af' }}>Escalados:</strong>{' '}
        <span style={{ color: 'white' }}>
          {stats.filledSlots}/{stats.totalSlots}
        </span>
      </div>

      <div>
        <strong style={{ color: '#9ca3af' }}>Status:</strong>{' '}
        <span style={{ color: stats.isComplete ? '#10b981' : '#f59e0b' }}>
          {stats.isComplete ? 'Time completo ✅' : `Faltam ${stats.emptySlots}`}
        </span>
      </div>

      <div>
        <strong style={{ color: '#9ca3af' }}>Média:</strong>{' '}
        <span style={{ color: 'white' }}>
          {stats.averageRating ? `⭐ ${stats.averageRating.toFixed(1)}` : '—'}
        </span>
      </div>

      {stats.weakestPosition && (
        <div>
          <strong style={{ color: '#9ca3af' }}>Posição mais fraca:</strong>{' '}
          <span style={{ color: '#ef4444' }}>
            {stats.weakestPosition.label} (⭐ {stats.weakestPosition.rating})
          </span>
        </div>
      )}
    </div>
  )
}