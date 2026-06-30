import type { Player } from '../types/Player'

const mockPlayers: Omit<Player, 'id'>[] = [
  { name: 'Pedri', position: 'Meio-campo', rating: 5 },
  { name: 'Harry Kane', position: 'Atacante', rating: 5 },
  { name: 'Courtois', position: 'Goleiro', rating: 5 },
  { name: 'Gabriel Magalhães', position: 'Zagueiro', rating: 4 },
  { name: 'Viktor Gyökeres', position: 'Atacante', rating: 4 },
  { name: 'Modric', position: 'Meio-campo', rating: 4 },
  { name: 'Pau Cubarsí', position: 'Zagueiro', rating: 3 },
]

// Simula delay de rede
export function fetchPlayers(): Promise<Omit<Player, 'id'>[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simula 20% de chance de erro, pra testar o estado de erro
      if (Math.random() < 0.2) {
        reject(new Error('Falha ao buscar jogadores. Tente novamente.'))
      } else {
        resolve(mockPlayers)
      }
    }, 1500) // 1.5 segundos de delay simulado
  })
}