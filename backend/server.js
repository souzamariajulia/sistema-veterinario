const express = require('express');
const cors = require('cors');  // Importando o CORS

const app = express();

app.use(cors());  // Habilitar CORS para permitir requisições do frontend
app.use(express.json());  // Habilitar JSON
app.use('/api/animais', require('./routes/animals'));  // Rota para animais

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});