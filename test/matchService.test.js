const {  determineWinner } = require('../src/services/matchService');

describe('matchService', () => {

  describe('determineWinner', () => {
    it('should return the team with more points', () => {
      const team1 = { points: 10, createdAt: '2023-01-01' };
      const team2 = { points: 5, createdAt: '2023-02-01' };
      
      const winner = determineWinner(team1, team2);
      
      expect(winner).toEqual(team1);
    });

    it('should return the team with more points', () => {
      const team1 = { points: 5, createdAt: '2023-01-01' };
      const team2 = { points: 10, createdAt: '2023-02-01' };
      
      const winner = determineWinner(team1, team2);
      
      expect(winner).toEqual(team2);
    });

    it('should return the team that was created first if points are equal', () => {
      const team1 = { points: 10, createdAt: '2023-01-01' };
      const team2 = { points: 10, createdAt: '2023-02-01' };
      
      const winner = determineWinner(team1, team2);
      
      expect(winner).toEqual(team1); 
    });

    it('should return the team that was created first if points are equal (reverse order)', () => {
      const team1 = { points: 10, createdAt: '2023-02-01' };
      const team2 = { points: 10, createdAt: '2023-01-01' };
      
      const winner = determineWinner(team1, team2);
      
      expect(winner).toEqual(team2);
    });
  });

});
