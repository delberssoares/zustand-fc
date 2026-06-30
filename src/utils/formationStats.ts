import type { Formation } from '../store/slices/createFormationsSlice'
import type { Player } from '../types/Player'

export interface FormationStats {
  totalSlots: number
  filledSlots: number
  emptySlots: number
  isComplete: boolean
  averageRating: number | null // null se não tem ninguém escalado ainda
  weakestPosition: { label: string; rating: number } | null
}

export function calculateFormationStats(
  formation: Formation | undefined,
  players: Player[]
): FormationStats {
  if (!formation) {
    return {
      totalSlots: 0,
      filledSlots: 0,
      emptySlots: 0,
      isComplete: false,
      averageRating: null,
      weakestPosition: null,
    }
  }

  const totalSlots = formation.positions.length

  // Pega só as posições que têm jogador, já juntando com o rating de cada um
  const filledPositions = formation.positions
    .map((pos) => {
      const player = players.find((p) => p.id === pos.playerId)
      return player ? { label: pos.label, rating: player.rating } : null
    })
    .filter((p): p is { label: string; rating: number } => p !== null)

  const filledSlots = filledPositions.length
  const emptySlots = totalSlots - filledSlots

  const averageRating =
    filledSlots > 0
      ? filledPositions.reduce((sum, p) => sum + p.rating, 0) / filledSlots
      : null

  const weakestPosition =
    filledPositions.length > 0
      ? filledPositions.reduce((weakest, current) =>
          current.rating < weakest.rating ? current : weakest
        )
      : null

  return {
    totalSlots,
    filledSlots,
    emptySlots,
    isComplete: emptySlots === 0,
    averageRating,
    weakestPosition,
  }
}