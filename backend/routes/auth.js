const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
//register account
router.post("/register", async(req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass,
        });

        const user = await newUser.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
});

//login

router.post("/login", async(req, res) => {
    try {
        const user = await User.findOne({
            username: req.body.username,
        });
        if (!user) res.status(200).json("User Not Found");
        const validate = await bcrypt.compare(req.body.password, user.password);
        if (!validate) res.status(400).json("wrong password");
        if (user && validate) res.status(200).json("Login Successful");
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;