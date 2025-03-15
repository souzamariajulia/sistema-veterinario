const pool = require('../db'); 

const updateAnimal = async () => {
  const id = process.argv[2];
  const nome_pet = process.argv[3];
  const peso = process.argv[4];
  const sexo = process.argv[5];
  const ciclo_reprodutivo = process.argv[6];
  const restricoes = process.argv[7];
  const categoria_pet = process.argv[8];
  const descricao = process.argv[9];

  try {
    const result = await pool.query(
      'UPDATE PACIENTE_ANIMAL SET NOME_PET = $1, PESO = $2, SEXO = $3, CICLO_REPRODUTIVO = $4, RESTRICOES = $5, CATEGORIA_PET = $6, DESCRICÃO = $7 WHERE PACIENTE_ID = $8 RETURNING *',
      [nome_pet, peso, sexo, ciclo_reprodutivo, restricoes, categoria_pet, descricao, id]
    );
    console.log('Animal atualizado:', result.rows[0]);
  } catch (err) {
    console.error('Erro ao atualizar animal:', err);
  } finally {
    pool.end();
  }
};

updateAnimal();