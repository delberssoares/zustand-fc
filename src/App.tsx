import { useCounterStore } from './store/useCounterStore'

function App() {
  const count = useCounterStore((state) => state.count)
  const increment = useCounterStore((state) => state.increment)
  const decrement = useCounterStore((state) => state.decrement)
  const reset = useCounterStore((state) => state.reset)

  return (
    <div style={{ textAlign: 'center', marginTop: '4rem' }}>
      <h1>Zustand FC ⚽</h1>
      <p>Jogadores cadastrados: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  )
}

export default App