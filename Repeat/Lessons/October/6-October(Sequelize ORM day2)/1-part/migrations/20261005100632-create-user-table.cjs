'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * 
     */
    await queryInterface.createTable('users', { 
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      name: {
              type: Sequelize.STRING,
              allowNull: false,
          },
          email: {
              type: Sequelize.STRING,
              allowNull: false,
              unique: true,
          },
          createdAt: {
              type: Sequelize.DATE,
              defaultValue: Sequelize.fn('NOW'),
          }
    });
  },

  async down (queryInterface) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * 
     */
    await queryInterface.dropTable('users');
  }
};