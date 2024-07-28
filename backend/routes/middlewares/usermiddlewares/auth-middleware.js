const jwt  = require('jsonwebtoken');
const {JWT_KEY} = require('./JWT/generate-auth-key');

const auth_user = (req,res,next)=>{
    const {Authorization} = req.headers;
    const token = Authorization.split(' ')[1];  // removing the Bearer

    try{
        jwt.verify(token,JWT_KEY);
        next();
    }
    catch(e){
        res.json({
            msg : 'Auth Failed (Invalid Token)'
        })
    }
}


module.exports = {
    auth_user
}