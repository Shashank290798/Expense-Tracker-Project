const express= require('express');

const expense =express();

const cors = require('cors');

const bodyparser =require('body-parser');

const sequelize = require('./util/database');

const expenseRoutes = require('./routes/expense');

const orderModels = require('./models/order');

const user = require('./models/user');

const expensedata = require('./models/expensedata')

expense.use(cors());

expense.use(bodyparser.json());

expense.use(expenseRoutes)

user.hasMany(expensedata)
expensedata.belongsTo(user)

user.hasMany(orderModels)
orderModels.belongsTo(user)

sequelize
.sync()
.then(result =>{
    expense.listen(4000);
})
.catch(err =>{
    console.log(err)
})