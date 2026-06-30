import { describe, it, expect } from 'vitest'
import { calculateFormationStats } from './formationStats'
import type { Formation } from '../store/slices/createFormationsSlice'
import type { Player } from '../types/Player'

// Dados de exemplo reutilizados nos testes
const mockPlayers: Player[] = [
  { id: 'p1', name: 'Falcão', position: 'Meio-campo', rating: 5 },
  { id: 'p2', name: 'Mancha', position: 'Atacante', rating: 4 },
  { id: 'p3', name: 'Lenísio', position: 'Goleiro', rating: 3 },
]

const mockFormation: Formation = {
  id: 'f1',
  name: 'Time A',
  type: '2-3-1',
  positions: [
    { id: 'pos1', label: 'Goleiro', position: 'Goleiro', playerId: 'p3' },
    { id: 'pos2', label: 'Zagueiro 1', position: 'Zagueiro', playerId: 'p1' },
    { id: 'pos3', label: 'Zagueiro 2', position: 'Zagueiro', playerId: null },
    { id: 'pos4', label: 'Meio 1', position: 'Meio-campo', playerId: null },
    { id: 'pos5', label: 'Meio 2', position: 'Meio-campo', playerId: null },
    { id: 'pos6', label: 'Meio 3', position: 'Meio-campo', playerId: null },
    { id: 'pos7', label: 'Atacante', position: 'Atacante', playerId: 'p2' },
  ],
}

describe('calculateFormationStats', () => {
  it('retorna zeros quando formation é undefined', () => {
    const stats = calculateFormationStats(undefined, mockPlayers)

    expect(stats.totalSlots).toBe(0)
    expect(stats.filledSlots).toBe(0)
    expect(stats.averageRating).toBeNull()
    expect(stats.isComplete).toBe(false)
  })

  it('conta corretamente slots preenchidos e vazios', () => {
    const stats = calculateFormationStats(mockFormation, mockPlayers)

    expect(stats.totalSlots).toBe(7)
    expect(stats.filledSlots).toBe(3) // p1, p2, p3
    expect(stats.emptySlots).toBe(4)  // 4 posições sem jogador
  })

  it('calcula a média de rating corretamente', () => {
    const stats = calculateFormationStats(mockFormation, mockPlayers)

    // (5 + 4 + 3) / 3 = 4.0
    expect(stats.averageRating).toBe(4)
  })

  it('identifica a posição mais fraca', () => {
    const stats = calculateFormationStats(mockFormation, mockPlayers)

    expect(stats.weakestPosition).not.toBeNull()
    expect(stats.weakestPosition?.label).toBe('Goleiro') // Lenísio, rating 3
    expect(stats.weakestPosition?.rating).toBe(3)
  })

  it('isComplete é false quando há posições vazias', () => {
    const stats = calculateFormationStats(mockFormation, mockPlayers)
    expect(stats.isComplete).toBe(false)
  })

  it('isComplete é true quando todas as posições estão preenchidas', () => {
    const fullFormation: Formation = {
      ...mockFormation,
      positions: mockFormation.positions.map((pos, i) => ({
        ...pos,
        playerId: mockPlayers[i % mockPlayers.length].id,
      })),
    }

    const stats = calculateFormationStats(fullFormation, mockPlayers)
    expect(stats.isComplete).toBe(true)
    expect(stats.emptySlots).toBe(0)
  })

  it('averageRating é null quando não há jogadores escalados', () => {
    const emptyFormation: Formation = {
      ...mockFormation,
      positions: mockFormation.positions.map((pos) => ({ ...pos, playerId: null })),
    }

    const stats = calculateFormationStats(emptyFormation, mockPlayers)
    expect(stats.averageRating).toBeNull()
  })
})