// AnimalItem.js
import React, { useState } from 'react';
import axios from 'axios';

function AnimalItem({ animal, fetchAnimais }) {
  const [editing, setEditing] = useState(false);
  const [updatedAnimal, setUpdatedAnimal] = useState({ nome_pet: animal.nome_pet, peso: animal.peso, sexo: animal.sexo });

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/animais/${animal.paciente_id}`);
      fetchAnimais();  // Atualiza a lista de animais após a remoção
    } catch (error) {
      console.error('Erro ao deletar animal:', error);
    }
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/animais/${animal.paciente_id}`, updatedAnimal);
      setEditing(false);
      fetchAnimais();  // Atualiza a lista após a edição
    } catch (error) {
      console.error('Erro ao editar animal:', error);
    }
  };

  return (
    <div className="animal-item">
      <div className="animal-details">
        {editing ? (
          <>
            <input
              value={updatedAnimal.nome_pet}
              onChange={(e) => setUpdatedAnimal({ ...updatedAnimal, nome_pet: e.target.value })}
              placeholder="Nome do Pet"
            />
            <input
              value={updatedAnimal.peso}
              onChange={(e) => setUpdatedAnimal({ ...updatedAnimal, peso: e.target.value })}
              placeholder="Peso"
            />
            <input
              value={updatedAnimal.sexo}
              onChange={(e) => setUpdatedAnimal({ ...updatedAnimal, sexo: e.target.value })}
              placeholder="Sexo"
            />
          </>
        ) : (
          <span>{animal.nome_pet} (Peso: {animal.peso}, Sexo: {animal.sexo})</span>
        )}
      </div>
      <div className="button-group">
        {editing ? (
          <>
            <button onClick={handleUpdate}>Salvar</button>
            <button onClick={() => setEditing(false)}>Cancelar</button>
          </>
        ) : (
          <>
            <button onClick={handleEdit}>Editar</button>
            <button onClick={handleDelete}>Remover</button>
          </>
        )}
      </div>
    </div>
  );
}

export default AnimalItem;