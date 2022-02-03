'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
       Example:

       */

      await queryInterface.bulkInsert('Roles',
       [{
        role_name: 'Director',
        role_description: " Has All Previlledges",
        createdAt : new Date(),
        updatedAt : new Date()
      }, {

        role_name: 'Admin',
        role_description: " Has Admin Previlledges",
        createdAt : new Date(),
        updatedAt : new Date()
      } ], {});
    
  },

  async down (queryInterface, Sequelize) {
    //      Add commands to revert seed here.
     
      
      await queryInterface.bulkDelete('Roles', null, {});
     
  }
};
