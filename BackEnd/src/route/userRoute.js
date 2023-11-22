const express = require('express')
const router = express.Router()

const { createUser, getAllUser, getUserById, updateUserById, deleteUserById } = require('../controller/userController')

router.post('/user/createUser', createUser);
router.get('/user/getAllUser', getAllUser);
router.get('/user/getUserById/:id', getUserById);
router.put('/user/updateUserById/:id', updateUserById);
router.delete('/user/deleteUserById/:id', deleteUserById);

module.exports = router