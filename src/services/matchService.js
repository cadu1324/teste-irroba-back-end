const { PythonShell } = require('python-shell');

const simulateMatch = async (team1Id, team2Id) => {
  const options = {
    mode: 'text',
    pythonPath: 'python', 
    args: [team1Id, team2Id]
  };

  try {
    const results = await PythonShell.run('teste.py', options);
    return {
      team1Score: parseInt(results[0]),
      team2Score: parseInt(results[1])
    };
  } catch (err) {
    console.error(err);
    throw new Error('Erro ao executar o script Python');
  }
};

const determineWinner = (team1, team2) => {
  if (team1.points > team2.points) {
    return team1;
  } else if (team2.points > team1.points) {
    return team2;
  } else {
    return team1.createdAt < team2.createdAt ? team1 : team2;
  }
};

module.exports = { simulateMatch, determineWinner };