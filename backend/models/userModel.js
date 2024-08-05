const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the user schema with an items field
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    // Add items field
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item' // Assuming you have an Item model
    }],
    // Add other fields as needed
});

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
