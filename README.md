# Royal Appointments System

A production-ready full-stack web application built with React (Vite+Tailwind) and Node.js (Express+MongoDB) for managing appointments and announcements.

## Features
- **Public Homepage**: View available appointments and latest announcements with date filtering.
- **Admin Dashboard**: Secure JWT-protected portal.
- **Manage Appointments**: Add, list, toggle availability, and delete appointments.
- **Manage Announcements**: Post updates and news.
- **Modern UI**: "Royal" color palette and responsive design using Tailwind CSS v4.

## Setup Instructions

### Prerequisites
- Node.js installed
- MongoDB (Local server or MongoDB Atlas URI)

### 1. Clone & Install
```bash
# Install Server dependencies
cd server
npm install

# Install Client dependencies
cd ../client
npm install
```

### 2. Configure Environment Variables
In the `server` directory, open `.env` and configure your settings:
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/appointment-system  # Replace with your MongoDB Atlas URI if needed
JWT_SECRET=superkey
```

### 3. Seed Initial Admin Account
Run the following script to create the default 'admin' user (Password: `admin123`):
```bash
cd server
node scripts/seedAdmin.js
```

### 4. Run the Application
Start the backend server:
```bash
cd server
npm start # (or node index.js)
```

Start the frontend application:
```bash
cd client
npm run dev
```

Visit `http://localhost:5173` to view the public application, or `http://localhost:5173/admin/login` to access the dashboard.
