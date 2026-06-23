import { DndContext } from '@dnd-kit/core'
import type { DragEndEvent } from '@dnd-kit/core'
import { useAppStore } from '../store/useAppStore'
import { DraggablePlayer } from './DraggablePlayer'
import { DroppablePosition } from './DroppablePosition'

export function FormationField() {
  const formations = useAppStore((state) => state.formations)
  const activeFormationId = useAppStore((state) => state.activeFormationId)
  const setActiveFormation = useAppStore((state) => state.setActiveFormation)
  const assignPlayer = useAppStore((state) => state.assignPlayer)
  const unassignPlayer = useAppStore((state) => state.unassignPlayer)
  const players = useAppStore((state) => state.players)

  const activeFormation = formations.find((f) => f.id === activeFormationId)

  // IDs de jogadores já alocados em alguma posição da formação ativa
  const assignedPlayerIds = new Set(
    activeFormation?.positions.map((p) => p.playerId).filter(Boolean)
  )

  // Só mostra jogadores que ainda não estão em nenhuma posição
  const availablePlayers = players.filter((p) => !assignedPlayerIds.has(p.id))

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    // active = o jogador que foi arrastado
    // over = o slot onde ele foi solto (ou null se solto fora)
    if (!over || !activeFormation) return

    const playerId = active.id as string
    const positionId = over.id as string

    // Verifica se o slot já tem jogador — se sim, não faz nada
    const targetPosition = activeFormation.positions.find((p) => p.id === positionId)
    if (targetPosition?.playerId) return

    assignPlayer(activeFormation.id, positionId, playerId)
  }

  if (formations.length === 0) {
    return <p>Nenhuma formação criada ainda.</p>
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {/* Seletor de formação ativa */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
        {formations.map((f) => (
          <button
            key={f.id}
            onClick={() => setActiveFormation(f.id)}
            style={{
              padding: '0.3rem 0.8rem',
              background: f.id === activeFormationId ? '#6366f1' : '#374151',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            {f.name} ({f.type})
          </button>
        ))}
      </div>

      {activeFormation && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Campo */}
          <div
            style={{
              background: '#166534',
              borderRadius: '8px',
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
            }}
          >
            <h3 style={{ color: 'white', margin: '0 0 0.5rem', textAlign: 'center' }}>
              {activeFormation.name} — {activeFormation.type}
            </h3>

            {activeFormation.positions.map((pos) => {
              const player = players.find((p) => p.id === pos.playerId)
              return (
                <DroppablePosition
                  key={pos.id}
                  position={pos}
                  player={player}
                  formationId={activeFormation.id}
                  onUnassign={(positionId) => unassignPlayer(activeFormation.id, positionId)}
                />
              )
            })}
          </div>

          {/* Elenco disponível pra arrastar */}
          <div>
            <h4 style={{ margin: '0 0 0.5rem' }}>
              Jogadores disponíveis ({availablePlayers.length})
            </h4>
            {availablePlayers.length === 0 ? (
              <p style={{ color: '#9ca3af', fontSize: '0.85rem' }}>
                Todos os jogadores estão escalados.
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {availablePlayers.map((player) => (
                  <DraggablePlayer key={player.id} player={player} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </DndContext>
  )
}