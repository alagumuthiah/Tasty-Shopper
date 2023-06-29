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
    await queryInterface.bulkInsert('Users', [{
      username: 'johndoe',
      firstname: 'John',
      lastname: 'Doe',
      email: 'johndoe99@gmail.com',
      password: 'john123',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      username: 'venkatbhat',
      firstname: 'Venkatesh',
      lastname: 'Bhat',
      email: 'venkibhat@gmail.com',
      password: 'venki123',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'dhamuchef',
      firstname: 'Dhamodharan',
      lastname: 'Chef',
      email: 'dhamu@gmail.com',
      password: 'dhamu123',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'adminuser',
      firstname: 'Admin',
      lastname: 'User',
      email: 'admin@gmail.com',
      password: 'admin123',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    ])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
