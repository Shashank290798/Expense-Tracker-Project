const Expense = require('../models/expensedata');
const user = require('../models/user')

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