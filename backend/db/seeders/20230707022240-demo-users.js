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
      firstName: 'John',
      lastName: 'Doe',
      userName: 'johndoe',
      email: 'johndoe99@gmail.com',
      hashedPassword: 'john123',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      firstName: 'Venkatesh',
      lastName: 'Bhat',
      userName: 'venkatbhat',
      email: 'venkibhat@gmail.com',
      hashedPassword: 'venki123',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      firstName: 'Dhamodharan',
      lastName: 'Chef',
      userName: 'dhamuchef',
      email: 'dhamu@gmail.com',
      hashedPassword: 'dhamu123',
      createdAt: new Date(),
      updatedAt: new Date()
    }])

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {})
  }
};
