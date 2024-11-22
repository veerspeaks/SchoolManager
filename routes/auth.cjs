const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const router = express.Router();




//Admin login credentials, in real world scenario, this will be stored in database
const adminCredentials = {
    email: 'admin@example.com',
    password: 'admin123'
}

router.post('/login', (req, res) => {
    console.log(req.body);
    const {email, password}= req.body;
    

    // Check if email and password are provided
    if(!email || !password){
        return res.status(400).json({message: 'Email and password are required'});
    }

    // Check if the provided email and password match the admin credentials
    if(email !== adminCredentials.email || password !== adminCredentials.password){
        return res.status(401).json({message: 'Invalid credentials'});
    }

    // If the credentials are valid, generate a JWT token
    if(email === adminCredentials.email && password === adminCredentials.password){ 
        const token = jwt.sign({email: adminCredentials.email}, process.env.JWT_SECRET, {expiresIn: '1h'});
        return res.json({token});
    }
});

module.exports = router;

