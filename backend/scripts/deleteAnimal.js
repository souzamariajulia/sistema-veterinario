const pool = require('../db'); 

const deleteAnimal = async () => {
  const id = process.argv[2];

  try {
    await pool.query('DELETE FROM PACIENTE_ANIMAL WHERE PACIENTE_ID = $1', [id]);
    console.log(`Animal com ID ${id} foi deletado.`);
  } catch (err) {
    console.error('Erro ao deletar animal:', err);
  } finally {
    pool.end();
  }
};

deleteAnimal();