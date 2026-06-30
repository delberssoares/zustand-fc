import { Header } from './components/Header'
import { PlayerForm } from './components/PlayerForm'
import { PlayerList } from './components/PlayerList'
import { FormationForm } from './components/FormationForm'
import { FormationField } from './components/FormationField'
import { ImportPlayersButton } from './components/ImportPlayersButton'

function App() {
  return (
    <div style={{ maxWidth: 600, margin: '4rem auto', fontFamily: 'sans-serif' }}>
      <Header />

      <section style={{ marginBottom: '2rem' }}>
        <h2>Elenco</h2>
        <ImportPlayersButton />
        <PlayerForm />
        <PlayerList />
      </section>

      <section>
        <h2>Escalação</h2>
        <FormationForm />
        <FormationField />
      </section>
    </div>
  )
}

export default App