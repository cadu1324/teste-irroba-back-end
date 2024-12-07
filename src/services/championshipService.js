const Team = require('../models/Team');
const Match = require('../models/Match');
const { simulateMatch, determineWinner } = require('./matchService');
const { calculatePoints } = require('./teamService');

const getAndIncrementChampionshipId = async () => {
  try {
    const lastMatch = await Match.findOne({ order: [['createdAt', 'DESC']] });
    return lastMatch ? lastMatch.championshipId + 1 : 1;
  } catch (error) {
    console.error('Erro ao buscar e incrementar o campeonatoId:', error);
    throw error;
  }
};

const generateRoundMatches = async (teams, roundName, lastChampionshipId) => {
  const matches = [];
  for (let i = 0; i < teams.length; i += 2) {
    const team1 = teams[i];
    const team2 = teams[i + 1];

    if (!team1 || !team1.id || !team2 || !team2.id) {
      throw new Error('Dados do time inválidos!');
    }
    
    const { team1Score, team2Score } = await simulateMatch(team1.id, team2.id);
    matches.push({ team1, team2, team1Score, team2Score });
    await Match.create({
      round: roundName,
      team1Score,
      team2Score,
      team1Id: team1.id,
      team2Id: team2.id,
      championshipId: lastChampionshipId
    });
  }
  return matches;
};

const generateMatches = async () => {
  try {
    const lastChampionshipId = await getAndIncrementChampionshipId();
    const teams = await Team.findAll();
    
    if (teams.length !== 8) {
      throw new Error('O campeonato deve ter exatamente 8 times!');
    }
    

    const shuffledTeams = teams.sort(() => 0.5 - Math.random());

    const quarterFinalMatches = await generateRoundMatches(shuffledTeams, 'Quartas de Final', lastChampionshipId);

    const semifinalTeams = quarterFinalMatches.map(match => determineWinner(match.team1, match.team2));

    const semifinalMatches = await generateRoundMatches(semifinalTeams, 'Semifinal', lastChampionshipId);
    
    const finalTeams = semifinalMatches.map(match => determineWinner(match.team1, match.team2));

     // Aqui você precisa garantir que "finalTeams" contenha exatamente dois times
     if (finalTeams.length !== 2) {
      throw new Error('Erro: não foi possível determinar os times para a final.');
    }

    // Agora, "finalTeams[0]" e "finalTeams[1]" são os times da final
    const { team1Score, team2Score } = await simulateMatch(finalTeams[0].id, finalTeams[1].id);

    const finalMatch = { team1: finalTeams[0], team2: finalTeams[1], team1Score, team2Score };
    await Match.create({
      round: 'Final',
      team1Score,
      team2Score,
      team1Id: finalTeams[0].id,
      team2Id: finalTeams[1].id,
      championshipId: lastChampionshipId
    });

    const matches = await Match.findAll({ where: { championshipId: lastChampionshipId } });
    teams.forEach(team => {
      team.points = calculatePoints(matches.filter(match => match.team1Id === team.id || match.team2Id === team.id), team.id);
    });

    return {
      quarterFinalMatches,
      semifinalMatches,
      finalMatch,
    };
  } catch (error) {
    throw error;
  }
};

const getChampionshipById = async (championshipId) => {
  try {

    const matches = await Match.findAll({
      where: { championshipId },
    });

     
  if (matches.length === 0) {
    return res.status(404).json({
      message: `Campeonato com ID ${championshipId} não encontrado.`,
    });
  }
    
    const rounds = matches.reduce((acc, match) => {
      if (!acc[match.round]) {
        acc[match.round] = [];
      }
      acc[match.round].push(match);
      return acc;
    }, {});

    return {
      championshipId,
      rounds, 
    };
  } catch (error) {
    console.error('Erro ao recuperar informações do campeonato:', error);
    throw error;
  }
};

module.exports = { generateMatches, getChampionshipById };