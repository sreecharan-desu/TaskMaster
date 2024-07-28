const { User } = require("../../../db/db")
const { compare_password_with_hash } = require("../hashfn's/hash-password")

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
        Username : username
    })

    const match = await compare_password_with_hash(password,user.Password);
    
    if(match == false)
        return false
    else
        return true    
}


const verifyUserExistence = async(req,res,next)=>{
    const {username,password}  = req.body;

    // console.log(await fetchAccountsByUsername(username))
    // console.log(await accountExistenceCheck(username,password))

    if(!(await fetchAccountsByUsername(username))){
        next()
    }else if(await fetchAccountsByUsername(username)){
        if(await accountExistenceCheck(username,password)){
            res.json({msg : `Hey ${username} ! I remember you Signin Now!`})
        }else{
            res.json({msg : `Sorry, ${username} is already taken please try a newOne!`})}
    }

}


module.exports = {
    verifyUserExistence,
    accountExistenceCheck
}