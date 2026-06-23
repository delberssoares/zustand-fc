import { produce } from 'immer'
import type { StateCreator } from 'zustand'
import type { FieldPosition } from '../../types/Player'
import type { AppState } from '../types'

export type FormationType = '4-3-3' | '4-4-2' | '3-4-3' | '2-3-1'

export interface Formation {
  id: string
  name: string
  type: FormationType
  positions: FieldPosition[]
}

export interface FormationsSlice {
  formations: Formation[]
  activeFormationId: string | null
  addFormation: (name: string, type: FormationType) => void
  removeFormation: (id: string) => void
  setActiveFormation: (id: string) => void
  assignPlayer: (formationId: string, positionId: string, playerId: string) => void
  unassignPlayer: (formationId: string, positionId: string) => void
}

// Gera as posições do campo baseado na formação escolhida
function generatePositions(type: FormationType): FieldPosition[] {
  const layouts: Record<FormationType, Omit<FieldPosition, 'id'>[]> = {
    '4-3-3': [
      { label: 'Goleiro',    position: 'Goleiro',    playerId: null },
      { label: 'Zagueiro 1', position: 'Zagueiro',   playerId: null },
      { label: 'Zagueiro 2', position: 'Zagueiro',   playerId: null },
      { label: 'Zagueiro 3', position: 'Zagueiro',   playerId: null },
      { label: 'Zagueiro 4', position: 'Zagueiro',   playerId: null },
      { label: 'Meio 1',     position: 'Meio-campo', playerId: null },
      { label: 'Meio 2',     position: 'Meio-campo', playerId: null },
      { label: 'Meio 3',     position: 'Meio-campo', playerId: null },
      { label: 'Atacante 1', position: 'Atacante',   playerId: null },
      { label: 'Atacante 2', position: 'Atacante',   playerId: null },
      { label: 'Atacante 3', position: 'Atacante',   playerId: null },
    ],
    '4-4-2': [
      { label: 'Goleiro',    position: 'Goleiro',    playerId: null },
      { label: 'Zagueiro 1', position: 'Zagueiro',   playerId: null },
      { label: 'Zagueiro 2', position: 'Zagueiro',   playerId: null },
      { label: 'Zagueiro 3', position: 'Zagueiro',   playerId: null },
      { label: 'Zagueiro 4', position: 'Zagueiro',   playerId: null },
      { label: 'Meio 1',     position: 'Meio-campo', playerId: null },
      { label: 'Meio 2',     position: 'Meio-campo', playerId: null },
      { label: 'Meio 3',     position: 'Meio-campo', playerId: null },
      { label: 'Meio 4',     position: 'Meio-campo', playerId: null },
      { label: 'Atacante 1', position: 'Atacante',   playerId: null },
      { label: 'Atacante 2', position: 'Atacante',   playerId: null },
    ],
    '3-4-3': [
      { label: 'Goleiro',    position: 'Goleiro',    playerId: null },
      { label: 'Zagueiro 1', position: 'Zagueiro',   playerId: null },
      { label: 'Zagueiro 2', position: 'Zagueiro',   playerId: null },
      { label: 'Zagueiro 3', position: 'Zagueiro',   playerId: null },
      { label: 'Meio 1',     position: 'Meio-campo', playerId: null },
      { label: 'Meio 2',     position: 'Meio-campo', playerId: null },
      { label: 'Meio 3',     position: 'Meio-campo', playerId: null },
      { label: 'Meio 4',     position: 'Meio-campo', playerId: null },
      { label: 'Atacante 1', position: 'Atacante',   playerId: null },
      { label: 'Atacante 2', position: 'Atacante',   playerId: null },
      { label: 'Atacante 3', position: 'Atacante',   playerId: null },
    ],
    '2-3-1': [
      { label: 'Goleiro',    position: 'Goleiro',    playerId: null },
      { label: 'Zagueiro 1', position: 'Zagueiro',   playerId: null },
      { label: 'Zagueiro 2', position: 'Zagueiro',   playerId: null },
      { label: 'Meio 1',     position: 'Meio-campo', playerId: null },
      { label: 'Meio 2',     position: 'Meio-campo', playerId: null },
      { label: 'Meio 3',     position: 'Meio-campo', playerId: null },
      { label: 'Atacante',   position: 'Atacante',   playerId: null },
    ],
  }

  return layouts[type].map((p) => ({ ...p, id: crypto.randomUUID() }))
}

export const createFormationsSlice: StateCreator<
  AppState,
  [['zustand/devtools', never]],
  [],
  FormationsSlice
> = (set) => ({
  formations: [],
  activeFormationId: null,

  addFormation: (name, type) =>
    set(
      produce((state: AppState) => {
        const formation: Formation = {
          id: crypto.randomUUID(),
          name,
          type,
          positions: generatePositions(type),
        }
        state.formations.push(formation)
        if (!state.activeFormationId) {
          state.activeFormationId = formation.id
        }
      }),
      false,
      'formations/add'
    ),

  removeFormation: (id) =>
    set(
      produce((state: AppState) => {
        state.formations = state.formations.filter((f) => f.id !== id)
        if (state.activeFormationId === id) {
          state.activeFormationId = state.formations[0]?.id ?? null
        }
      }),
      false,
      'formations/remove'
    ),

  setActiveFormation: (id) =>
    set(
      produce((state: AppState) => {
        state.activeFormationId = id
      }),
      false,
      'formations/setActive'
    ),

  assignPlayer: (formationId, positionId, playerId) =>
    set(
      produce((state: AppState) => {
        const formation = state.formations.find((f) => f.id === formationId)
        const position = formation?.positions.find((p) => p.id === positionId)
        if (position) position.playerId = playerId
      }),
      false,
      'formations/assignPlayer'
    ),

  unassignPlayer: (formationId, positionId) =>
    set(
      produce((state: AppState) => {
        const formation = state.formations.find((f) => f.id === formationId)
        const position = formation?.positions.find((p) => p.id === positionId)
        if (position) position.playerId = null
      }),
      false,
      'formations/unassignPlayer'
    ),
})