'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  await queryInterface.createTable('funcionarios', {
    id:{
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    }, 
    nome:{
      type: Sequelize.STRING,
      allowNull: false,
    },
    cargo:{
      type: Sequelize.STRING,
      allowNull: false,
    }, 
    data_admissao: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
    }

  })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('funcionarios');
  }
};
