// AnimalList.js
import React from 'react';
import AnimalItem from './AnimalItem';

function AnimalList({ animais, fetchAnimais }) {
  return (
    <>
      <style>
        {`
          .list {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            padding: 1rem;
            background-color: #f9f9f9;
            border-radius: 8px;
            max-width: 600px;
            margin: 0 auto;
          }
          .animal-item {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: flex-start;
            background-color: #fff;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          .animal-item span {
            font-size: 16px;
            color: #333;
          }
          .button-group {
            display: flex;
            gap: 10px; /* Espaçamento entre os botões */
            margin-top: 10px; /* Espaço acima dos botões */
          }
          .animal-item button {
            background-color: #e74c3c;
            color: white;
            border: none;
            padding: 8px 12px;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s ease;
            flex: 1; /* Permite que os botões cresçam igualmente */
            min-width: 80px; /* Largura mínima para os botões */
          }
          .animal-item button:hover {
            background-color: #c0392b;
          }
          p {
            font-size: 18px;
            color: #777;
            text-align: center;
          }
        `}
      </style>

      <div className="list">
        {animais.length === 0 ? (
          <p>Nenhum animal cadastrado.</p>
        ) : (
          animais.map((animal) => (
            <AnimalItem
              key={animal.paciente_id}
              animal={animal}
              fetchAnimais={fetchAnimais}
            />
          ))
        )}
      </div>
    </>
  );
}

export default AnimalList;