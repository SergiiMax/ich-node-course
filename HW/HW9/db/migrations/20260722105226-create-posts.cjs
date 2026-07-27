'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: { type: Sequelize.STRING, allowNull: false },
      text: { type: Sequelize.TEXT, allowNull: false },
      author: { type: Sequelize.STRING, allowNull: false },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
      likes: { type: Sequelize.INTEGER, default: 0 }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('posts');
  },
};
