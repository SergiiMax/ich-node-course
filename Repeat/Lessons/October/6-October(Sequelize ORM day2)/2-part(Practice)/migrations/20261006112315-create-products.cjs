'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.createTable('products', { 
      id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
          },
          name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
          },
          price: {
              type: Sequelize.DECIMAL(10,2),
              allowNull: false
          },
          categoryId: {
              type: Sequelize.INTEGER,
              allowNull: true,
              references: {
                  model: 'categories',
                  key: 'id'
              },
              onUpdate: 'CASCADE',
              onDelete: 'SET NULL'
          },
           createdAt: {
              type: Sequelize.DATE,
              allowNull: false
           },
           updatedAt: {
              type: Sequelize.DATE,
              allowNull: false
           }

     });
  },

  async down (queryInterface) {
    
    await queryInterface.dropTable('products');
  }
};
