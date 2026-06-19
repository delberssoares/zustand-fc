# Anotações: Seletores e Re-renders no Zustand

## Ideia central

No Zustand, cada componente só re-renderiza se a parte do estado que ele
"escolheu" (seletor) mudar — **não** quando qualquer outra parte do store muda.

## Por que importa

Um store pode guardar várias informações (`players`, `formations`, `matches`...).
Se um componente só precisa de `players`, ele não deveria re-renderizar quando
algo em `formations` muda. Re-renderizar à toa = desperdício de performance.

## Os dois jeitos de pegar dados do store

**✅ Jeito certo — com seletor (campo específico):**
```typescript
const players = usePlayerStore((state) => state.players)
const removePlayer = usePlayerStore((state) => state.removePlayer)
```
Só re-renderiza quando `players` (ou `removePlayer`, que é estável) mudar.

**❌ Jeito problemático — sem seletor (store inteiro):**
```typescript
const { players, removePlayer } = usePlayerStore()
```
O componente fica "escutando" o store inteiro. Qualquer mudança em qualquer
parte do estado força esse componente a re-renderizar, mesmo que ele nem use
o que mudou.

## Regra prática

> Sempre que for usar algo do Zustand, pegue **campo por campo** com uma
> função seletora, em vez de desestruturar o store inteiro de uma vez.

## Observação

Esse efeito fica mais visível conforme o store cresce (mais fatias de estado:
jogadores, formações, partidas, etc.). Em um store pequeno o impacto é quase
imperceptível — o hábito é o que importa, não a otimização prematura.