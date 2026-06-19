import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { createPlayersSlice } from './slices/createPlayersSlice'
import { createFormationsSlice } from './slices/createFormationsSlice'
import type { AppState } from './types'

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (...args) => ({
        ...createPlayersSlice(...args),
        ...createFormationsSlice(...args),
      }),
      {
        name: 'zustand-fc:store',
      }
    ),
    {
      name: 'AppStore',
    }
  )
)