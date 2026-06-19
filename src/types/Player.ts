export type Position = 'Goleiro' | 'Zagueiro' | 'Meio-campo' | 'Atacante'

export interface Player {
  id: string
  name: string
  position: Position
  rating: number
}