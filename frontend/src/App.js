import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AnimalList from './components/AnimalList';
import './App.css'; 

function App() {
  const [animais, setAnimais] = useState([]);
  const [formData, setFormData] = useState({
    nome_pet: '',
    peso: '',
    sexo: '',
    ciclo_reprodutivo: '',
    restricoes: '',
    categoria_pet: '',
    descricao: '',
  });

  // Função para buscar a lista de animais do servidor
  const fetchAnimais = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/animais');
      setAnimais(response.data);
    } catch (error) {
      console.error('Erro ao buscar animais:', error);
    }
  };

  // Busca os animais na montagem do componente
  useEffect(() => {
    fetchAnimais();  // Buscar a lista de animais na montagem do componente
  }, []);

  // Manipula as alterações no formulário
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Submete o formulário para adicionar um novo animal
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/animais', formData);
      fetchAnimais();  // Atualiza a lista após adicionar
      setFormData({
        nome_pet: '',
        peso: '',
        sexo: '',
        ciclo_reprodutivo: '',
        restricoes: '',
        categoria_pet: '',
        descricao: '',
      });  // Limpa o formulário
    } catch (error) {
      console.error('Erro ao adicionar animal:', error);
    }
  };

  return (
    <div className="App">

      <div className="content-container">
        {/* Formulário para adicionar animais */}
        <form onSubmit={handleSubmit} className="animal-form">
          <div className="form-group">
            <label>Nome do Animal:</label>
            <input
              type="text"
              name="nome_pet"
              value={formData.nome_pet}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Peso:</label>
            <input
              type="number"
              name="peso"
              value={formData.peso}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Sexo:</label>
            <input
              type="text"
              name="sexo"
              value={formData.sexo}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Ciclo Reprodutivo:</label>
            <input
              type="text"
              name="ciclo_reprodutivo"
              value={formData.ciclo_reprodutivo}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Restrições:</label>
            <input
              type="text"
              name="restricoes"
              value={formData.restricoes}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Categoria do Animal:</label>
            <input
              type="text"
              name="categoria_pet"
              value={formData.categoria_pet}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Descrição:</label>
            <textarea
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="submit-button">Adicionar Animal</button>
        </form>

        {/* Lista de animais */}
        <AnimalList animais={animais} fetchAnimais={fetchAnimais} />
      </div>
    </div>
  );
}

export default App;