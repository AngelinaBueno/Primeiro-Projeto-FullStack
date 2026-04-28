import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [tarefas, setTarefas] = useState([])
  const [novoTitulo, setNovoTitulo] = useState('')

  useEffect(() => {
    fetch('http://127.0.0.1:8000/tarefas')
      .then(res => res.json())
      .then(dados => setTarefas(dados))
  }, [])

  function adicionarTarefa() {
    if (!novoTitulo) return

    fetch('http://127.0.0.1:8000/tarefas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ titulo: novoTitulo, feita: false })
    })
      .then(res => res.json())
      .then(nova => {
        setTarefas([...tarefas, nova])
        setNovoTitulo('')
      })
  }

  function toggleTarefa(id) {
    setTarefas(tarefas.map(t =>
      t.id === id ? { ...t, feita: !t.feita } : t
    ))
  }

  return (
    <div className="container">
      <h1>minhas tarefas ☆</h1>
      <div className="input-area">
        <input
          value={novoTitulo}
          onChange={e => setNovoTitulo(e.target.value)}
          placeholder="nova tarefa..."
        />
        <button onClick={adicionarTarefa}>+ add</button>
      </div>
      <ul>
        {tarefas.map(tarefa => (
          <li
            key={tarefa.id}
            onClick={() => toggleTarefa(tarefa.id)}
            className={tarefa.feita ? 'feita' : ''}
          >
            {tarefa.titulo}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App