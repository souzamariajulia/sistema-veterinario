import React, { useState } from 'react';
import axios from 'axios';
import './AnimalForm.css'; // Importa o arquivo CSS

function AnimalForm({ fetchAnimais }) {
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/api/animais', { nome, idade });
      fetchAnimais();
      setNome('');
      setIdade('');
      setError('');
    } catch (err) {
      setError('Erro ao adicionar animal');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        type="text"
        placeholder="Nome do animal"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Idade do animal"
        value={idade}
        onChange={(e) => setIdade(e.target.value)}
        required
      />
      <button type="submit">Adicionar Animal</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}

export default AnimalForm;