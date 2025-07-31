//This code is specifically used to define the user schema i.e. structure of your user documents in MongoDB
//Everytime someone registers, this schema is used to store their email and password
//feature it fulfills = "POST/register" and "POST/login" endpoints
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({ //imp line as it defines the structure for users i.e. email, passoword_hash, create_at
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password_hash: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('User',userSchema);//imp line as it exports the schema so you can use the User.find()
                                                   //user.Create() in our routes and controllers
    