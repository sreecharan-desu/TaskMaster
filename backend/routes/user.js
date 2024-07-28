const express = require('express');
const { validateInputs } = require('./middlewares/zod/inputValidation');
const userRouter = express.Router();

userRouter.post('/signup',validateInputs,(req,res)=>{
    const {username,password} = req.body;

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