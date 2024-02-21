const jwt = require('jsonwebtoken')
const dotEnv = require("dotenv");
dotEnv.config({path:"./config.env"});

function verifyToken(req,res,next){

    if(req.headers.authorization!==undefined){
        let token = req.headers.authorization.split(' ')[1];

        const secretKey = process.env.secretKey;
        jwt.verify(token,secretKey,(err,result)=>{

            if(!err){

                next();

            }else{
                res.status(403).send({message:"Invalid Token"})
            }
        })

    }else{
        res.send({message:"Please send a token"})
    }
}

module.exports = verifyToken;