const user = require('../models/user')
exports.signup = (req,res)=>{
        const {name,email,password} = req.body;
   
    
    if(name == undefined || name.length ===0 || email == undefined || email.length === 0 || password == undefined || password.length === 0)
    {
    return res.status(400).json({err:"bad parameters . something is missing"})
    }
    user.create({name,email,password})
    .then((result)=>{
        res.status(201).json({data:result})
    })
    .catch(err =>{
        res.status(500).json({err})
    })
}