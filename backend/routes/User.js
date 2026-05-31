const express = require("express");
const { signupuser, loginuser } = require("../controllers/userConroller");


const router = express.Router();


// login route 
router.post("/login",loginuser)
// sign up route
router.post("/signup",signupuser)
module.exports = router