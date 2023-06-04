const userController = require('../controllers/userController.js')
const router = require('express').Router()

router.post('/addUser',userController.addUser)
router.post('/getUser',userController.getUser)


module.exports = router