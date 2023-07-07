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
    */
    await queryInterface.bulkInsert('Ingredients', [{
      name: 'Potato',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Paneer',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Brocoli',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Bell Pepper',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Onion',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Tomato',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Mushroom',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Chicken',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Mutton',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Ingredients', null, {});
  }
};


/*To create a seeder file
npx sequelize-cli seed:generate --name <file_name>
to check if I can include unique constraint with name in Ingredients
*/
