'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.createTable('users', { 
      id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: Sequelize.STRING(50), 
        allowNull: false
      },
      email: {
        type: Sequelize.STRING(255), 
        allowNull: false,
        unique: true
      },
      password_hash: {
        type: Sequelize.STRING(255), 
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE, 
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE, 
        allowNull: false
      }
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.dropTable('users');
  }
};
