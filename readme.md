# Task Tracking and Management Application - Backend

A backend system for a task tracking and management platform that facilitates collaboration within teams or projects. This application allows users to create, assign, and track tasks, collaborate through comments and attachments, and receive real-time notifications on task updates.

## Features

- **User Management:**
  - User registration, login, logout, and profile management.
  - Password hashing using bcrypt.
  - Secure session management with JWT.

- **Task Management:**
  - CRUD operations for tasks (Create, Read, Update, Delete).
  - Task assignment to team members and filtering by status.
  - Search tasks by title or description.

- **Team and Project Management:**
  - Create new teams or projects.
  - Invite team members to join teams.

- **Collaboration Tools:**
  - Add comments and attachments to tasks.
  - Task updates and comments restricted to task owners and assignees.

- **Email Notification:**
  - An email is sent upon successful task assignment.


## Technologies Used

- **Backend:** Node.js with Express.js  
- **Database:** MongoDB (or any chosen database system)  
- **Authentication:** JWT for secure authentication and authorization  
- **Real-time Communication:** WebSockets for notifications  

## Installation and Setup

### Prerequisites:
- Node.js and npm installed.
- MongoDB installed or MongoDB Atlas (cloud) access.

### Steps:
1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-repository/task_tracking_backend.git
   cd task_tracking_backend

2. **Install Dependencies**
  ```bash
  npm install
  ```



3. **Set up environment variables:**
    Create a `.env` file in the root directory and add the following:

    ```plaintext
    PORT=5000
    MONGO_URI=your-mongodb-connection-string
    JWT_SECRET=your-jwt-secret
    EMAIL=your_email_Address
    PASSWORD=your_password

    Do the following to get the password:

    1.Go to your Google account at https://myaccount.google.com/
    2.Go to Security
    3.Choose 2-Step Verification - here you have to verify yourself, in my case it was with phone number and a confirmation code send as text message. After that you will be able to enabled 2-Step Verification
    4.Visit https://myaccount.google.com/apppasswords to create your app.
    5.Put a name e.g. nodemailer to your app and create it.
    6.A modal dialog will appear with the password. Get that password and use it in your code


3. **Run the application::**
    ```bash
    node index.js



## API Endpoints

### **Authentication:**
| Method | Endpoint            | Description            |
|--------|---------------------|------------------------|
| POST   | `/api/auth/register` | Register a new user    |
| POST   | `/api/auth/login`    | Login user             |
| POST   | `/api/auth/logout`   | Logout user            |
| GET    | `/api/auth/profile`  | View user profile      |
| PUT    | `/api/auth/profile`  | Update profile         |

### **Tasks:**
| Method | Endpoint            | Description                         |
|--------|---------------------|-------------------------------------|
| POST   | `/api/tasks`        | Create a new task                   |
| GET    | `/api/tasks`        | Get all tasks assigned to user      |
| GET    | `/api/tasks/search` | Search tasks by title/description   |
| PUT    | `/api/tasks/:id`    | Update task status                  |
| DELETE | `/api/tasks/:id`    | Delete task (only by task owner)    |

### **Team Management:**
| Method | Endpoint            | Description                     |
|--------|---------------------|---------------------------------|
| POST   | `/api/teams`        | Create a new team or project    |
| POST   | `/api/teams/invite` | Invite members to join team     |





