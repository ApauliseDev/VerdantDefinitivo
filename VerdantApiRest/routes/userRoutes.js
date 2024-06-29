const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

//Registro
router.post('/register', userController.register);
//LogIn
router.post('/login', userController.login);

//Obtener todos los usuarios
router.get('/', userController.getAllUsers);

// Obtener un usuario por ID
router.get('/:id', userController.getUserById);

// Actualizar un usuario por ID
router.put('/:id', userController.updateUser);

// Eliminar un usuario por ID
router.delete('/:id', userController.deleteUser);

module.exports = router;
