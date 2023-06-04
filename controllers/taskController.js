const db = require('../models/index.js')

const User = db.users
const Task = db.tasks


// add task
const addTasks = async (req, res) => {
    tasks=req.body
    tasks.map(async (task) => {
        let info = {
            id:task.id,
            title: task.title,
            description: task.description,
            dueDate: task.dueDate,
            completed: task.completed,
            userId: task.userId
        };
    
        try {
            const newTask = await Task.create(info);
            console.log(newTask);
        } catch (error) {
            console.error(error);
        }
    });
    
    res.status(200).send(tasks)
}

// get tasks 
const getTasks = async (req, res) => {

    let userTasks = await Task.findAll({
        where: { userId: req.body.userId },
        include: [User]
    })

    res.status(200).send(userTasks)
}


// get pending tasks

const getPendingTasks =async (req, res) => {

    let userTasks = await Task.findAll({
        where: { userId: req.body.userId,completed:0 },
        include: [User]
    })

    res.status(200).send(userTasks)
}

// get completed tasks

const getCompletedTasks =async (req, res) => {

    let userTasks = await Task.findAll({
        where: { userId: req.body.userId,completed:1 },
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
    addTasks,
    getTasks,
    updateTask,
    deleteTask,
    getCompletedTasks,
    getPendingTasks
}