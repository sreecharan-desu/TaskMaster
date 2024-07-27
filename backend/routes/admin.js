const express = require('express');
const adminRouter = express.Router();

adminRouter.post('/signup',(req,res)=>{
    //code here
    res.json({
        msg : 'Signup'
    })
});


adminRouter.post('/signin',(req,res)=>{
    //code here
    res.json({
        msg : 'Signin'
    })
});


module.exports = adminRouter;