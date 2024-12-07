const express = require('express');
const app = express();
const teamRoutes = require('./routes/teamRoutes');
const championshipRoutes = require('./routes/championshipRoutes');

app.use(express.json());

app.use('/teams', teamRoutes);
app.use('/championship', championshipRoutes);

app.get('/', (req, res) => {
  res.send('Bem-vindo ao Meu Campeonato!');
});

module.exports = app;
