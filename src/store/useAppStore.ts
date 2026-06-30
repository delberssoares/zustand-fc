import { create, useStore } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { temporal } from 'zundo'
import { createPlayersSlice } from './slices/createPlayersSlice'
import { createFormationsSlice } from './slices/createFormationsSlice'
import type { AppState } from './types'

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      temporal(
        (...args) => ({
          ...createPlayersSlice(...args),
          ...createFormationsSlice(...args),
        }),
        {
          partialize: (state) => ({ formations: state.formations }),
        }
      ),
      { name: 'zustand-fc:store' }
    ),
    { name: 'AppStore' }
  )
)

// Hook separado pra acessar o histórico temporal
export const useTemporalStore = <T>(
  selector: (state: ReturnType<typeof useAppStore.temporal.getState>) => T
) => useStore(useAppStore.temporal, selector)