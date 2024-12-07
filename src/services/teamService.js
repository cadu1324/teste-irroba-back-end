const Team = require('../models/Team');

const createTeam = async (teamData) => {
  try {
    const teamCount = await Team.count();
    if (teamCount >= 8) {
      throw new Error('O limite de 8 times já foi atingido.');
    }

    const existingTeam = await Team.findOne({ where: { name: teamData.name } });
    if (existingTeam) {
      throw new Error('Já existe um time com esse nome.');
    }

    const team = await Team.create(teamData);
    return team;
  } catch (error) {
    throw new Error('Erro ao criar o time: ' + error.message);
  }
};

const getAllTeams = async () => {
  try {
    const teams = await Team.findAll();
    return teams;
  } catch (error) {
    throw new Error('Erro ao listar os times: ' + error.message);
  }
};

const calculatePoints = (matches, teamId) => {
  let totalPoints = 0;
  matches.forEach(match => {
    if (match.team1Id === teamId && match.team1Score > match.team2Score) {
      totalPoints += 3;
    } else if (match.team2Id === teamId && match.team2Score > match.team1Score) {
      totalPoints += 3;
    } else if (match.team1Score === match.team2Score) {
      totalPoints += 1;
    }
  });
  return totalPoints;
};

module.exports = { createTeam, getAllTeams, calculatePoints };