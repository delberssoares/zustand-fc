import { useState } from 'react'
import { useAppStore } from '../store/useAppStore';
import type { Position } from '../types/Player'

const positions: Position[] = ['Goleiro', 'Zagueiro', 'Meio-campo', 'Atacante']

export function PlayerForm() {
  const addPlayer = useAppStore((state) => state.addPlayer)

  const [name, setName] = useState('')
  const [position, setPosition] = useState<Position>('Atacante')
  const [rating, setRating] = useState(3)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) return

    addPlayer({ name, position, rating })
    setName('')
    setRating(3)
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
      <input
        placeholder="Nome do jogador"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <select value={position} onChange={(e) => setPosition(e.target.value as Position)}>
        {positions.map((pos) => (
          <option key={pos} value={pos}>{pos}</option>
        ))}
      </select>

      <input
        type="number"
        min={0}
        max={5}
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        style={{ width: '4rem' }}
      />

      <button type="submit">Adicionar</button>
    </form>
  )
}