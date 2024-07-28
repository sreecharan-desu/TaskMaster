const {fetchAccountsByUsername,accountExistenceCheck} = require('./helperFNs/helper_functions')

const verifyUserExistence = async(req,res,next)=>{
    const {username,password}  = req.body;

    if(!(await fetchAccountsByUsername(username))){
        next()
    }else if(await (username)){
        if(await accountExistenceCheck(username,password)){
            res.json({msg : `Hey ${username} ! I remember you Signin Now!`})
        }else{
            res.json({msg : `Sorry, ${username} is already taken please try a newOne!`})}
    }

}


module.exports = {
    verifyUserExistence,
}