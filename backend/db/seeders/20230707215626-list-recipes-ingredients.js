'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     *
    */
    await queryInterface.bulkInsert('RecipeIngredients', [{
      RecipeId: 10,
      IngredientId: 2,
      unit: 'grams',
      quantity: 300,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      RecipeId: 10,
      IngredientId: 5,
      unit: 'grams',
      quantity: 50,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      RecipeId: 10,
      IngredientId: 6,
      unit: 'grams',
      quantity: 100,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      RecipeId: 12,
      IngredientId: 8,
      unit: 'grams',
      quantity: 500,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      RecipeId: 12,
      IngredientId: 4,
      unit: 'grams',
      quantity: 150,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      RecipeId: 12,
      IngredientId: 6,
      unit: 'grams',
      quantity: 300,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ]
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('RecipeIngredients', null, {});
  }
};
