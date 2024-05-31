const express = require("express");
const router = express.Router();
const postController = require("../controller/user_controller");

router.post("/createBlog", postController.createBlog);
router.get("/getAllBlog", postController.getAllBlogs);
module.exports = router;
