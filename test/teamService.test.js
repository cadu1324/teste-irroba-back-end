const { createTeam, getAllTeams, calculatePoints } = require('../src/services/teamService');
const Team = require('../src/models/Team');

jest.mock('../src/models/Team', () => ({
  count: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  findAll: jest.fn(),
}));

describe('Team Service', () => {

  describe('createTeam', () => {
    it('should throw an error if more than 8 teams exist', async () => {
      Team.count.mockResolvedValue(8);  

      await expect(createTeam({ name: 'Team A' })).rejects.toThrow('O limite de 8 times já foi atingido.');
    });

    it('should throw an error if a team with the same name already exists', async () => {
      Team.count.mockResolvedValue(7);  
      Team.findOne.mockResolvedValue({ name: 'Team A' }); 

      await expect(createTeam({ name: 'Team A' })).rejects.toThrow('Já existe um time com esse nome.');
    });

    it('should create a new team if there are less than 8 teams and no duplicate name', async () => {
      Team.count.mockResolvedValue(7);  
      Team.findOne.mockResolvedValue(null);  
      Team.create.mockResolvedValue({ name: 'Team A', id: 1 }); 

      const result = await createTeam({ name: 'Team A' });
      expect(result).toEqual({ name: 'Team A', id: 1 });
      expect(Team.create).toHaveBeenCalledWith({ name: 'Team A' });
    });
  });

  describe('getAllTeams', () => {
    it('should return a list of all teams', async () => {
      const mockTeams = [
        { name: 'Team A', id: 1 },
        { name: 'Team B', id: 2 },
      ];
      Team.findAll.mockResolvedValue(mockTeams);  

      const result = await getAllTeams();
      expect(result).toEqual(mockTeams);
      expect(Team.findAll).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if there is an issue fetching the teams', async () => {
      Team.findAll.mockRejectedValue(new Error('Database error'));

      await expect(getAllTeams()).rejects.toThrow('Erro ao listar os times: Database error');
    });
  });

  describe('calculatePoints', () => {
    it('should calculate the correct points for a team based on match results', () => {
      const matches = [
        { team1Id: 1, team1Score: 3, team2Id: 2, team2Score: 1 },  
        { team1Id: 1, team1Score: 1, team2Id: 3, team2Score: 1 },  
        { team1Id: 2, team1Score: 2, team2Id: 1, team2Score: 0 },  
      ];

      const points = calculatePoints(matches, 1);  
      expect(points).toBe(4);  
    });

    it('should return 0 points if the team has not won or drawn any matches', () => {
      const matches = [
        { team1Id: 2, team1Score: 3, team2Id: 1, team2Score: 1 },
        { team1Id: 3, team1Score: 2, team2Id: 1, team2Score: 1 },
      ];

      const points = calculatePoints(matches, 1);  

      expect(points).toBe(0);  
    });
  });

});
