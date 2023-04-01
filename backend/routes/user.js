const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const Post = require("../models/post");
//update user
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updateUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        {
          new: true, //for postman only
        }
      );
      res.status(200).json(updateUser);
    } catch (error) {
      res.status(500).json(error);
    }
  }
});
//delete user
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    //delete all posts of user
    try {
      const user = await User.findById(req.params.id);
      try {
        await Post.deleteMany({
          username: user.username,
        });
        //only deleting user account
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted");
      } catch (error) {
        res.status(505).json(error);
      }
    } catch (error) {
      res.status(404).json("User Not Found");
    }
  } else {
    res.status(401).json("You can delete only your account.");
  }
});
//get user
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...other } = user._doc;
    res.status(200).json(other);
  } catch (error) {
    res.status(404).json(error);
  }
});
module.exports = router;
