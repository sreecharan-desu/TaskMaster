const express = require('express');
const cors = require('cors');
const app = express();
const mainRouter = require('./routes/mainRoute')

//backendurl : https://task-master-kohl.vercel.app/

app.use(express.json());
app.use(cors());

app.get('/',(req,res)=>{
    res.send(
        "Hello from backend"
    )
})

app.use("/api/v1/",mainRouter);

//Test Comment

app.listen(5000,(req,res)=>{
    console.log("Listening...")
})