const express = require('express');
const cors = require('cors');
const app = express();
const mainRouter = require('./routes/mainRoute')

app.use(express.json());
app.use(cors());
app.use("/api/v1/",mainRouter);
//Test Comment

app.listen(5000,(req,res)=>{
    console.log("Listening...")
})