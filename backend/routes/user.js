const express = require('express');
const userRouter = express.Router();

userRouter.post('/signup',(req,res)=>{
    //code here
    res.json({
        msg : 'Signup'
    })
});


userRouter.post('/signin',(req,res)=>{
    //code here
    res.json({
        msg : 'Signin'
    })
});

module.exports = userRouter;