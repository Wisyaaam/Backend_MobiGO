const express = require('express')
const userController = require('../controllers/user.controller')
const {validateUser} = require('../middleware/user.validation')
const authControll = require('../controllers/auth.controller')
const roleValidate = require('../middleware/role.validation')

const app = express()
app.use(express.json())

app.get('/', authControll.authorize, roleValidate.isAdmin, userController.getAllUser) // GET ALL USER
app.get('/:key', authControll.authorize, roleValidate.isAdmin, userController.findUser) // FIND USER WITH KEY
app.post('/', authControll.authorize, roleValidate.isAdmin, userController.addUser) // ADD USER
app.post('/signup', validateUser, userController.registration) // ADD USER
app.put('/:id', authControll.authorize, userController.updateUser) // UPDATE USER
app.put('/reset/:id', authControll.authorize, roleValidate.isAdmin, userController.resetPass) // RESET PASS
app.put('/password/:id', authControll.authorize, roleValidate.isUser, userController.updatePass) // UPDATE PASS
app.delete('/:id', authControll.authorize, roleValidate.isAdmin, userController.deleteUser) // DELETE USER

module.exports = app