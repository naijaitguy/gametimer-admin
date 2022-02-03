'use strict';
const Bcrypt = require('bcrypt');
module.exports = {
  async up (queryInterface, Sequelize) {
    
    //  Add seed commands here.
     
      //Example:

      const password=  Bcrypt.hashSync("MYhidden01@#",10);

      console.log(password)
      await queryInterface.bulkInsert('AdminUsers', [{
                email:"admin@gametimer.com",
                fullname:" Supper Admin",
                 password:password,
                 phone:"07068550755",
                 role_id:1 ,
                 createdAt : new Date(),
                 updatedAt : new Date()
     }], {});
    
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     
     */

     await queryInterface.bulkDelete('AdminUsers', null, {});
  }
};
