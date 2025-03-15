const pool = require('../db'); // Conexão com o banco de dados

const insertAnimal = async (pacienteId, nomePet, peso, sexo, cicloReprodutivo, restricoes, categoriaPet, descricao) => {
    try {
        const result = await pool.query(
            `INSERT INTO paciente_animal (paciente_id, nome_pet, peso, sexo, ciclo_reprodutivo, restricoes, categoria_pet, descricao) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
            [pacienteId, nomePet, peso, sexo, cicloReprodutivo, restricoes, categoriaPet, descricao]
        );
        console.log('Animal inserido:', result.rows[0]);
    } catch (err) {
        console.error('Erro ao inserir animal:', err);
    } finally {
        await pool.end();
    }
};
insertAnimal(24, 'MariaJulia', 10.5, 'M', 'Adulto', 'Sem restrições', 'Gato', 'Pequeno porte');