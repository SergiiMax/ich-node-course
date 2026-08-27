'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('posts', {
        id: {
            primaryKey: true,
            type: Sequelize.BIGINT.UNSIGNED,
            allowNull: false,
            autoIncrement: true,
        },
        title: {
            type: Sequelize.STRING(50),
            allowNull: false,
        },
        subtitle: {
            type: Sequelize.STRING(50),
            allowNull: false,
        },
        body: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
        subject:{
            type: Sequelize.STRING(50),
            allowNull: true,
        },
        user_id: {
            type: Sequelize.BIGINT.UNSIGNED,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        created_at: { allowNull: false, type: Sequelize.DATE },
        updated_at: { allowNull: false, type: Sequelize.DATE },
    })
      await queryInterface.addIndex('posts', ['user_id'], {
          name: 'posts_user_id_idx',
      });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('posts');
  }
};
