const Task = require('../models/task.model');


async function taskOwner(req, res, next){
    try {
        const { id } = req.params;
        const task = await Task.findById(id);

        if (!task) {
        return res.status(404).json({ error: 'Task not found' });
        }

    
        if (task.createdBy.toString() !== req.user._id.toString()) {
        return res.status(403).json({ error: 'You are not authorized to perform this action' });
        }

        next();
    } catch (error) {
        res.status(500).json({ error: 'Failed to validate task ownership' });
    }
};

async function validateTaskCreation(req, res, next) {
    const { title, description, dueDate } = req.body;
  
    if (!title || !description || !dueDate) {
      return res.status(400).json({ error: 'Title, description, and due date are required' });
    }
  
    if (new Date(dueDate) < new Date()) {
      return res.status(400).json({ error: 'Due date cannot be in the past' });
    }
  
    next();
};


async function taskParticipant(req, res, next){
    try {
        const { id } = req.params; 
        const task = await Task.findById(id);

        if (!task) {
        return res.status(404).json({ error: 'Task not found' });
        }

        const isOwner = task.createdBy.toString() === req.user._id.toString();
        const isAssignee = task.assignedTo?.toString() === req.user._id.toString();

        if (!isOwner && !isAssignee) {
        return res.status(403).json({ error: 'Access denied. You are not authorized to perform this action.' });
        }

        next();
    } catch (error) {
        res.status(500).json({ error: 'Failed to validate task participant' });
    }
};

module.exports = { taskOwner , validateTaskCreation , taskParticipant}