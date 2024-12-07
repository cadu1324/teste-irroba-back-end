const teamService = require('../services/teamService');

const createTeam = async (req, res) => {
  try {
    const teamData = req.body;
    const team = await teamService.createTeam(teamData);
    res.status(201).json({ message: 'Time criado com sucesso', team });
  } catch (error) {
    if (error.message === 'Já existe um time com esse nome.') {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

const getAllTeams = async (req, res) => {
  try {
    const teams = await teamService.getAllTeams();
    res.status(200).json(teams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createTeam, getAllTeams };
