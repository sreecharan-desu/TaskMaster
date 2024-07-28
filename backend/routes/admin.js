const express = require('express');
const adminRouter = express.Router();


//(post) -end points
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

//(get) -end points
adminRouter.get('/details',(req,res)=>{
    //gets the admin details

    //code here
    res.json({
        msg : 'Signin'
    })
});


//(delete) -end points
adminRouter.delete('/deleteuser',(req,res)=>{
    //code here
    res.json({
        msg : 'Signin'
    })
});


//(put) -end points
adminRouter.put('/update',(req,res)=>{
    //updates the admin details

    //code here
    res.json({
        msg : 'Signin'
    })
});


//(delete) -end points
adminRouter.delete('/deleteuser',(req,res)=>{
    //code here
    res.json({
        msg : 'Signin'
    })
});


module.exports = adminRouter;