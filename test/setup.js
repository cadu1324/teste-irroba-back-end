// test/setup.js ou test/sequelizeMock.js (dependendo de onde você faz o mock do Sequelize)

const Sequelize = require('sequelize');

// Criando uma versão mockada de `sequelize.define`
jest.mock('sequelize', () => {
  const originalSequelize = jest.requireActual('sequelize');
  
  return {
    ...originalSequelize,
    Sequelize: jest.fn().mockImplementation(() => {
      return {
        define: jest.fn(() => ({
          name: 'Team',
          attributes: {
            id: { type: 'integer', allowNull: false },
            name: { type: 'string', allowNull: false },
          },
          sync: jest.fn().mockResolvedValue(true),
          create: jest.fn(),
          findAll: jest.fn(),
        })),
        authenticate: jest.fn().mockResolvedValue(true),
      };
    }),
    DataTypes: originalSequelize.DataTypes, // Mocka o DataTypes
  };
});
