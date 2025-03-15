const pool = require('../db'); 

const listAnimals = async () => {
  try {
      const result = await pool.query('SELECT * FROM PACIENTE_ANIMAL');
      console.log('Animais:', result.rows);
  } catch (err) {
      console.error('Erro ao listar animais:', err);
  } finally {
      await pool.end();
  }
};

listAnimals();