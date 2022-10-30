const user = require('../models/user')
const bcrypt = require('bcrypt')

function isstringinvalid(string)
{
    if(string == undefined || string.length === 0)
    {
        return true
    }
    else
    {
       return false
    }
}


exports.signup = async (req,res)=>{


        try{
            const {name,email,password} = req.body;

            if(isstringinvalid(name) || isstringinvalid(email) || isstringinvalid(password))
            {
            return res.status(400).json({err:"bad parameters . something is missing"})
            }


            const saltrounds =10;

            bcrypt.hash(password, saltrounds , async (err,hash) => {
            console.log(err)    
            await user.create({name,email,password:hash})
            res.status(201).json({message:'Successfully created'})
        })
        }

     catch(err){
        res.status(500).json({err})
    }

}

exports.login= async(req,res)=>{
    try{
        const email = req.body.email;
        const password = req.body.password;

        // console.log(email)
        if(isstringinvalid(email) || isstringinvalid(password))
        {
        return res.status(400).json({err:"bad parameters . something is missing"})
        }

         const User = await  user.findAll({where:{email:email}})
       console.log(User)
       if(User.length > 0)
       {
        bcrypt.compare(password,User[0].password,(err,result)=>{
            if(err)
            {
                res.status(500).json({success:false , message:"something went wrong"})
            }
            if(result == true)
            {
                res.status(200).json({success:true , message:"user is successfully logged"})
            }
            else
            {
                return res.status(400).json({success:false , message:"Password is incorrect"})
            }
           })
       }

    }
    catch(err){
        res.status(404).json({message:"user doesn't exist",err})
    }
}