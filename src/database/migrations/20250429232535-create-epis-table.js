'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  await queryInterface.createTable('epis', {
    id:{
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name:{
      type: Sequelize.STRING,
      allowNull: false
    },
    code:{
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    quantity:{
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    ca:{
      type: Sequelize.STRING,
      allowNull: true,
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false
    },
    updated_at:{
      type: Sequelize.DATE,
      allowNull: false
    }
  })
  },

  async down (queryInterface, Sequelize) {
  
  }
};
