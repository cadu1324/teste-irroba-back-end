const championshipService = require('../services/championshipService');

const startChampionship = async (req, res) => {
  try {
    const result = await championshipService.generateMatches();
    return res.status(200).json({ message: 'Campeonato iniciado com sucesso!', result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getChampionshipById = async (req, res) => {
  try {
    const result = await championshipService.getChampionshipById(req.params.id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { startChampionship, getChampionshipById };
