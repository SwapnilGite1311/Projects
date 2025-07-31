//This is our main backend entry point as it does all the tasks like:
//loads environment variables
//sets up express and middleware
//connects to mongodb with mongoose
//starts the server on a specific port
//it satisfies one of the feature = "Secure backend setup with MongoDB and Express"
//server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const User = require('./models/User');
const bcrypt = require('bcrypt'); // Add this line
require('dotenv').config();

const authRoutes = require('./routes/auth');
const sessionRoutes = require('./routes/session')

//we Using MongoDB Atlas it our online cloud database where our data lives 
//load variable
dotenv.config(); //imp line as it loads the .env variables like our url in the .env file

const app = express();

//middleware
app.use(cors());
app.use(express.json());

//=====================================================================================
//dummy login route
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        // Use bcrypt to compare
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        res.json({ message: 'Login successful' });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
//======================================================================================

//base route
app.get('/', (req, res) => {
    res.send('Arvyax Backend API is running');
});

//connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI) // imp line as it connects our app to mongodb atlas using the same url
    .then(() => {
        console.log('MongoDB connected');

        app.use('/api/auth',authRoutes);//this is a route prefix used in Express to organize your backend API routes
        app.use('/api/my-sessions',sessionRoutes)
        app.listen(process.env.PORT || 5000, () => {
            console.log(`Server running on port ${process.env.PORT || 5000}`);
        });
    }) 
    .catch((err) => {
        console.error('MongoDB connection error.',err)
    });

//Mongoose is a Node.js library which is used to talk to the MongoDB easily
//MongoDB atlas is like google drive and our Mongoose is like Google Docs
