const taskController = require('../controllers/taskController.js')
const router = require('express').Router()

router.post('/addTask',taskController.addTask)
router.get('/getAllTask',taskController.getTasks)
router.put('/:id',taskController.updateTask)
router.delete('/:id',taskController.deleteTask)

module.exports = router