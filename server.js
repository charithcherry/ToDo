const express= require('express')
const cors= require('cors')
const cookieSession= require("cookie-session");
const passport = require('passport');
require('dotenv').config();
const passportSetup= require('./passport')
const authRoute = require("./routes/auth")
const bodyParser = require('body-parser')
const app=express()

app.use(cookieSession({
    name: "session",
    keys:["Test"],
    maxAge: 24*60*60*100
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(cors({
    origin:"http://localhost:3000",
    methods:"GET,POST,PUT,DELETE",
    credentials: true
}))

app.use(express.json())
app.use(bodyParser.json())
app.use(express.urlencoded({extended:true}))

//test api
app.get("/",(rea,res)=>{
    res.json({message:"Base URL"})
})

app.use("/auth",authRoute);

const userrouter = require('./routes/userRouter.js')
app.use('/api/users',userrouter)

const taskrouter = require('./routes/taskRouter.js')
app.use('/api/tasks',taskrouter)

const PORT = process.env.PORT

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})
