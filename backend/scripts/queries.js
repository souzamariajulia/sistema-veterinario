const pool = require('../db');

// CONSULTA 1
const consulta1 = async () => {
  try {
    const result = await pool.query(`
      SELECT PA.NOME_PET, C.DATA_CONSULTA, C.HORA_CONSULTA, A.TRATAMENTOS 
      FROM CONSULTA C
      JOIN HISTORICO A ON C.CONSULTA_ID = A.CONSULTA_INFO
      JOIN PACIENTE_ANIMAL PA ON PA.HISTORICO_INFO = A.HISTORIC_ID
    `);
    console.log('Consulta 1 Result:', result.rows);
  } catch (err) {
    console.error('Erro na Consulta 1:', err);
  }
};

// CONSULTA 2
const consulta2 = async () => {
  try {
    const result = await pool.query(`
      SELECT e.EXAME_ID, e.DATA_EXAME, e.TIPO_EXAME, s.SERVICO_ID, s.VALORBASE
      FROM EXAME e
      FULL OUTER JOIN SERVICO s ON e.EXAME_ID = s.EXAME
      WHERE e.DATA_EXAME BETWEEN '2016-05-01' AND '2016-07-31'
    `);
    console.log('Consulta 2 Result:', result.rows);
  } catch (err) {
    console.error('Erro na Consulta 2:', err);
  }
};

// CONSULTA 3
const consulta3 = async () => {
  try {
    const result = await pool.query(`
      SELECT * FROM PACIENTE_ANIMAL
      WHERE PACIENTE_ID IN (
        SELECT PACIENTE FROM AGENDAMENTO
        WHERE DATA_AGENDADA = '2016-05-10' AND HORA_AGENDADA = '09:00'
      )
    `);
    console.log('Consulta 3 Result:', result.rows);
  } catch (err) {
    console.error('Erro na Consulta 3:', err);
  }
};

// CONSULTA 4
const consulta4 = async () => {
  try {
    const result = await pool.query(`
      SELECT PA.NOME_PET
      FROM PACIENTE_ANIMAL PA
      WHERE PA.PACIENTE_ID IN (
        SELECT PA.PACIENTE_ID FROM AGENDAMENTO A
        WHERE A.DATA_AGENDADA = '2016-05-10'
      )
    `);
    console.log('Consulta 4 Result:', result.rows);
  } catch (err) {
    console.error('Erro na Consulta 4:', err);
  }
};

// CONSULTA 5
const consulta5 = async () => {
  try {
    const result = await pool.query(`
      SELECT FUNCIONARIO_ID, COUNT(SERVICO_ID) AS TODOS_SERVICOS
      FROM SERVICO
      GROUP BY FUNCIONARIO_ID
      HAVING COUNT(SERVICO_ID) >= 1
    `);
    console.log('Consulta 5 Result:', result.rows);
  } catch (err) {
    console.error('Erro na Consulta 5:', err);
  }
};

// CONSULTA 6
const consulta6 = async () => {
  try {
    const result = await pool.query(`
      SELECT PA.NOME_PET, COUNT(DISTINCT E.TIPO_EXAME) AS TOTADEEXAME
      FROM PACIENTE_ANIMAL PA
      JOIN HISTORICO H ON PA.PACIENTE_ID = H.PACIENTE_INFO
      JOIN CONSULTA C ON H.CONSULTA_INFO = C.CONSULTA_ID
      JOIN EXAME E ON C.ORDEM_SERVICO = E.ORDEM_SERVICO
      GROUP BY PA.PACIENTE_ID
      HAVING COUNT(DISTINCT E.TIPO_EXAME) = 1
    `);
    console.log('Consulta 6 Result:', result.rows);
  } catch (err) {
    console.error('Erro na Consulta 6:', err);
  }
};


const runQueries = async () => {
  await consulta1();
  await consulta2();
  await consulta3();
  await consulta4();
  await consulta5();
  await consulta6();
};

runQueries();