import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import type { Player } from '../types/Player'

interface Props {
  player: Player
}

export function DraggablePlayer({ player }: Props) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: player.id,
    data: { player }, // dados disponíveis no onDragEnd
  })

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.4 : 1,
    cursor: 'grab',
    padding: '0.4rem 0.8rem',
    background: '#1f2937',
    border: '1px solid #374151',
    borderRadius: '6px',
    color: 'white',
    fontSize: '0.85rem',
  }

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <strong>{player.name}</strong> — {player.position} (⭐ {player.rating})
    </div>
  )
}