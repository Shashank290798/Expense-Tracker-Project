const Expense = require('../models/expensedata');
const user = require('../models/user')
const Sequelize = require('sequelize')
const op = Sequelize.Op;

const { BlobServiceClient } = require('@azure/storage-blob');
const { v1: uuidv1} = require('uuid');

exports.postdetails =((req,res,next)=>{
    const{expense,description,category} = req.body
    console.log({expense,description,category})
    Expense.create({expense,description,category, userId: req.user.id})
    .then((response)=>{
    res.status(201).json({data:response})
})
    .catch(err=>res.status(500).json(err))
})

exports.getdetails =(req,res,next)=>{
    Expense.findAll({where : {userId:req.user.id}})
    .then(response=>{
     res.status(200).json({response,user:req.user})
    })
    .catch(err=> res.status(500).json(err))
}

exports.delete=(req,res,next)=>{
    const id = req.params.id;
    Expense.destroy({where:{id:id ,userId:req.user.id}})
    .then(response=>res.status(200).json({msg:'successful'}))
    .catch(err=>{
      console.log(err);
      res.status(500).json(err)
    })
}

exports.getAllUsers = (req,res)=>{
    user.findAll()
     .then(result=>{
       return res.status(201).json({success:true , data:result})
     })
     .catch(err =>{
       return res.status(500).json({success:false , message:"failed"})
     })
}

exports.getAllExpenses = (req,res)=>{
   const userid = req.params.id
   Expense.findAll({where:{userId:userid}})
   .then(result=>{
       return res.status(201).json({success:true , data:result})
   })
   .catch(err =>{
       return res.status(500).json({success:false , data:err})
   })
}

exports.getDailyExpense = (req,res)=>{
    const todayDate = new Date().setHours(0,0,0,0)
    const Now = new Date();
  
    const userid = req.user.id;
    Expense.findAll({where:{userId:userid , createdAt:{[op.gt]:todayDate,[op.lt]:Now}}})
    .then(result =>{
      res.status(201).json(result)
    })
    .catch(err =>{
      res.status(500).json(err)
    })
  
  }
  
  
  exports.weeklyExpense = (req,res)=>{
      const todayDate = new Date().getDate()
      const weeklyExpense = new Date().setDate(todayDate-7)
      const Now = new Date();
  
      const userid = req.user.id;
      Expense.findAll({where:{userId:userid , createdAt:{[op.gt]:weeklyExpense,[op.lt]:Now}}})
      .then(result =>{
        res.status(201).json(result)
      })
      .catch(err =>{
        res.status(500).json(err)
      })
  
  }