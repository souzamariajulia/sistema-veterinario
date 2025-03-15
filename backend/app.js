const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const animalRoutes = require('./routes/animals');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/animais', animalRoutes);

const port = 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});