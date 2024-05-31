const db = require("../config/db");
// create Blog
const createBlog = async (req, res) => {
  try {
    const { title, date, author, content } = req.body;
    const query =
      "insert into user_blog (title,date,author,content) values (?, ?, ?, ?)";
    db.query(query, [title, date, author, content], (err, result) => {
      console.log(result);
      if (err) {
        return res.status(500).send("not found");
      }
      res.status(200).send(JSON.stringify(result));
    });
  } catch (err) {
    res.status(400).send(err, "something wants wrong");
  }
};

//update blog
const updateBlog = (req, res) => {
  try {
    const { id } = req.params;

    const { title, date, author, content } = req.body;

    const query =
      "UPDATE user_blog SET title= ? date=? author=? content=? WHERE id = ?";
    db.query(query, [title, date, author, content, id], (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      return res.status(200).send(results);
    });
  } catch (err) {
    res.status(400).send(err, "something wants wrong");
  }
};

// get All blogs in this blog full text search provide and pagination are there
const getAllBlogs = async (req, res) => {
  try {
    let { page, limit, search } = req.query;

    page = page ? parseInt(page) : 1;
    limit = limit ? parseInt(limit) : 5;

    const offset = (page - 1) * limit;
    let query = "select * from user_blog";
    let queryParams = [];

    if (search) {
      query += " where title LIKE ? or content LIKE ?";
      queryParams.push(`%${search}%`, `%${search}%`);
    }
    query += "LIMIT  ? OFFSET ?";
    queryParams.push(limit, offset);

    db.query(query, queryParams, (err, results) => {
      if (err) {
        return res.send(err);
      }
      let countQuery = "select count(*) as totalCount from user_blog";
      if (search) {
        countQuery += " where title LIKE ? or content LIKE ?";
      }

      db.query(countQuery, queryParams.slice(0, 2), (err, results) => {
        if (err) {
          return res.send(err);
        }
        const totalcount = results[0].totalCount;
        console.log(countQuery);
        console.log(results, "results");
        res.status(200).send(totalcount, page, limit, results);
      });
    });
  } catch (err) {
    res.status(400).send(err, "something wants wrong");
  }
};

//get single blog with id
const singleBlog = (req, res) => {
  try {
    const { id } = req.params;

    const query = "select * from user_blog where id = ?";
    db.query(query, [id], (err, results) => {
      if (err) {
        return res.send(err);
      }
      if (results.length === 0) {
        return res.status(500).send("Post Not Found");
      }
      res.status(200).send(results[0]);
    });
  } catch (err) {
    res.status(300).send(err, "something wants wrong");
  }
};

//delete blog
const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const query = "DELETE FROM user_blog WHERE id =?";
    db.query(query, [id], (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.status(200).send(result);
    });
  } catch (err) {
    res.status(404).send(err);
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  singleBlog,
  updateBlog,
};
