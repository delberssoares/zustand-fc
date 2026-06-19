import type { StateCreator } from 'zustand'
import type { Player } from '../../types/Player'
import type { AppState } from '../types'

export interface PlayersSlice {
  players: Player[]
  addPlayer: (player: Omit<Player, 'id'>) => void
  removePlayer: (id: string) => void
  updatePlayer: (id: string, data: Partial<Omit<Player, 'id'>>) => void
}

export const createPlayersSlice: StateCreator<
  AppState,
  [['zustand/devtools', never]],
  [],
  PlayersSlice
> = (set) => ({
  players: [],

  addPlayer: (player) =>
    set(
      (state) => ({
        players: [...state.players, { ...player, id: crypto.randomUUID() }],
      }),
      false,
      'players/add'
    ),

  removePlayer: (id) =>
    set(
      (state) => ({
        players: state.players.filter((p) => p.id !== id),
      }),
      false,
      'players/remove'
    ),

  updatePlayer: (id, data) =>
    set(
      (state) => ({
        players: state.players.map((p) =>
          p.id === id ? { ...p, ...data } : p
        ),
      }),
      false,
      'players/update'
    ),
})