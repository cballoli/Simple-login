const express = require("express");
let router = express.Router();
const session = require('express-session');

const credential = {
    email: "username@gmail.com",
    password: "user12345"
}

//login User
router.post('/login', (req, res) => {
    if(req.body.email == credential.email && req.body.password == credential.password){
        req.session.user = req.body.email;
        res.redirect('./dashboard');
        // res.end("Login Successful...!")
    } else {
        res.end("Invalid email or password");
    }
})

// route for dashboard
router.get('/dashboard', (req, res) => {
    if(req.session.user){
        res.render('dashboard', {user: req.session.user})
    } else {
        res.send("Unauthorized user")
    }
})

// route for logout

router.get('/logout', (req, res) => {
    req.session.destroy(function(err){
        if(err){
            console.log(err);
            res.send("Error")
        } else {
            res.render('base', { title: "Express", logout: "Logout Successful"})
        }
    })
})

module.exports = router;