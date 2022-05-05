const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

const transport = require("../config/nodemailer");

const Blog = require("../Database/BlogModels/blog.models");

// Create Blog

router.post("/", async (req, res) => {
  const newBlog = new Blog(req.body);
  try {
    const saveBlog = await newBlog.save();
    res.status(201).json(saveBlog);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all Blogs
router.get("/", async (req, res) => {
  const allBlog = await Blog.find();
  if (allBlog) {
    res.status(201).json(allBlog);
  } else {
    res.status(500).json("Don't able to render All Blogs");
  }
 });

// Get Blogs By Category
router.get("/:cat", async (req, res) => {
  const blogs = await Blog.find(req.params.cat);
  if (blogs) {
    res.status(200).json(blogs);
  } else {
    res.status(500).json("AnyThing");
  }
});

// Get Single blog by Id
router.get("/:id", async (req, res) => {
  try {
    const catblog = await Blog.findById(req.params.id);
    res.status(201).json(catblog);
  } catch {
    res.status(500).json("Error in particular blog");
  }
});

// Delete the blog only for the admin
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.status(201).json("Blog is successfully deleted");
  } catch {
    res.status(500).json("Blog is not deleted ");
  }
});

// Delete the blog by the User
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.status(201).json("Blog is successfully deleted");
  } catch {
    res.status(500).json("Not Perimission Given");
  }
});

// Update the Blog
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const blog = Blog.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    rea.status(200).json(blog);
  } catch {
    res.status(200).json("Blog Not Updated");
  }
});

module.exports = router;
