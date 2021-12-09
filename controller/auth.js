const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const key = process.env.JWT_KEY;
// Models
const User = require('../model/user');
// Validation
const validateAuthInput = require('../validation/auth');


// Login
exports.postLogin = async (req, res) => {
    // Form validation
    const { errors, isValid } = validateAuthInput.login(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;
    // Find user by email
    User.findOne({ email }).then(user => {
        // Check if user exists
        if (!user) {
            return res.status(404).json({ emailnotfound: "Email not found" });
        }
        // Check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // User matched
                // Create JWT Payload
                const payload = {
                    id: user.id,
                    name: user.name
                };
                // Sign token
                jwt.sign(
                    payload,
                    key,
                    {
                        expiresIn: 60 * 60 * 24 // 1 day in seconds
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token,
                        });
                    }
                );
            } else {
                return res.status(400).json({ error: "Password incorrect" });
            }
        });
    });
};

// User Signup
exports.postUserRegister = async (req, res, next) => {
    const { errors, isValid } = validateAuthInput.register(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const user = await User.findOne({ email: req.body.email });

    if (user) {
        return res.status(409).json({ email: "Email already exists" });
    }
    else {
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });
        // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser.save().catch(err => console.log(err));
            });
        });
        return res.status(201).send('Success');
    }

};


// Admin Signup
exports.postAdminRegister = async (req, res) => {
    const { errors, isValid } = validateAuthInput.register(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const user = await User.findOne({ email: req.body.email }).catch(err => console.log(err));
    if (user) {
        return res.status(409).json({ email: "Email already exists" });
    }
    else {
        // Creating new user
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            isAdmin: true
        });
        // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser.save().catch(err => console.log(err));
            });
        });
        return res.status(201).send('Success');
    }
};
