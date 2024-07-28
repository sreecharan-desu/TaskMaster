const express = require('express');
const { User } = require('../db/db');
const userRouter = express.Router();
const { validateInputs } = require('./middlewares/zod/inputValidation');
const { auth_user } = require('./middlewares/usermiddlewares/auth-middleware');
const { fecthUserDB } = require('./middlewares/usermiddlewares/signin-middleware');
const {generate_JWT_key} = require('./middlewares/usermiddlewares/JWT/generate-auth-key');
const { verifyUserExistence } = require('./middlewares/usermiddlewares/signup-middleware');
const { generate_hashed_password } = require('./middlewares/usermiddlewares/hashfns/hash-password');

//routes
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



//(get) -end points
userRouter.get('/gettodos',auth_user,(req,res)=>{
    //returns all the todos of the user
});

userRouter.get('/getusername',auth_user,(req,res)=>{
    //returns Username of the user
});



//(post -endpoints)
userRouter.post('/addtodo',auth_user,(req,res)=>{

});

userRouter.post('/markasdone',auth_user,(req,res)=>{

});



//(put) -end points
userRouter.put('/update',auth_user,(req,res)=>{
    //updates user details (username and password)
});

userRouter.post('/updatetodo',auth_user,(req,res)=>{
    //updates todo (Title and Description)
});


//delete -end points
userRouter.delete('/removetodo',auth_user,(req,res)=>{

});



//Global-cathes
userRouter.use((err, req, res, next) => {
    console.error('You have been caught up', err);
    res.status(500).send('Something broke!');
});


module.exports = userRouter;