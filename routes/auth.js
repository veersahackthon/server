const User = require("../Database/User");
const router = require("express").Router();
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const passport = require('passport');
const clientURL="http://localhost:3000/"

//login using passport 
router.get('/google', passport.authenticate('google',{scope :['email','profile']}));
router.get('/google/callback',passport.authenticate("google",{
  successRedirect : clientURL,
  failureRedirect : "/register",
  successMessage : "successfull logging",
  failureMessage : "failure logging"
}))


// Register
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC_KEY
    ).toString(),
  });

  // send this new user to database
  try {
    const saveUser = await newUser.save();
    res.status(201).json(saveUser);
  } catch (err) {
    res.status(500).json(err);
    console.log("err", err);
    // req.flash("error", "You not fill the Information Correctly");
  }
});

// sign in
router.post("/signin", async (req, res) => {
  try {
    // check user's username or we can also check with email id
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(401).json("username not found!");

    // if found then check for password
    const OriginalPassword = user.password;
    const hpass = CryptoJS.AES.decrypt(
      OriginalPassword,
      process.env.PASS_SEC_KEY
    ).toString(CryptoJS.enc.Utf8);

    hpass !== req.body.password && res.status(401).json("password not match");

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_secKey,
      { expiresIn: "15d" }
    );
    // if password match then send data except password
    const { password, ...other } = user._doc;
    res.status(200).json({ ...other, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
