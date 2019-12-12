const express        = require("express");
const passportRouter = express.Router();
// Require user model
const User = require("../models/user");

// Add bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

// Add passport 


const ensureLogin = require("connect-ensure-login");


passportRouter.get("/private-page", ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render("passport/private", { user: req.user });
});

passportRouter.get("/signup", function (req,res,next){
  res.render('passport/signup')
})

passportRouter.post("/signup", function (req,res,next){
  const username = req.body.username;
  const password = req.body.password;

    // 1. Check username and password are not empty
    if (username === "" || password === "") {
      res.render("auth/signup", { errorMessage: "Indicate username and password" });
      return;
    }
  
    User.findOne({ username })
      .then(user => {
        // 2. Check user does not already exist
        if (user) {
          res.render("auth/signup", { errorMessage: "The username already exists" });
          return;
       }
    });
})

module.exports = passportRouter;