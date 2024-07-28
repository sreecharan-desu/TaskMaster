const { User } = require("../../../db/db")

const fetchAccountsByUsername = async(username)=>{
    const user = await User.findOne({
        Username : username
    })  //returns `null` if there is no user associated with this username

    if(user == null)
        return false
    else
        return true
}

const accountExistenceCheck = async(username,password)=>{
    const user = await User.findOne({
        Username : username,
        Password : password
    })  //returns `null` if there is no user associated with this username

    if(user == null)
        return false
    else
        return true    
}


const verifyUserExistence = async(req,res,next)=>{
    const {username,password}  = req.body;

    if(fetchAccountsByUsername(username))
        if(accountExistenceCheck(username,password))
            res.json({msg : `Hey ${username} ! I remember you Signin Now!`})
        else
            res.json({msg : `Sorry, ${username} is already taken please try a newOne!`})
    else if(!fetchAccountsByUsername(username))
        next()
}


module.exports = {
    verifyUserExistence
}