const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const authRoutes = require('./routes/users.routes');
const taskRoutes = require('./routes/task.routes');
const teamRoutes = require('./routes/teams.routes');
const path = require('path');
const cookieParser = require('cookie-parser');

dotenv.config();
connectDB();

const app = express();



app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/teams', teamRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
