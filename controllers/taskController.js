const db = require('../models/index.js')

const User = db.users
const Task = db.tasks


// add task
const addTask = async (req, res) => {

    let info = {
        title: req.body.title,
        description: req.body.description,
        dueDate: req.body.dueDate,
        completed: req.body.completed,
        userId:req.body.userId
    }
    
    const newTask = await Task.create(info)
    console.log(newTask)
    res.status(200).send(newTask)
}

// add tasks 
const getTasks = async (req, res) => {

    let userTasks = await Task.findAll({
        where: { userId: req.body.userId },
        include: [User]
    })

    res.status(200).send(userTasks)
}


// update task
const updateTask = async (req, res) => {
    let id = req.params.id
    let task = await Task.update(req.body, {
        where: { id: id }
    })

    res.status(200).send(task)
}

// delete task
const deleteTask = async (req, res) => {
    let id = req.params.id
    await Task.destroy({
        where: { id: id }
    })

    res.status(200).send(`Task with id ${id} deleted`)
}


module.exports ={
    addTask,
    getTasks,
    updateTask,
    deleteTask
}