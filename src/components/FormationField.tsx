import { useAppStore } from '../store/useAppStore'

const positionColors: Record<string, string> = {
  'Goleiro': '#f59e0b',
  'Zagueiro': '#3b82f6',
  'Meio-campo': '#10b981',
  'Atacante': '#ef4444',
}

export function FormationField() {
  const formations = useAppStore((state) => state.formations)
  const activeFormationId = useAppStore((state) => state.activeFormationId)
  const setActiveFormation = useAppStore((state) => state.setActiveFormation)
  const unassignPlayer = useAppStore((state) => state.unassignPlayer)
  const players = useAppStore((state) => state.players)

  const activeFormation = formations.find((f) => f.id === activeFormationId)

  if (formations.length === 0) {
    return <p>Nenhuma formação criada ainda.</p>
  }

  return (
    <div>
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

      {/* Campo */}
      {activeFormation && (
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
            const color = positionColors[pos.position] ?? '#6b7280'

            return (
              <div
                key={pos.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: 'rgba(0,0,0,0.3)',
                  borderRadius: '6px',
                  padding: '0.4rem 0.8rem',
                  borderLeft: `4px solid ${color}`,
                }}
              >
                <span style={{ color: '#d1fae5', fontSize: '0.85rem', minWidth: '100px' }}>
                  {pos.label}
                </span>

                <span style={{ color: 'white', flex: 1, textAlign: 'center' }}>
                  {player ? `${player.name} (⭐ ${player.rating})` : '— vazio —'}
                </span>

                {player && (
                  <button
                    onClick={() => unassignPlayer(activeFormation.id, pos.id)}
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
          })}
        </div>
      )}
    </div>
  )
}