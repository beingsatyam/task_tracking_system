const Task = require('../models/task.model');

const multer = require('multer');
const path = require('path');



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
  });

const upload = multer({ storage });
  

async function addComment(req, res) {
    try {
      const { id } = req.params;
      const { text } = req.body;
  
      const task = await Task.findById(id);
      if (!task) return res.status(404).json({ error: 'Task not found' });
  
      task.comments.push({ user: req.user._id, text });
      await task.save();
  
      res.status(200).json({ message: 'Comment added', task });
    } catch (error) {
      res.status(500).json({ error: `Failed to add comment ${error}` });
    }
  };
  

async function uploadAttachment(req, res) {
    try {
      const { id } = req.params;
  
      const task = await Task.findById(id);
      if (!task) return res.status(404).json({ error: 'Task not found' });
  
      const { filename, path } = req.file;
      task.attachments.push({ filename, path });
      await task.save();
  
      res.status(200).json({ message: 'Attachment uploaded', task });
    } catch (error) {
      res.status(500).json({ error: 'Failed to upload attachment' });
    }
  };
  


async function createTask(req, res) {
  try {
    const { title, description, dueDate, assignedTo, team } = req.body;
    const task = new Task({
      title,
      description,
      dueDate,
      assignedTo,
      createdBy: req.user._id, 
      team,
    });

    await task.save();
    res.status(201).json({ message: 'Task created successfully', task });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
};


async function getUserTasks(req, res) {
  try {
    const tasks = await Task.find({ assignedTo: req.user._id }).populate('assignedTo').exec();
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};


async function updateTaskStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    

    const task = await Task.findByIdAndUpdate(id, { status }, { new: true });
    if (!task) return res.status(404).json({ error: 'Task not found' });

    res.status(200).json({ message: 'Task status updated', task });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task status' });
  }
};


async function assignTask(req, res) {
  try {
    const { id } = req.params;
    const { assignedTo } = req.body;

    const task = await Task.findByIdAndUpdate(id, { assignedTo }, { new: true });
    if (!task) return res.status(404).json({ error: 'Task not found' });

    res.status(200).json({ message: 'Task assigned successfully', task });


  } catch (error) {
    res.status(500).json({ error: 'Failed to assign task' });
  }
};


async function deleteTask(req, res) {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);

    if (!task) return res.status(404).json({ error: 'Task not found' });

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
};



async function getTasksByStatus(req, res){
    try {
      const { status } = req.query;
      console.log(status);
  

      if (status && !['open', 'in-progress', 'completed'].includes(status)) {
        return res.status(400).json({ error: 'Invalid status filter' });

        
      }

      const tasks = await Task.find({ status : status })

      console.log(tasks);
  
    //   const tasks = await Task.find(status ? { status } : {})
    //     .populate('owner', 'name email')
    //     .populate('assignee', 'name email');
  
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: `Failed to tasks ${error}` });
    }
  };


async function searchTasks(req, res) {
    try {

      
      const filter = {};
      if (req.query.title) {
        filter.title = { $regex: req.query.title, $options: 'i' }; 
      }
      if (req.query.description) {
        filter.description = { $regex: req.query.description, $options: 'i' };
      }
  
    
      const tasks = await Task.find(filter);
  
      if (!tasks.length) {
        return res.status(404).json({ message: 'No tasks found matching your search criteria.' });
      }
  
      res.json({ tasks });
    } catch (error) {
      res.status(500).json({ error: `Failed to search tasks ${error}`});
    }
};
  

module.exports = {
  createTask,
  getUserTasks,
  updateTaskStatus,
  assignTask,
  deleteTask,
  addComment,
  uploadAttachment,
  getTasksByStatus,
  searchTasks,
  upload
};
