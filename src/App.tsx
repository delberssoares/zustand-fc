import { Header } from './components/Header'
import { PlayerForm } from './components/PlayerForm'
import { PlayerList } from './components/PlayerList'
import { FormationForm } from './components/FormationForm'
import { FormationField } from './components/FormationField'
import { ImportPlayersButton } from './components/ImportPlayersButton'

function App() {
  return (
    <div style={{ maxWidth: 640, margin: '0 auto', padding: '2rem 1rem' }}>
      <Header />

      <section>
        <h2>⚽ Elenco</h2>
        <ImportPlayersButton />
        <PlayerForm />
        <PlayerList />
      </section>

      <section>
        <h2>🗂 Escalação</h2>
        <FormationForm />
        <FormationField />
      </section>
    </div>
  )
}

export default App