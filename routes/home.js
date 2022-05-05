const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();
const Blog = require("../Database/BlogModels/blog.models");

import transport from "../config/nodemailer";

router.get("/", async (req, res) => {
  const blogs = await Blog.find();
  if (blogs) {
    res.status(200).json(blogs);
  } else {
    res.status(500).json("Blogs Not Get for the Home Page");
  }
});

router.get("/", async (req, res) => {});

module.exports = router;
