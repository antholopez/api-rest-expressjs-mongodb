const express = require('express');
const router = express.Router();

const { getUsers, createUser, getUser, deleteUser, updateUser } = require('../controllers/user.controller')

router.get('/', getUsers);
router.post('/', createUser);
router.get('/:id', getUser);
router.delete('/delete/:id', deleteUser)
router.patch('/edit/:id', updateUser)

module.exports = router