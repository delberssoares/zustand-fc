import type { StateCreator } from 'zustand'
import type { AppState } from '../types'
import { fetchPlayers } from '../../mocks/playersApi'

export type ImportStatus = 'idle' | 'loading' | 'error'

export interface ImportSlice {
  importStatus: ImportStatus
  importError: string | null
  importPlayers: () => Promise<void>
}

export const createImportSlice: StateCreator<
  AppState,
  [['zustand/devtools', never]],
  [],
  ImportSlice
> = (set, get) => ({
  importStatus: 'idle',
  importError: null,

  importPlayers: async () => {
    // Evita disparar novo fetch se já está carregando
    if (get().importStatus === 'loading') return

    set({ importStatus: 'loading', importError: null }, false, 'import/start')

    try {
      const players = await fetchPlayers()

      // Adiciona cada jogador usando a action do PlayersSlice
      players.forEach((player) => get().addPlayer(player))

      set({ importStatus: 'idle' }, false, 'import/success')
    } catch (error) {
      set(
        {
          importStatus: 'error',
          importError: error instanceof Error ? error.message : 'Erro desconhecido',
        },
        false,
        'import/error'
      )
    }
  },
})