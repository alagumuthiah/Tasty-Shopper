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
    await queryInterface.bulkInsert('Recipes', [{
      userId: 1,
      title: 'Paneer Curry',
      cuisine: 'Indian',
      servings: 3,
      isPublic: true,
      instruction: ['Wash the Paneer and cut into cubes', 'Add the spices tomato and onion'],
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      userId: 2,
      title: 'Tom yum Soup',
      cuisine: 'Thai',
      servings: 2,
      isPublic: true,
      instruction: ['Boil all the vegetables', 'Season the broth and vegetables with chilli flakes'],
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      userId: 2,
      title: 'Chicken Manchurian',
      cuisine: 'Korean',
      servings: 5,
      isPublic: false,
      instruction: ['Cut the vegetables, chicken and deep fry using cornflour', 'Prepare the sauce and satur all vegetables'],
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      userId: 3,
      title: 'Paneer Burji',
      cuisine: 'Indian',
      servings: 2,
      isPublic: true,
      instruction: ['Shred the Paneer', 'Add Onion, Tomato and masala', 'Garnish'],
      createdAt: new Date(),
      updatedAt: new Date()
    },]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Recipes', null, {});

  }
};
