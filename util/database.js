const Sequelize = require('sequelize')

const sequelize = new Sequelize('expense', 'root', 'Shashank@143',{
    dialect: 'mysql',
    host:'localhost'
});

module.exports = sequelize;