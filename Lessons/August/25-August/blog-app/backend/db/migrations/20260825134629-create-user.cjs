"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT.UNSIGNED,
      },
      username: { 
        type: Sequelize.STRING(50), 
        allowNull: false, 
        unique: true 
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
        allowNull: false, 
        type: Sequelize.DATE 
      },
      updated_at: { 
        allowNull: false, 
        type: Sequelize.DATE 
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("users");
  },
};