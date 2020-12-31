'use strict';

const { DataTypes } = require('sequelize'); 

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.createTable('users', { 
      
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        primaryKey: true,
        autoIncrement: true,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },

      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
      }

    });
    
  },

  down: async (queryInterface, Sequelize) => {
    
     await queryInterface.dropTable('users');
     
  }
};
