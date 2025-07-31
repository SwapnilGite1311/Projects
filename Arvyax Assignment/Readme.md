# 🔐 Arvyax Admin Login Dashboard (Internship Assignment)

This project is a fully functional admin login system developed for the Arvyax Technologies internship assignment. It features secure dynamic login using MongoDB, route protection, a responsive dashboard UI, and logout functionality.

---

## 📁 Project Structure
arvyax-assignment/
├── backend/ # Node.js + Express server
│ ├── config/ # MongoDB connection
│ ├── models/ # User schema
│ ├── routes/ # Auth routes
│ └── server.js # Main entry point
│
├── frontend/ # React application
│ ├── public/
│ ├── src/
│ │ ├── pages/
│ │ │ ├── Login.js
│ │ │ ├── Dashboard.js
│ │ ├── App.js
│ │ ├── index.js
│ │ └── App.css
├── .env


---

## 🚀 Features

- 🔐 **Dynamic Login Authentication**  
  Users are authenticated using stored credentials in **MongoDB**.

- 🧠 **Protected Routes**  
  Unauthorized users cannot access the dashboard.

- 🧼 **Clean & Responsive UI**  
  The dashboard is fully responsive and works across devices.

- 🔁 **Logout Functionality**  
  Simple logout button clears session and redirects to login.

- ⚠️ **Error Handling**  
  Displays relevant errors (e.g., wrong credentials).

---

## 🛠️ Technologies Used

### Frontend:
- React
- React Router DOM
- Axios
- CSS3 (responsive)

### Backend:
- Node.js
- Express.js
- MongoDB with Mongoose
- dotenv

---

## 📦 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/arvyax-assignment.git
cd arvyax-assignment

### 2. Backend Setup
cd backend
npm install

MONGO_URI=your_mongo_connection_string
PORT=5000

npm start

### 3. Frontend Setup
cd frontend
npm install
npm start

🔑 Login Credentials
Credentials are stored in MongoDB. You can insert one manually:
// In MongoDB user collection
{
  "email": "admin@example.com",
  "password": "admin123"
}

📌 Assignment Requirements Covered
✅ Admin login with MongoDB credentials

✅ React frontend with secure routes

✅ Dashboard with logout button

✅ Responsive design

✅ Code separation: frontend and backend

✅ Completed using MERN Stack

📃 License
This project is for educational and internship assignment purposes only.