import { useState } from 'react'
import { useAppStore } from '../store/useAppStore'
import type { FormationType } from '../store/slices/createFormationsSlice'

const formationTypes: FormationType[] = ['4-3-3', '4-4-2', '3-4-3', '2-3-1']

export function FormationForm() {
  const addFormation = useAppStore((state) => state.addFormation)
  const [name, setName] = useState('')
  const [type, setType] = useState<FormationType>('4-3-3')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) return
    addFormation(name, type)
    setName('')
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
      <input
        placeholder="Nome da formação (ex: Time A)"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ flex: 1 }}
      />
      <select value={type} onChange={(e) => setType(e.target.value as FormationType)}>
        {formationTypes.map((t) => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>
      <button type="submit">Criar formação</button>
    </form>
  )
}