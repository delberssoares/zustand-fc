import { useTemporalStore } from '../store/useAppStore'

export function UndoRedoControls() {
  const { undo, redo, pastStates, futureStates } = useTemporalStore((state) => state)

  const canUndo = pastStates.length > 0
  const canRedo = futureStates.length > 0

  return (
    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
      <button
        onClick={() => undo()}
        disabled={!canUndo}
        style={{
          padding: '0.3rem 0.8rem',
          background: canUndo ? '#374151' : '#1f2937',
          color: canUndo ? 'white' : '#4b5563',
          border: 'none',
          borderRadius: '4px',
          cursor: canUndo ? 'pointer' : 'not-allowed',
        }}
      >
        ↩ Desfazer ({pastStates.length})
      </button>

      <button
        onClick={() => redo()}
        disabled={!canRedo}
        style={{
          padding: '0.3rem 0.8rem',
          background: canRedo ? '#374151' : '#1f2937',
          color: canRedo ? 'white' : '#4b5563',
          border: 'none',
          borderRadius: '4px',
          cursor: canRedo ? 'pointer' : 'not-allowed',
        }}
      >
        ↪ Refazer ({futureStates.length})
      </button>
    </div>
  )
}