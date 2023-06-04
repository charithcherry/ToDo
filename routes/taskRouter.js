const taskController = require('../controllers/taskController.js')
const router = require('express').Router()

router.post('/addTasks',taskController.addTasks)
router.post('/getAllTask',taskController.getTasks)
router.put('/:id',taskController.updateTask)
router.delete('/:id',taskController.deleteTask)
router.post('/getPendingTask',taskController.getPendingTasks)
router.post('/getCompletedTask',taskController.getCompletedTasks)

module.exports = router