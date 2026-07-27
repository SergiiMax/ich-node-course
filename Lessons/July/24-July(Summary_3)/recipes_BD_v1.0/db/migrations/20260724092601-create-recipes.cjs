'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('recipes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: { type: Sequelize.STRING, allowNull: false },
      description: { type: Sequelize.TEXT, allowNull: true},
      instructions: { type: Sequelize.TEXT, allowNull: false },
      cuisine: { type: Sequelize.STRING, allowNull: true },
      difficulty: { type: Sequelize.TEXT, allowNull: false, defaultValue: 'easy' },
      prepTimeMinutes: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
      cookTimeMinutes: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
      servings: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 1 },
      caloriesPerServing: { type: Sequelize.INTEGER, allowNull: true },
      imageUrl: { type: Sequelize.STRING, allowNull: true },
      rating: { type: Sequelize.DECIMAL(3,2), allowNull: false, defaultValue: 0 },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('recipes');
  },
};