const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Définition des routes RESTful
router.get('/', taskController.getAllTasks);
router.post('/', taskController.createTask);
router.put('/:id', taskController.updateTaskStatus);
router.delete('/:id', taskController.deleteTask);

module.exports = router;
