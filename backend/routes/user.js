const express = require('express');
const { validateInputs } = require('./middlewares/zod/inputValidation');
const { User } = require('../db/db');
const { verifyUserExistence } = require('./middlewares/usermiddlewares/signup-middleware');

const userRouter = express.Router();

userRouter.post('/signup', validateInputs, verifyUserExistence , async (req,res)=>{
    const {username,password} = req.body;
    const user  = await User.create({
        Username : username,
        Password : password
    })
    res.json({
        msg : `Account created successfully with userId ${user._id}`
    })
});

userRouter.post('/signin',(req,res)=>{
    //code here
    res.json({
        msg : 'Signin'
    })
});

module.exports = userRouter;