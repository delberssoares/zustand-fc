import { useAppStore } from '../store/useAppStore'

export function Header() {
  const players = useAppStore((state) => state.players)
  const formations = useAppStore((state) => state.formations)

  return (
    <header style={{ marginBottom: '2rem' }}>
      <h1>Zustand FC ⚽</h1>
      <small style={{ color: '#9ca3af' }}>
        {players.length} jogadores no elenco · {formations.length} formações criadas
      </small>
    </header>
  )
}