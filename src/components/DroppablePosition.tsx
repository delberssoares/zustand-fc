import { useDroppable } from '@dnd-kit/core'
import type { FieldPosition, Player } from '../types/Player'

interface Props {
  position: FieldPosition
  player: Player | undefined
  formationId: string
  onUnassign: (positionId: string) => void
}

const positionColors: Record<string, string> = {
  'Goleiro': '#f59e0b',
  'Zagueiro': '#3b82f6',
  'Meio-campo': '#10b981',
  'Atacante': '#ef4444',
}

export function DroppablePosition({ position, player, formationId, onUnassign }: Props) {
  const { setNodeRef, isOver } = useDroppable({
    id: position.id,
    data: { positionId: position.id, formationId },
  })

  const color = positionColors[position.position] ?? '#6b7280'

  const style = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: isOver ? 'rgba(99,102,241,0.3)' : 'rgba(0,0,0,0.3)',
    borderRadius: '6px',
    padding: '0.4rem 0.8rem',
    borderLeft: `4px solid ${color}`,
    transition: 'background 0.15s',
    minHeight: '2.2rem',
  }

  return (
    <div ref={setNodeRef} style={style}>
      <span style={{ color: '#d1fae5', fontSize: '0.85rem', minWidth: '100px' }}>
        {position.label}
      </span>

      <span style={{ color: 'white', flex: 1, textAlign: 'center', fontSize: '0.85rem' }}>
        {player ? `${player.name} (⭐ ${player.rating})` : '— arraste um jogador —'}
      </span>

      {player && (
        <button
          onClick={() => onUnassign(position.id)}
          style={{
            background: 'transparent',
            border: '1px solid #ef4444',
            color: '#ef4444',
            borderRadius: '4px',
            cursor: 'pointer',
            padding: '0.2rem 0.5rem',
            fontSize: '0.75rem',
          }}
        >
          remover
        </button>
      )}
    </div>
  )
}