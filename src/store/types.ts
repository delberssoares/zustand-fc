import type { PlayersSlice } from './slices/createPlayersSlice'
import type { FormationsSlice } from './slices/createFormationsSlice'
import type { ImportSlice } from './slices/createImportSlice'

export type AppState = PlayersSlice & FormationsSlice & ImportSlice