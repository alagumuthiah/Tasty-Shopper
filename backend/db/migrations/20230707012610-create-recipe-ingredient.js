'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('RecipeIngredients', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      RecipeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Recipes' }
      },
      IngredientId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Ingredients' }
      },
      unit: {
        type: Sequelize.ENUM,
        values: ['cup', 'teaspoon', 'tablespoon', 'ml', 'liters', 'grams', 'kilograms', 'oz']
      },
      quantity: {
        type: Sequelize.FLOAT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('RecipeIngredients');
  }
};
