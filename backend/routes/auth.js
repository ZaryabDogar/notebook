const express = require('express')
const router = express.Router()
const User = require("../models/User")
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'DOGAR DI YARI TE SHEER DI SWARI'
//CREATE USER ROUTES
// Create a user using /api/auth/createuser/   //no login required
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Entet a valid email').isEmail(),
    body('password', 'Enter strong password').isLength({ min: 6 })
], async (req, res) => {

    const errors = validationResult(req);
    // if there are errors return bad request and errors
    success=false
    if (!errors.isEmpty()) {
        res.status(400).json({success, errors: errors.array() });
    }
    try {

        //create user and adding validations or check weather the user exist or not with this email


        let user = await User.findOne({ email: req.body.email })
        if (user) {
            success=false
            return res.status(400).json({ success,error: "please enter the unique email. user with this mail already exist" })
        }
        //...protecting password
        const salt = await bcrypt.genSalt(10);
        const secpas = await bcrypt.hash(req.body.password, salt)
        //add new user
        user = await User.create({

            name: req.body.name,
            email: req.body.email,
            password: secpas,
        })
        const data = {
            user: {
                _id: user.id
            }

        }
        const token = jwt.sign(data, JWT_SECRET);
        success=true

        res.json({success,Auth_token:token})
        // res.json(user)
    } catch (error) {
        success=false
        console.error(error.message)
        res.status(500).send({success,error:'internal server error'})
    }

})
//LOGIN ROUTE
// authenticate a user using /api/auth/login/   //no login required

router.post('/login', [
    body('email', 'Entet a valid email').isEmail(),
    body('password', 'password cant be blanked').exists(),
], async (req, res) => {
    const errors = validationResult(req);
    // if there are errors return bad request and errors
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email })
        if (!user) {
            success=false

            return res.status(400).json({success, error: "please try to login with correct login creddentials" })
        }

        const passwordcompare = await bcrypt.compare(password, user.password)
        if (!passwordcompare) {
            success=false
            return res.status(400).json({success, error: "please try to login with correct login creddentials" })

        }
        const data = {
            user: {
                _id: user.id
            }

        }
        const token = jwt.sign(data, JWT_SECRET);
        success=true
        res.json({success,Auth_token:token})

    } catch (error) {
        console.error(error.message)
        success=false
        res.status(500).send({success,message:'internal server error'})
    }

})
//GET USER ROUTE
// authenticate a user using /api/auth/GETUSER/    login required
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        const userid = req.user
        
        const user = await User.findById(userid).select("-password")
        success=true
        res.send({success,user})

    } catch (error) {
        console.error(error.message)
        success=false
        res.status(500).send({success,error:'internal server error'})

    }
}
)

module.exports = router