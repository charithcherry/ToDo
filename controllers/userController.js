const db = require('../models/index.js')

const User = db.users
const Task = db.tasks


// add user
const addUser = async (req, res) => {

    let info = {
        id: req.body.id,
        username: req.body.username,
        email: req.body.email
    }
    

    const newUser = await User.create(info)
    console.log(newUser)
    res.status(200).send(newUser)
}


module.exports ={
    addUser
}