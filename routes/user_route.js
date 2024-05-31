const express = require("express");
const router = express.Router();
const postController = require("../controller/user_controller");

router.post("/createBlog", postController.createBlog);
router.post("/updateBlog/:id", postController.updateBlog);
router.get("/getAllBlog", postController.getAllBlogs);
router.get("/getSingleBlog/:id", postController.singleBlog);
module.exports = router;
