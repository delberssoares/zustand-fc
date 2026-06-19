import { PlayerForm } from './components/PlayerForm'
import { PlayerList } from './components/PlayerList'

function App() {
  return (
    <div style={{ maxWidth: 500, margin: '4rem auto', fontFamily: 'sans-serif' }}>
      <h1>Zustand FC ⚽</h1>
      <PlayerForm />
      <PlayerList />
    </div>
  )
}

export default App