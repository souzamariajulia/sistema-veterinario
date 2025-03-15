const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ClinicaVeterinaria',
  password: 'julia18',
  port: 5432,
});

// Teste de conexão
pool.connect()
  .then(client => {
    console.log("Conexão com o banco de dados bem-sucedida!");
    client.release();
  })
  .catch(err => {
    console.error("Erro ao conectar ao banco de dados:", err);
  });

module.exports = pool;