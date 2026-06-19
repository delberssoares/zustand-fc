import type { StateCreator } from 'zustand'
import type { AppState } from '../types'

export type FormationType = '4-4-2' | '4-3-3' | '3-4-3' | '2-3-1'

export interface Formation {
  id: string
  name: string
  type: FormationType
}

export interface FormationsSlice {
  formations: Formation[]
  addFormation: (formation: Omit<Formation, 'id'>) => void
  removeFormation: (id: string) => void
}

export const createFormationsSlice: StateCreator<
  AppState,
  [['zustand/devtools', never]],
  [],
  FormationsSlice
> = (set) => ({
  formations: [],

  addFormation: (formation) =>
    set(
      (state) => ({
        formations: [...state.formations, { ...formation, id: crypto.randomUUID() }],
      }),
      false,
      'formations/add'
    ),

  removeFormation: (id) =>
    set(
      (state) => ({
        formations: state.formations.filter((f) => f.id !== id),
      }),
      false,
      'formations/remove'
    ),
})