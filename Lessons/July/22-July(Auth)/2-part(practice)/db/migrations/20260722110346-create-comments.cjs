"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("comments", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      postId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        reference: {
          model: "posts",
          key: "id",
        },
      },
      text: { type: Sequelize.TEXT, allowNull: false },
      author: { type: Sequelize.STRING, allowNull: false },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
      likes: { type: Sequelize.INTEGER, default: 0 },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("posts");
  },
};
