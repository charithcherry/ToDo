const express= require('express')
const cors= require('cors')
require('dotenv').config();
const app=express()

var corOptions={
    origin:'https://localhost:8081'
}

app.use(cors(corOptions))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//test api
app.get("/",(rea,res)=>{
    res.json({message:"Base URL"})
})

const userrouter = require('./routes/userRouter.js')
app.use('/api/users',userrouter)

const taskrouter = require('./routes/taskRouter.js')
app.use('/api/tasks',taskrouter)

const PORT = process.env.PORT

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})
