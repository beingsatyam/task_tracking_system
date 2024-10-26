const express = require('express');
const { createTask, getUserTasks, updateTaskStatus, assignTask, deleteTask , addComment , uploadAttachment , getTasksByStatus , searchTasks , upload} = require('../controllers/task.controller');
const { validUser } = require('../middlewares/validate.middleware');
const { taskOwner , validateTaskCreation , taskParticipant } = require('../middlewares/task.middleware')


const router = express.Router();


router.post('/', validUser, validateTaskCreation, createTask);
router.get('/status', validUser, getTasksByStatus);
router.get('/assigned', validUser, getUserTasks);
router.put('/:id/status', validUser,taskParticipant , updateTaskStatus);
router.put('/:id/assign', validUser, taskOwner ,  assignTask);
router.delete('/:id', validUser, taskOwner, deleteTask);
router.post('/:id/comment', validUser,taskParticipant , addComment);
router.post('/:id/attachment', validUser, taskParticipant , upload.single('file'), uploadAttachment);
router.get('/search', validUser, searchTasks);

module.exports = router;
