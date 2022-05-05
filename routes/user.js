const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");
const User = require("../Database/User");
const router = require("express").Router();

// update user

router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {

// if user change password

  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC_KEY
    ).toString();
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete user
router.delete('/:id' ,verifyTokenAndAuthorization, async (req ,res)=>{
    try{
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("user has been deleted");

    }catch(err){
        res.status(500).json(err);
    }
})


// get  users

router.get('/find/:id' , verifyTokenAndAdmin ,async (req ,res)=>{
    try{
        const user = await User.findById(req.params.id)
        res.status(200).json(user);

    }catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;
