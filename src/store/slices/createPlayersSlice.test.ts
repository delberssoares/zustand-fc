import { describe, it, expect, beforeEach } from 'vitest'
import { create } from 'zustand'
import { createPlayersSlice } from './createPlayersSlice'
import type { PlayersSlice } from './createPlayersSlice'
import type { StateCreator } from 'zustand'

const createTestStore = () =>
  create<PlayersSlice>()(
    createPlayersSlice as StateCreator<PlayersSlice>
  )

describe('createPlayersSlice', () => {
  let useStore: ReturnType<typeof createTestStore>

  beforeEach(() => {
    useStore = createTestStore()
  })

  it('começa com lista de jogadores vazia', () => {
    const { players } = useStore.getState()
    expect(players).toHaveLength(0)
  })

  it('addPlayer adiciona jogador com id gerado automaticamente', () => {
    const { addPlayer } = useStore.getState()
    addPlayer({ name: 'Falcão', position: 'Meio-campo', rating: 5 })

    const { players } = useStore.getState()
    expect(players).toHaveLength(1)
    expect(players[0].name).toBe('Falcão')
    expect(players[0].id).toBeDefined()
  })

  it('addPlayer adiciona múltiplos jogadores', () => {
    const { addPlayer } = useStore.getState()
    addPlayer({ name: 'Falcão', position: 'Meio-campo', rating: 5 })
    addPlayer({ name: 'Mancha', position: 'Atacante', rating: 4 })

    const { players } = useStore.getState()
    expect(players).toHaveLength(2)
  })

  it('removePlayer remove o jogador correto', () => {
    const { addPlayer } = useStore.getState()
    addPlayer({ name: 'Falcão', position: 'Meio-campo', rating: 5 })
    addPlayer({ name: 'Mancha', position: 'Atacante', rating: 4 })

    const { players, removePlayer } = useStore.getState()
    removePlayer(players[0].id)

    const updated = useStore.getState().players
    expect(updated).toHaveLength(1)
    expect(updated[0].name).toBe('Mancha')
  })

  it('updatePlayer atualiza só os campos informados', () => {
    const { addPlayer } = useStore.getState()
    addPlayer({ name: 'Falcão', position: 'Meio-campo', rating: 5 })

    const { players, updatePlayer } = useStore.getState()
    updatePlayer(players[0].id, { rating: 3 })

    const updated = useStore.getState().players[0]
    expect(updated.rating).toBe(3)
    expect(updated.name).toBe('Falcão')
    expect(updated.position).toBe('Meio-campo')
  })

  it('cada jogador tem id único', () => {
    const { addPlayer } = useStore.getState()
    addPlayer({ name: 'Falcão', position: 'Meio-campo', rating: 5 })
    addPlayer({ name: 'Mancha', position: 'Atacante', rating: 4 })

    const { players } = useStore.getState()
    expect(players[0].id).not.toBe(players[1].id)
  })
})