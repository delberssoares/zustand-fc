import { useAppStore } from '../store/useAppStore';

export function PlayerList() {
  const players = useAppStore((state) => state.players)
  const removePlayer = useAppStore((state) => state.removePlayer)

  if (players.length === 0) {
    return <p>Nenhum jogador cadastrado ainda.</p>
  }

  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {players.map((player) => (
        <li
          key={player.id}
          style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #333' }}
        >
          <span>
            <strong>{player.name}</strong> — {player.position} (⭐ {player.rating})
          </span>
          <button onClick={() => removePlayer(player.id)}>Remover</button>
        </li>
      ))}
    </ul>
  )
}