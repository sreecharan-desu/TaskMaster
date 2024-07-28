const express = require('express');
const { User } = require('../db/db');
const { validateInputs } = require('./middlewares/zod/inputValidation');
const { verifyUserExistence } = require('./middlewares/usermiddlewares/signup-middleware');
const { fecthUserDB } = require('./middlewares/usermiddlewares/signin-middleware');
const {generate_JWT_key} = require('./middlewares/JWT/generate-auth-key');
const { generate_hashed_password } = require('./middlewares/hashfn\'s/hash-password');

const userRouter = express.Router();

userRouter.post('/signup', validateInputs, verifyUserExistence , async (req,res)=>{
    const {username,password} = req.body;
    try {
        const response = await generate_hashed_password(password);
        if (response.success) {
            const user = await User.create({
                Username: username,
                Password: response.hashed_password
            });

            res.status(201).json({
                msg: `Account created successfully with userId ${user._id}`,
                user: user
            });
        } else {
            res.status(500).json({
                msg: `An error occurred while hashing the password. Please try again.`,
                success: false
            });
        }
    } catch (error) {
        console.log(error)
    }
});

userRouter.post('/signin', validateInputs, fecthUserDB, (req,res)=>{
    const {username,password} = req.body;
    try{
        const auth_token  = generate_JWT_key(username);  
        res.json({
            token : auth_token
        })
    }
    catch(e){
        res.json({
            error : e,
            msg : 'Error while generating auth_token Please Try again!',
            success : false
        })
    }
});

module.exports = userRouter;