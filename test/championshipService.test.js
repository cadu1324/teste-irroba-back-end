const { generateMatches } = require('../src/services/championshipService');
const Team = require('../src/models/Team');
const Match = require('../src/models/Match');
const { simulateMatch, determineWinner } = require('../src/services/matchService');
const { calculatePoints } = require('../src/services/teamService');

jest.mock('../src/services/matchService', () => ({
  simulateMatch: jest.fn(),
  determineWinner: jest.fn(),
}));

jest.mock('../src/services/teamService', () => ({
  calculatePoints: jest.fn(),
}));

jest.mock('../src/models/Team', () => ({
  findAll: jest.fn(),
}));

jest.mock('../src/models/Match', () => ({
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
}));

// Mock para o sequelize
jest.mock('../models', () => ({
  sequelize: {
    sync: jest.fn().mockResolvedValue(),
  },
}));

describe('Champion Service', () => {
  beforeEach(() => {
    // Mockando a criação de partidas e times
    Match.findOne.mockResolvedValue({
      championshipId: 1,
    });

    Match.create.mockResolvedValue({
      id: 1,
    });

    Team.findAll.mockResolvedValue([
      { id: 1, name: 'Team A' },
      { id: 2, name: 'Team B' },
      { id: 3, name: 'Team C' },
      { id: 4, name: 'Team D' },
      { id: 5, name: 'Team E' },
      { id: 6, name: 'Team F' },
      { id: 7, name: 'Team G' },
      { id: 8, name: 'Team H' }
    ]);
  });

  it('should throw an error if there are not exactly 8 teams', async () => {
    Team.findAll.mockResolvedValue([{ id: 1 }, { id: 2 }, { id: 3 }]);

    await expect(generateMatches()).rejects.toThrow('O campeonato deve ter exatamente 8 times!');
  });

  it('should generate round matches and save them in the database', async () => {
    const teams = [
      { id: 1, name: 'Team A' },
      { id: 2, name: 'Team B' },
      { id: 3, name: 'Team C' },
      { id: 4, name: 'Team D' },
      { id: 5, name: 'Team E' },
      { id: 6, name: 'Team F' },
      { id: 7, name: 'Team G' },
      { id: 8, name: 'Team H' },
    ];

    Team.findAll.mockResolvedValue(teams);
    simulateMatch.mockResolvedValue({ team1Score: 2, team2Score: 1 });

    const lastChampionshipId = 1;
    Match.create.mockResolvedValue();

    const result = await generateMatches();

    expect(result.quarterFinalMatches).toHaveLength(4);
    expect(Match.create).toHaveBeenCalledTimes(4);
    expect(simulateMatch).toHaveBeenCalledTimes(4);
  });

  it('should throw an error when team data is invalid', async () => {
    const teams = [
      { id: 1, name: 'Team A' },
      { name: 'Team B' },
    ];

    Team.findAll.mockResolvedValue(teams);

    await expect(generateMatches()).rejects.toThrow('Dados do time inválidos!');
  });

  it('should call determineWinner for quarter-final, semi-final, and final matches', async () => {
    const teams = [
      { id: 1, name: 'Team A' },
      { id: 2, name: 'Team B' },
      { id: 3, name: 'Team C' },
      { id: 4, name: 'Team D' },
      { id: 5, name: 'Team E' },
      { id: 6, name: 'Team F' },
      { id: 7, name: 'Team G' },
      { id: 8, name: 'Team H' },
    ];

    Team.findAll.mockResolvedValue(teams);
    simulateMatch.mockResolvedValue({ team1Score: 2, team2Score: 1 });

    const lastChampionshipId = 1;
    Match.create.mockResolvedValue();

    determineWinner.mockReturnValue({ id: 1, name: 'Team A' });

    const result = await generateMatches();

    expect(determineWinner).toHaveBeenCalledTimes(6);
    expect(result.finalMatch).toBeDefined();
  });

  it('should calculate the points for each team after all matches', async () => {
    const teams = [
      { id: 1, name: 'Team A' },
      { id: 2, name: 'Team B' },
      { id: 3, name: 'Team C' },
      { id: 4, name: 'Team D' },
      { id: 5, name: 'Team E' },
      { id: 6, name: 'Team F' },
      { id: 7, name: 'Team G' },
      { id: 8, name: 'Team H' },
    ];

    Team.findAll.mockResolvedValue(teams);
    simulateMatch.mockResolvedValue({ team1Score: 2, team2Score: 1 });

    const lastChampionshipId = 1;
    Match.create.mockResolvedValue();

    calculatePoints.mockReturnValue(3);

    const result = await generateMatches();

    expect(calculatePoints).toHaveBeenCalledTimes(8); 
    expect(result).toHaveProperty('quarterFinalMatches');
    expect(result).toHaveProperty('semifinalMatches');
    expect(result).toHaveProperty('finalMatch');
  });

  const championshipId = 1;

  describe('GET /championship/:id', () => {
    it('should retrieve championship information by ID', async () => {
      const response = await request(app).get(`/championship/${championshipId}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('championshipId', championshipId);
      expect(response.body).toHaveProperty('rounds');
      expect(response.body.rounds).toHaveProperty('Quartas de Final');
      expect(response.body.rounds['Quartas de Final']).toHaveLength(2);
    });

    it('should return 404 if championship not found', async () => {
      const response = await request(app).get('/championship/999');

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('message', 'Campeonato com ID 999 não encontrado.');
    });
  });
});
