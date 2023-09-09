const express = require('express')
const router = express.Router()
const User = require("../models/User")
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET='DOGAR DI YARI TE SHEER DI SWARI'

// Create a user using /api/auth/createuser/   //no login required
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 4 }),
    body('email', 'Entet a valid emsil').isEmail(),
    body('password', 'Enter strong password').isLength({ min: 6 })
], async (req, res) => {

    const errors = validationResult(req);
    // if there are errors return bad request and errors
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }
    try {

        //create user and adding validations or check weather the user exist or not with this email


        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ error: "please enter the unique email. user with this mail already exist" })
        }
        //...protecting password
        const salt =await bcrypt.genSalt(10);
        const secpas=await  bcrypt.hash(req.body.password,salt)  
        //add new user
        user = await User.create({

            name: req.body.name,
            email: req.body.email,
            password:secpas,
        })
        const data={
            user:{
                _id:user.id
            }
            
          }
        const token = jwt.sign(data, JWT_SECRET);
        
        res.json(token)
        // res.json(user)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('some error occurred')
    }

})
module.exports = router