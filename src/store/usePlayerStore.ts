import { create } from 'zustand';
import type { Player } from '../types/Player';

interface PlayerState {
  players: Player[]
  addPlayer: (player: Omit<Player, 'id'>) => void
  removePlayer: (id: string) => void
  updatePlayer: (id: string, data: Partial<Omit<Player, 'id'>>) => void
}

export const usePlayerStore = create<PlayerState>((set) => ({
  players: [],

  addPlayer: (player) =>
    set((state) => ({
      players: [...state.players, { ...player, id: crypto.randomUUID() }],
    })),

  removePlayer: (id) =>
    set((state) => ({
      players: state.players.filter((p) => p.id !== id),
    })),

  updatePlayer: (id, data) =>
    set((state) => ({
      players: state.players.map((p) =>
        p.id === id ? { ...p, ...data } : p
      ),
    })),
}))