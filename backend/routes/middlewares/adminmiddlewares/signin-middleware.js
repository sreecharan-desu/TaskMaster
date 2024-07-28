const { accountPrescence } = require("./helperfns/helperfunctions")



const fetchDB = async()=>{
    const {username,password} = req.body;
    const isPresent = await accountPrescence(username,password);

    if(isPresent)
        next()
    else
        res.json({
            msg : 'Invalid Credentials Check your username & password'
        })
}



module.exports = {
    fetchDB
}