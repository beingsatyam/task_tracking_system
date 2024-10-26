const express = require('express');
const { createTask, getUserTasks, updateTaskStatus, assignTask, deleteTask , addComment , uploadAttachment , getTasksByStatus , upload} = require('../controllers/task.controller');
const { protect } = require('../middlewares/validate.middleware');
const { taskOwner , validateTaskCreation , taskParticipant } = require('../middlewares/task.middleware')


const router = express.Router();


router.post('/', protect, validateTaskCreation, createTask);
router.get('/status', protect,taskParticipant , getTasksByStatus);
router.get('/assigned', protect, getUserTasks);
router.put('/:id/status', protect,taskParticipant , updateTaskStatus);

router.put('/:id/assign', protect, taskOwner ,  assignTask);
router.delete('/:id', protect, taskOwner, deleteTask);
router.post('/:id/comment', protect,taskParticipant , addComment);
router.post('/:id/attachment', protect, taskParticipant , upload.single('file'), uploadAttachment);

module.exports = router;
