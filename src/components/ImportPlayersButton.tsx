import { useAppStore } from '../store/useAppStore'

export function ImportPlayersButton() {
  const importPlayers = useAppStore((state) => state.importPlayers)
  const importStatus = useAppStore((state) => state.importStatus)
  const importError = useAppStore((state) => state.importError)

  return (
    <div style={{ marginBottom: '1rem' }}>
      <button
        onClick={importPlayers}
        disabled={importStatus === 'loading'}
        style={{
          padding: '0.4rem 1rem',
          background: importStatus === 'loading' ? '#1f2937' : '#6366f1',
          color: importStatus === 'loading' ? '#6b7280' : 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: importStatus === 'loading' ? 'not-allowed' : 'pointer',
        }}
      >
        {importStatus === 'loading' ? '⏳ Importando...' : '⬇️ Importar elenco'}
      </button>

      {importStatus === 'error' && (
        <p style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '0.4rem' }}>
          ❌ {importError}
        </p>
      )}

      {importStatus === 'idle' && importError === null && (
        <span style={{ color: '#9ca3af', fontSize: '0.8rem', marginLeft: '0.5rem' }}>
          Importa jogadores famosos
        </span>
      )}
    </div>
  )
}