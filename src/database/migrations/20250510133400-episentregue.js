'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('episentregue', {
      id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      ficha_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'fichaepi',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      epi_id:{
        type: Sequelize.INTEGER,
        allowNull:true,
        references: {
          model: 'epis',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      nome_epi:{
        type: Sequelize.STRING,
        allowNull: false
      },
      ca:{
        type: Sequelize.STRING,
        allowNull: true
      },
      quantidade: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      data_entrega: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      },
      created_at:{
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }

    })
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.dropTable('episentregue')
  }
};
