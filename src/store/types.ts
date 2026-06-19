import type { PlayersSlice } from './slices/createPlayersSlice'
import type { FormationsSlice } from './slices/createFormationsSlice'

export type AppState = PlayersSlice & FormationsSlice