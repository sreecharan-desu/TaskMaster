const { User } = require("../../../db/db");
const { generate_hashed_password } = require("../hashfn's/hash-password");
const { accountExistenceCheck } = require("./signup-middleware");


const fecthUserDB = async (req,res,next)=>{
    const {username,password} = req.body; 
    const isPresent = await accountExistenceCheck(username,password);

    if(isPresent == false)
        res.json({msg : 'Invalid Credentials Check your username & password and try again!',success : false})
    else
        next()

}


module.exports  = {
    fecthUserDB
}