const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js");
const userController = require("../controllers/user.js");

const User = require("../models/user.js");

router
.route("/signup")
.get(userController.renderSignupForm)
.post(wrapAsync(userController.signup));

router.route("/login")
.get(userController.loginForm)
.post(saveRedirectUrl,
passport.authenticate('local', 
{ failureRedirect: '/login',failureFlash:true }),
userController.login);
router.get("/logout",userController.logout);


// router.get("/signup",userController.renderSignupForm);
// router.post("/signup",wrapAsync(userController.signup));
// router.get("/login",userController.loginForm);
// router.post("/login", saveRedirectUrl,
// passport.authenticate('local', 
// { failureRedirect: '/login',failureFlash:true }),
// userController.login);
// router.get("/logout",userController.logout);

module.exports = router;