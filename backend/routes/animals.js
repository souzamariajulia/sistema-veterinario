const express = require('express');
const router = express.Router();
const pool = require('../db');

// Create (Adicionar Animal)
router.post('/', async (req, res) => {
  const { nome_pet, peso, sexo, ciclo_reprodutivo, restricoes, categoria_pet, descricao } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO PACIENTE_ANIMAL (NOME_PET, PESO, SEXO, CICLO_REPRODUTIVO, RESTRICOES, CATEGORIA_PET, DESCRICÃO) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [nome_pet, peso, sexo, ciclo_reprodutivo, restricoes, categoria_pet, descricao]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Read (Listar Animais)
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM PACIENTE_ANIMAL');
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update (Atualizar Animal)
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nome_pet, peso, sexo, ciclo_reprodutivo, restricoes, categoria_pet, descricao } = req.body;
  try {
    const result = await pool.query(
      'UPDATE PACIENTE_ANIMAL SET NOME_PET = $1, PESO = $2, SEXO = $3, CICLO_REPRODUTIVO = $4, RESTRICOES = $5, CATEGORIA_PET = $6, DESCRICÃO = $7 WHERE PACIENTE_ID = $8 RETURNING *',
      [nome_pet, peso, sexo, ciclo_reprodutivo, restricoes, categoria_pet, descricao, id]
    );
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete (Remover Animal)
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM PACIENTE_ANIMAL WHERE PACIENTE_ID = $1', [id]);
    res.status(200).send(`Animal ${id} deletado com sucesso`);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;